export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  register(__, userData) {
    return this.$client.withoutAuth().post('/api/auth/register', userData)
  },
  login(__, credentials) {
    return this.$auth.loginWith('local', {
      data: credentials
    })
  }
}
