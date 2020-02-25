<template>
  <div class="overflow-y-auto scrolling-touch">
    <Feed :posts="timeline.data" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Feed from '~/components/Feed'
export default {
  middleware: 'auth',
  components: {
    Feed
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetchTimeline')
  },
  computed: {
    ...mapGetters('posts', ['timeline'])
  }
}
</script>
