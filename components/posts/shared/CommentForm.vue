<template>
  <div class="dashboard-activity-feed-post-comment-form">
    <form class="flex items-start py-4 pr-5" @submit.prevent="doAddComment">
      <AutosizeTextarea
        v-model="comment.body"
        class="px-5 text-sm"
        placeholder="Add a comment..."
        :min-height="27"
        :max-height="200"
      />
      <transition name="fade">
        <button
          v-if="!commentEmpty"
          :disabled="postingComment"
          type="submit"
          class="px-2 py-1 text-xs font-medium tracking-wide text-white uppercase bg-red-600 rounded-full"
        >
          Send
        </button>
      </transition>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import AutosizeTextarea from '~/components/AutosizeTextarea'
export default {
  name: 'CommentForm',
  components: {
    AutosizeTextarea
  },
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comment: {
        id: -1,
        body: '',
        location: {}
      },
      postingComment: false
    }
  },
  computed: {
    ...mapGetters('location', ['currentLocation']),
    commentEmpty() {
      return this.comment.body.trim() === ''
    },
    locationPostData() {
      return Object.keys(this.comment.location).length
        ? this.comment.location
        : null
    }
  },
  methods: {
    ...mapActions('posts', ['addComment']),
    async doAddComment() {
      this.postingComment = true
      this.comment.id = this.postId

      if (this.currentLocation.city !== null) {
        this.comment.location = this.currentLocation
      }

      const commentData = {
        ...this.comment,
        location: this.locationPostData
      }

      await this.addComment(commentData)

      this.postingComment = false
      this.comment.body = ''
    }
  }
}
</script>
<style lang="scss">
.dashboard-activity-feed-post-comment-form {
  border-top: 1px solid rgba(#000, 0.1);
  textarea {
    border: none;
    outline: none;
    flex-grow: 1;
    min-height: 27px;
    resize: none;
  }
}
</style>
