<template>
  <div class="overflow-y-auto scrolling-touch">
    <Feed :posts="timeline.data" @loadNextPage="loadNextPage" />
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
    if (this.$fetchState.timestamp <= Date.now() - 5000) {
      this.$fetch()
    }
  },
  mounted() {
    this.$bus.$on('POST_CREATED', async () => {
      await this.fetchTimeline()
    })
  },
  methods: {
    ...mapActions({
      fetchTimeline: 'posts/fetchTimeline',
      fetchFriendships: 'user/fetchFriendships',
    }),
    loadNextPage() {
      const { current_page: currentPage, last_page: lastPage } = this.timeline
      if (currentPage < lastPage) {
        this.fetchTimeline(currentPage + 1)
      }
    },
  },
}
</script>
