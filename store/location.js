export const state = () => ({
  currentLocation: {
    lat: null,
    lon: null,
    city: null,
  },
  nearby: [],
})

export const getters = {
  currentLocation: (state) => {
    return {
      lat: +parseFloat(state.currentLocation.lat).toFixed(6),
      lon: +parseFloat(state.currentLocation.lon).toFixed(6),
      city: state.currentLocation.city,
    }
  },
  hasLocationSet: (state) => {
    return !!state.currentLocation.lat || !!state.currentLocation.lon
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
  async fetchCurrentLocation({ commit }, { lat, lon }) {
    commit('setCurrentLocation', {
      lat,
      lon,
      city: null,
    })

    const location = await this.$axios.$post('/api/services/current-location', {
      lat,
      lon,
    })
    const { components } = location.results[0]

    if (components) {
      const city = components.city || components.town || components.suburb
      commit('setCurrentLocation', {
        lat,
        lon,
        city,
      })
    }
  },
  async fetchNearby({ commit }, { lat, lon, query = '' }) {
    const nearby = await this.$axios.$post('/api/services/nearby', {
      lat,
      lon,
      query,
    })

    commit('setNearby', nearby.response.venues)
  },
}
