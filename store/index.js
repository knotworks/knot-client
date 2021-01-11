export const actions = {
  async nuxtServerInit() {
    await this.$axios.$get('/api/user')
  },
}
