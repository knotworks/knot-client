<template>
  <div class="mb-8 overflow-hidden text-gray-800 bg-white rounded-lg shadow-sm">
    <PostHeader :post="post" />
    <PostMedia v-if="post.media.length" :media="post.media" />
    <div v-if="postHasBody" class="border-t border-gray-300">
      <PostBody :post="post" />
    </div>
    <Reactions v-if="post.reactions.length" :post="post" />
    <CommentList v-show="post.comments.length" :comments="post.comments" />
    <CommentForm :post-id="post.id" />
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    postHasBody() {
      return (
        !!this.post.body ||
        !!this.post.location ||
        this.post.accompaniments.length
      )
    },
  },
}
</script>
