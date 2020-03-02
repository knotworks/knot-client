<template>
  <div class="mb-8 overflow-hidden text-gray-800 bg-white rounded-lg shadow-sm">
    <PostHeader :post="post" />
    <PostMedia v-if="post.media.length" :media="post.media" />
    <div v-if="post.body" class="border-t border-gray-300">
      <PostBody :post="post" />
    </div>
    <Reactions v-if="post.reactions.length" :post="post" />
    <CommentList v-show="post.comments.length" :comments="post.comments" />
    <CommentForm :post-id="post.id" />
  </div>
</template>

<script>
import PostHeader from '~/components/posts/shared/PostHeader'
import PostMedia from '~/components/posts/shared/PostMedia'
import PostBody from '~/components/posts/shared/PostBody'
import Reactions from '~/components/posts/shared/Reactions'
import CommentList from '~/components/posts/shared/CommentList'
import CommentForm from '~/components/posts/shared/CommentForm'
export default {
  components: {
    PostHeader,
    PostMedia,
    PostBody,
    Reactions,
    CommentList,
    CommentForm
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
