export const state = () => ({
  currentLocation: {
    lat: null,
    long: null,
    city: null
  },
  nearby: []
})

export const getters = {
  currentLocation: (state) => {
    return {
      lat: +parseFloat(state.currentLocation.lat).toFixed(6),
      long: +parseFloat(state.currentLocation.long).toFixed(6),
      city: state.currentLocation.city
    }
  },
  hasLocationSet: (state) => {
    return !!state.currentLocation.lat
  },
  nearby: (state) => state.nearby
}

export const mutations = {
  setCurrentLocation(state, location) {
    state.currentLocation = location
  },
  setNearby(state, nearby) {
    state.nearby = nearby
  }
}

export const actions = {
  async fetchCurrentLocation({ commit }, { lat, long }) {
    const location = await this.$client
      .withoutAuth()
      .post('https://opencagedata.butts.workers.dev', {
        lat,
        long
      })

    const { components } = location.results[0]
    const city = components.suburb ? components.suburb : components.city

    commit('setCurrentLocation', {
      lat,
      long,
      city
    })
  },
  async fetchNearby({ commit }, { lat, long }) {
    const nearby = await this.$client
      .withoutAuth()
      .post('https://foursquareplaces.butts.workers.dev', {
        lat,
        long
      })

    commit('setNearby', nearby.response.venues)
  }
}
