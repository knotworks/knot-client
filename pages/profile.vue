<template>
  <div
    class="flex items-center justify-center h-full text-xl font-bold text-gray-400"
  >
    <div class="text-center">
      <p>Coming soon</p>
      <button
        class="block w-full py-3 mt-2 text-sm font-bold tracking-widest text-white uppercase bg-red-600 rounded shadow-sm cursor-pointer focus:outline-none focus:shadow-outline-red"
        @click="logout"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      localStorage.removeItem('vuex')
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
