export const state = () => ({
  friendships: []
})

export const getters = {
  friendships: (state) => state.friendships
}

export const mutations = {
  setFriendships(state, friendships) {
    state.friendships = friendships
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
  },
  async fetchFriendships({ commit }) {
    const friendships = await this.$client.get('/api/friendships')
    commit('setFriendships', friendships)
  }
}
