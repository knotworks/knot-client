<template>
  <div>
    <ul class="text-gray-700 border-b border-gray-300 divide-y divide-gray-300">
      <NotificationItem
        v-for="notification in notifications.data"
        :key="notification.id"
        :notification="notification"
      />
    </ul>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  async fetch() {
    await this.fetchNotifications()
  },
  computed: {
    ...mapGetters({
      notifications: 'user/notifications',
    }),
  },
  activated() {
    this.$fetch()
  },
  methods: {
    ...mapActions({
      fetchNotifications: 'user/fetchNotifications',
    }),
  },
}
</script>
