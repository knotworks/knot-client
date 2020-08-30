<template>
  <div class="overflow-y-auto scrolling-touch">
    <Feed :posts="currentProfile.posts.data" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch({ store, params }) {
    await store.dispatch('posts/fetchProfile', { page: 1, id: params.id })
  },
  computed: {
    ...mapGetters('posts', ['currentProfile']),
  },
  async mounted() {
    this.$bus.$on('POST_CREATED', async () => {
      await this.$store.dispatch('posts/fetchProfile', {
        page: 1,
        id: this.$route.params.id,
      })
    })
  },
}
</script>
