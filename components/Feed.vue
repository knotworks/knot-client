<template>
  <div class="w-full max-w-xl p-4 feed">
    <Post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import Post from '~/components/posts/Index.vue'
export default {
  components: {
    Post
  },
  props: {
    posts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    getPostType(post) {
      if (post.hasOwnProperty('postable_type')) {
        return post.postable_type.split('\\').pop()
      } else {
        return null
      }
    }
  }
}
</script>

<style></style>
