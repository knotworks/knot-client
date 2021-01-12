import VuexPersistence from 'vuex-persist'

const POSTS_PER_PAGE = 10

const persistencePlugin = new VuexPersistence({
  reducer(state) {
    return {
      user: state.user,
      posts: {
        ...state.posts,
        timeline: {
          ...state.posts.timeline,
          current_page: 1,
          data: [...state.posts.timeline.data.slice(0, POSTS_PER_PAGE)],
        },
        currentProfile: {
          ...state.posts.currentProfile,
          posts: {
            ...state.posts.currentProfile.posts,
            current_page: 1,
            data: [
              ...state.posts.currentProfile.posts.data.slice(0, POSTS_PER_PAGE),
            ],
          },
        },
      },
      location: state.location,
    }
  },
})

export const plugins = [persistencePlugin.plugin]
