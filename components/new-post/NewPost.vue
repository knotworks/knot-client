<template>
  <div class="absolute top-0 left-0 z-30 w-screen h-screen bg-gray-100">
    <Navbar>
      <button slot="left-buttons" @click="closePanel">Close</button>
      <span slot="title" class="text-white">New Post</span>
    </Navbar>
    <form @submit.prevent="doNewPost">
      <textarea
        v-model="post.body"
        rows="5"
        class="w-full p-4 resize-none focus-none"
        placeholder="Write a caption..."
      />
      <MediaInput @change="setPostMedia" />
      <div class="p-4">
        <button
          class="w-full px-3 py-3 text-gray-700 bg-gray-300 rounded-sm"
          type="button"
          @click="isTaggingFriends = !isTaggingFriends"
        >
          {{ friendsButtonLabel }}
        </button>
        <button
          class="w-full px-3 py-3 mt-4 text-gray-700 truncate bg-gray-300 rounded-sm"
          type="button"
          @click="isAddingLocation = !isAddingLocation"
        >
          {{ locationButtonLabel }}
        </button>
        <button
          type="submit"
          class="w-full px-3 py-3 mt-4 text-white bg-red-600 rounded-sm shadow-md"
          :disabled="isPosting"
        >
          {{ isPosting ? 'Posting...' : 'Post' }}
        </button>
      </div>
    </form>
    <transition name="slide-up">
      <AddFriends
        v-show="isTaggingFriends"
        @close="isTaggingFriends = false"
        @change="setTaggedFriends"
      />
    </transition>
    <transition name="slide-up">
      <AddLocation
        v-show="isAddingLocation"
        @change="setPostLocation"
        @close="isAddingLocation = false"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { serialize } from 'object-to-formdata'

export default {
  data() {
    return {
      post: {
        body: '',
        media: [],
        accompaniments: [],
        location: {},
      },
      isPosting: false,
      isTaggingFriends: false,
      isAddingLocation: false,
    }
  },
  computed: {
    friendsButtonLabel() {
      const { accompaniments } = this.post
      if (accompaniments.length === 1) {
        return `With ${accompaniments[0].firstName}`
      } else if (accompaniments.length > 1) {
        return `With ${accompaniments.length} friends`
      } else {
        return "I'm with..."
      }
    },
    locationButtonLabel() {
      return this.post.location.name ? this.post.location.name : "I'm at..."
    },
  },
  methods: {
    ...mapActions('posts', ['newPost']),
    async doNewPost() {
      this.isPosting = true
      let uploads = []
      try {
        uploads = await this.uploadMedia()
      } catch (e) {
        alert(e)
        this.isPosting = false
      }

      await this.newPost(
        serialize(
          {
            ...this.post,
            media: uploads.map((asset) => {
              return {
                path: asset.public_id,
                type: asset.resource_type,
                width: asset.width,
                height: asset.height,
              }
            }),
            accompaniments: this.post.accompaniments.map((a) => a.id),
          },
          { indices: true }
        )
      )
      this.isPosting = false
      this.closePanel()
      this.$bus.$emit('POST_CREATED')
    },
    async uploadMedia() {
      const media = []
      const options = {
        timestamp: Date.now(),
        folder: `${this.$config.appEnv}/media`,
      }
      const signature = await this.$axios.$post(
        '/api/generate-cloudinary-signature',
        options
      )
      if (signature) {
        for (const file of this.post.media) {
          try {
            const asset = await this.$cloudinary.upload(file.data, {
              ...options,
              upload_preset: file.type?.match('video')
                ? 'post-videos'
                : 'post-images',
              api_key: this.$config.cloudinaryApiKey,
              signature,
            })
            media.push(asset)
          } catch (e) {
            throw new Error(e)
          }
        }
      } else {
        Promise.reject('Unable to generate signature for upload.')
      }

      return media
    },
    setPostMedia(media) {
      this.post.media = media
        .filter((file) => !!file.data)
        .map(({ data, type }) => ({ data, type }))
    },
    setTaggedFriends(friends) {
      this.isTaggingFriends = false
      this.post.accompaniments = friends.map((friend) => {
        return { id: friend.id, firstName: friend.first_name }
      })
    },
    setPostLocation(place) {
      this.isAddingLocation = false
      this.post.location = {
        lat: +parseFloat(place.location.lat).toFixed(6),
        long: +parseFloat(place.location.lng).toFixed(6),
        name: place.name,
        city: place.location.city,
      }
    },
    closePanel() {
      this.$emit('close')
      setTimeout(this.resetPost, 350)
    },
    resetPost() {
      this.post = {
        body: '',
        media: [],
        accompaniments: [],
        location: {},
      }
    },
  },
}
</script>
