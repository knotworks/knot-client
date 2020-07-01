<template>
  <span>{{ liveDate }}</span>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
export default {
  name: 'LiveDate',
  props: {
    date: {
      type: String,
      default: '0000-00-00T00:00:00',
    },
  },
  data() {
    return {
      liveDate: '',
      interval: null,
    }
  },
  created() {
    this.liveDate = this.getDateDistance()
    if (this.interval) {
      clearInterval(this.interval)
    }

    this.interval = setInterval(() => {
      this.liveDate = this.getDateDistance()
    }, 1000 * 60)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    getDateDistance() {
      return formatDistanceToNow(new Date(this.date), {
        addSuffix: true,
      })
    },
  },
}
</script>
