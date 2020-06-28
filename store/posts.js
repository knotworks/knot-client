export const state = () => ({
  timeline: {
    current_page: 1,
    last_page: 1,
    data: [],
  },
})

export const getters = {
  timeline: (state) => state.timeline,
}

export const mutations = {
  setTimeline(state, posts) {
    state.timeline = posts
  },
  addReaction(state, { id, reactions }) {
    state.timeline.data = state.timeline.data.map((post) => {
      if (post.id === id) {
        return { ...post, reactions }
      } else {
        return post
      }
    })
  },
  addComment(state, { id, comment }) {
    state.timeline.data = state.timeline.data.map((post) => {
      if (post.id === id) {
        return { ...post, comments: [...post.comments, comment] }
      } else {
        return post
      }
    })
  },
}

export const actions = {
  async fetchTimeline({ commit }, page = 1) {
    const posts = await this.$client.get(`/api/timeline?page=${page}`)
    commit('setTimeline', posts)
  },
  async newPost(__, post) {
    await this.$client.post('/api/posts', post)
  },
  async addReaction({ commit }, { id, reaction }) {
    const { reactions } = await this.$client.post(
      `/api/posts/${id}/reactions`,
      reaction
    )
    commit('addReaction', {
      id,
      reactions,
    })
  },
  async addComment({ commit }, commentData) {
    const comment = await this.$client.post(
      `/api/posts/${commentData.id}/comments`,
      commentData
    )
    commit('addComment', {
      id: commentData.id,
      comment,
    })
  },
}
