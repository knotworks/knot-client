<template>
  <div class="relative w-screen h-screen">
    <Navbar>
      <button slot="left-buttons" @click="goBack">
        Close
      </button>
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
import { objectToFormData } from 'object-to-formdata'

export default {
  layout: 'minimal',
  async fetch({ store }) {
    await store.dispatch('user/fetchFriendships')
  },
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
      await this.newPost(
        objectToFormData(
          {
            ...this.post,
            accompaniments: this.post.accompaniments.map((a) => a.id),
          },
          { indices: true }
        )
      )
      this.isPosting = false
      this.$router.push('/')
    },
    goBack() {
      this.$router.go(-1)
    },
    setPostMedia(media) {
      this.post.media = media
        .filter((item) => {
          return !!item.file
        })
        .map((item) => item.file)
        .filter(Boolean)
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
  },
}
</script>
