export const state = () => ({
  timeline: {
    current_page: 1,
    last_page: 1,
    data: [],
  },
  currentProfile: {
    user: {},
    posts: {
      current_page: 1,
      last_page: 1,
      data: [],
    },
  },
})

export const getters = {
  timeline: (state) => state.timeline,
  currentProfile: (state) => state.currentProfile,
}

export const mutations = {
  setTimeline(state, posts) {
    if (posts.current_page === 1) {
      state.timeline = posts
    } else {
      state.timeline = {
        ...posts,
        data: [...state.timeline.data, ...posts.data],
      }
    }
  },
  setCurrentProfile(state, profile) {
    if (profile.posts.current_page === 1) {
      state.currentProfile = profile
    } else {
      state.currentProfile = {
        user: profile.user,
        posts: {
          ...profile.posts,
          data: [...state.currentProfile.posts.data, ...profile.posts.data],
        },
      }
    }
  },
  addReaction(state, { id, reactions }) {
    state.timeline.data = state.timeline.data.map((post) => {
      if (post.id === id) {
        return { ...post, reactions }
      } else {
        return post
      }
    })

    state.currentProfile.posts.data = state.currentProfile.posts.data.map(
      (post) => {
        if (post.id === id) {
          return { ...post, reactions }
        } else {
          return post
        }
      }
    )
  },
  addComment(state, { id, comment }) {
    state.timeline.data = state.timeline.data.map((post) => {
      if (post.id === id) {
        return { ...post, comments: [...post.comments, comment] }
      } else {
        return post
      }
    })

    state.currentProfile.posts.data = state.currentProfile.posts.data.map(
      (post) => {
        if (post.id === id) {
          return { ...post, comments: [...post.comments, comment] }
        } else {
          return post
        }
      }
    )
  },
  deletePost(state, { id }) {
    state.timeline.data = state.timeline.data.filter((post) => {
      return post.id !== id
    })

    state.currentProfile.posts.data = state.currentProfile.posts.data.filter(
      (post) => {
        return post.id !== id
      }
    )
  },
}

export const actions = {
  async fetchTimeline({ commit }, page = 1) {
    const posts = await this.$axios.$get(`/timeline?page=${page}`)
    commit('setTimeline', posts)
  },
  async fetchProfile({ commit }, { id, page = 1 }) {
    const res = await this.$axios.$get(`/profile/${id}?page=${page}`)
    commit('setCurrentProfile', res)
  },
  async newPost(__, post) {
    await this.$axios.$post('/posts', post)
  },
  async addReaction({ commit }, { id, reaction }) {
    const { reactions } = await this.$axios.$post(
      `/posts/${id}/reactions`,
      reaction
    )
    commit('addReaction', {
      id,
      reactions,
    })
  },
  async addComment({ commit }, commentData) {
    const comment = await this.$axios.$post(
      `/posts/${commentData.id}/comments`,
      commentData
    )
    commit('addComment', {
      id: commentData.id,
      comment,
    })
  },
  async deletePost({ commit }, { id }) {
    await this.$axios.$delete(`/posts/${id}`)

    commit('deletePost', { id })
  },
}
