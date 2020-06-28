<template>
  <div class="w-full max-w-xl px-3 py-4 feed">
    <Post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style></style>
