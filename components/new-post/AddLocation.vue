<template>
  <div class="absolute top-0 left-0 z-30 w-screen bg-white panel">
    <Navbar>
      <button slot="left-buttons" @click="$emit('close')">Close</button>
      <span slot="title" class="text-white">Nearby</span>
    </Navbar>
    <div class="overflow-y-auto scrolling-touch">
      <div class="border-b border-gray-300">
        <input
          v-model="query"
          type="text"
          class="w-full px-4 py-2 outline-none appearance-none"
          placeholder="Search for a location..."
          @input="searchLocation"
        />
      </div>
      <ul>
        <li
          v-for="place in nearby"
          :key="place.id"
          class="px-4 py-2 border-b border-gray-300 cursor-pointer"
          @click="$emit('change', place)"
        >
          <h3 class="text-base text-gray-800">
            {{ place.name }}
          </h3>
          <small v-if="place.categories.length" class="text-gray-500">
            {{ place.categories[0].name }}
          </small>
          <small v-if="place.location.address" class="text-gray-500">
            at {{ place.location.address }}
          </small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  data() {
    return {
      isLoading: false,
      query: '',
    }
  },
  computed: {
    ...mapGetters('location', ['currentLocation', 'nearby', 'hasLocationSet']),
  },
  created() {
    this.searchLocation = debounce(async () => {
      const { lat, long } = this.currentLocation
      await this.fetchNearby({ lat, long, query: this.query })
      this.isLoading = false
    }, 500)
  },
  async mounted() {
    this.isLoading = true
    if (!this.hasLocationSet) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: long } = position.coords
          await this.fetchNearby({ lat, long })
          this.isLoading = false
        },
        null,
        {
          enableHighAccuracy: true,
        }
      )
    } else {
      const { lat, long } = this.currentLocation
      await this.fetchNearby({ lat, long })
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions('location', ['fetchCurrentLocation', 'fetchNearby']),
    searchLocation: () => {},
  },
}
</script>

<style scoped>
.panel {
  display: grid;
  grid-template-rows: 44px 1fr;
  grid-template-rows: calc(44px + constant(safe-area-inset-top)) 1fr;
  grid-template-rows: calc(44px + env(safe-area-inset-top)) 1fr;
  height: 100vh;
}
</style>
