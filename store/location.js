export const state = () => ({
  currentLocation: {
    lat: null,
    long: null,
    city: null,
  },
  nearby: [],
})

export const getters = {
  currentLocation: (state) => {
    return {
      lat: +parseFloat(state.currentLocation.lat).toFixed(6),
      long: +parseFloat(state.currentLocation.long).toFixed(6),
      city: state.currentLocation.city,
    }
  },
  hasLocationSet: (state) => {
    return !!state.currentLocation.lat
  },
  nearby: (state) => state.nearby,
}

export const mutations = {
  setCurrentLocation(state, location) {
    state.currentLocation = location
  },
  setNearby(state, nearby) {
    state.nearby = nearby
  },
}

export const actions = {
  async fetchCurrentLocation({ commit }, { lat, long }) {
    const location = await this.$client.post(
      'https://opencagedata.syropia.workers.dev',
      {
        lat,
        long,
      }
    )
    const { components } = location.results[0]
    const city = components.city || components.town || components.suburb

    commit('setCurrentLocation', {
      lat,
      long,
      city,
    })
  },
  async fetchNearby({ commit }, { lat, long, query = '' }) {
    const nearby = await this.$client.post(
      'https://foursquareplaces.syropia.workers.dev',
      {
        lat,
        long,
        query,
      }
    )

    commit('setNearby', nearby.response.venues)
  },
}
