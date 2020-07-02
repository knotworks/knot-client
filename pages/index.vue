<template>
  <div class="overflow-y-auto scrolling-touch">
    <Feed :posts="timeline.data" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch({ store }) {
    if (!store.getters['posts/timeline'].data.length) {
      await store.dispatch('posts/fetchTimeline')
    }
  },
  computed: {
    ...mapGetters('posts', ['timeline']),
  },
  async mounted() {
    this.$bus.$on('POST_CREATED', async () => {
      await this.$store.dispatch('posts/fetchTimeline')
    })

    if (this.timeline.data.length) {
      try {
        await this.$store.dispatch('posts/fetchTimeline')
      } catch (e) {
        console.log('Oop')
      }
    }

    await this.$store.dispatch('user/fetchFriendships')
  },
}
</script>
