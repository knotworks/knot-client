<template>
  <div class="w-screen h-screen">
    <Navbar>
      <button slot="left-buttons" @click="goBack">Close</button>
      <span slot="title" class="text-white">New Post</span>
    </Navbar>
    <form @submit.prevent="doNewPost">
      <textarea
        v-model="post.body"
        rows="5"
        class="w-full p-4 resize-none focus-none"
        placeholder="Write a caption..."
      ></textarea>
      <MediaInput @change="setPostMedia" />
      <div class="p-4">
        <button
          type="submit"
          class="w-full px-3 py-3 text-white bg-red-600 rounded-sm shadow-md"
          :disabled="isPosting"
        >
          {{ isPosting ? 'Posting...' : 'Post' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { objectToFormData } from 'object-to-formdata'
import Navbar from '~/components/Navbar.vue'
import MediaInput from '~/components/new-post/MediaInput.vue'
export default {
  layout: 'minimal',
  components: {
    Navbar,
    MediaInput
  },
  data() {
    return {
      post: {
        body: '',
        media: []
      },
      isPosting: false
    }
  },
  methods: {
    ...mapActions('posts', ['newPost']),
    async doNewPost() {
      this.isPosting = true
      await this.newPost(objectToFormData(this.post))
      this.isPosting = false
      this.$router.push('/')
    },
    goBack() {
      window.history.back()
    },
    setPostMedia(media) {
      this.post.media = media
        .filter((item) => {
          return !!item.file
        })
        .map((item) => item.file)
    }
  }
}
</script>
