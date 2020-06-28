export const state = () => ({
  friendships: {
    outgoing: [],
    requests: [],
    suggested: [],
    friends: [],
  },
})

export const getters = {
  friendships: (state) => state.friendships,
}

export const mutations = {
  setFriendships(state, friendships) {
    state.friendships = friendships
  },
}

export const actions = {
  register(__, userData) {
    return this.$client.post('/api/auth/register', userData)
  },
  login(__, credentials) {
    return this.$auth.loginWith('local', {
      data: credentials,
    })
  },
  async fetchFriendships({ commit }) {
    const friendships = await this.$client.get('/api/friendships')
    commit('setFriendships', friendships)
  },
  async requestFriendship({ commit }, userId) {
    const friendships = await this.$client.post(
      `/api/friendships/add/${userId}`
    )
    commit('setFriendships', friendships)
  },
  async acceptFriendship({ commit }, senderId) {
    const friendships = await this.$client.post(
      `/api/friendships/accept/${senderId}`
    )
    commit('setFriendships', friendships)
  },
  async denyFriendship({ commit }, senderId) {
    const friendships = await this.$client.post(
      `/api/friendships/deny/${senderId}`
    )
    commit('setFriendships', friendships)
  },
}
