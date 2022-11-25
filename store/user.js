export const state = () => ({
  friendships: {
    outgoing: [],
    requests: [],
    suggested: [],
    friends: [],
  },
  notifications: {
    current_page: 1,
    last_page: 1,
    data: [],
  },
})

export const getters = {
  friendships: (state) => state.friendships,
  notifications: (state) => {
    return {
      ...state.notifications,
      data: [
        ...state.notifications.data.filter(
          (notification) =>
            notification.type !== 'Knot\\Notifications\\AddedAsFriend'
        ),
      ],
    }
  },
}

export const mutations = {
  setFriendships(state, friendships) {
    state.friendships = friendships
  },
  setNotifications(state, notifications) {
    if (notifications.current_page === 1) {
      state.notifications = notifications
    } else {
      state.notifications = {
        ...notifications,
        data: [...state.notifications.data, ...notifications.data],
      }
    }
  },
}

export const actions = {
  register(__, userData) {
    return this.$axios.$post('/api/register', userData)
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
  async requestPasswordReset(__, email) {
    await this.$axios.$post('/api/forgot-password', email)
  },
  async updateAvatar({ rootGetters, commit }, avatarPath) {
    const user = await this.$axios.$put('/api/profile/avatar', {
      avatar: avatarPath,
    })

    updateCurrentUser(user, { rootGetters, commit, $auth: this.$auth })
  },
  async updateProfile({ rootGetters, commit }, profile) {
    const user = await this.$axios.$put('/api/profile/update', profile)
    updateCurrentUser(user, { rootGetters, commit, $auth: this.$auth })
  },
  async fetchNotifications({ commit }, page = 1) {
    const notifications = await this.$axios.$get(
      `/api/notifications?page=${page}`
    )

    commit('setNotifications', notifications)
  },
}

const updateCurrentUser = (userData, { rootGetters, commit, $auth }) => {
  $auth.setUser(userData)
  if (rootGetters['posts/currentProfile'].user.id === $auth.user.id) {
    // Update current profile
    commit(
      'posts/setCurrentProfile',
      {
        ...rootGetters['posts/currentProfile'],
        user: userData,
      },
      { root: true }
    )
  }
}
