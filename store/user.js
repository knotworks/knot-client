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
    return this.$axios.$post('/register', userData)
  },
  async login(__, credentials) {
    await this.$auth.loginWith('sanctum', {
      data: credentials,
    })
  },
  async fetchFriendships({ commit }) {
    const friendships = await this.$axios.$get('/api/friendships')
    commit('setFriendships', friendships)
  },
  async requestFriendship({ commit }, userId) {
    const friendships = await this.$axios.$post(
      `/api/friendships/add/${userId}`
    )
    commit('setFriendships', friendships)
  },
  async acceptFriendship({ commit }, senderId) {
    const friendships = await this.$axios.$post(
      `/api/friendships/accept/${senderId}`
    )
    commit('setFriendships', friendships)
  },
  async denyFriendship({ commit }, senderId) {
    const friendships = await this.$axios.$post(
      `/api/friendships/deny/${senderId}`
    )
    commit('setFriendships', friendships)
  },
}
