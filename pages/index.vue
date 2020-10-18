<template>
  <div class="overflow-y-auto scrolling-touch">
    <Feed :posts="timeline.data" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  async fetch() {
    await this.fetchTimeline()
    await this.fetchFriendships()
  },
  computed: {
    ...mapGetters('posts', ['timeline']),
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async mounted() {
    this.$bus.$on('POST_CREATED', async () => {
      await this.fetchTimeline()
    })
  },
  methods: mapActions({
    fetchTimeline: 'posts/fetchTimeline',
    fetchFriendships: 'user/fetchFriendships',
  }),
}
</script>
