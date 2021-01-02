<template>
  <div class="w-full max-w-xl px-3 py-4 mx-auto">
    <Post v-for="post in posts" :key="post.id" :post="post" />
    <div ref="scrollObserver" class="h-px"></div>
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
  created() {
    this.observer = null
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('loadNextPage')
      }
    }, {})
    this.observer.observe(this.$refs.scrollObserver)
  },
  destroyed() {
    this.observer.disconnect()
  },
}
</script>

<style></style>
