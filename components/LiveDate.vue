<template>
  <span>{{ liveDate }}</span>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
// import { utcToZonedTime } from 'date-fns-tz'
export default {
  name: 'LiveDate',
  props: {
    date: {
      type: String,
      default: '0000-00-00 00:00:00:00Z'
    }
  },
  data() {
    return {
      liveDate: this.getDateDistance(),
      interval: null
    }
  },
  computed: {
    timezone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  },
  created() {
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
      return formatDistanceToNow(new Date(`${this.date}:00Z`), {
        addSuffix: true
      })
    }
  }
}
</script>
