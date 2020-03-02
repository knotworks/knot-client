<template>
  <div class="absolute top-0 left-0 z-30 w-screen h-screen bg-white">
    <Navbar>
      <button slot="left-buttons" @click="$emit('close')">Close</button>
      <span slot="title" class="text-white">Nearby</span>
    </Navbar>
    <ul>
      <li
        v-for="place in nearby"
        :key="place.id"
        class="px-4 py-2 border-b border-gray-300 cursor-pointer"
        @click="$emit('change', place)"
      >
        <h3 class="text-base text-gray-800">{{ place.name }}</h3>
        <small v-if="place.categories.length" class="text-gray-500">
          {{ place.categories[0].name }}
        </small>
        <small v-if="place.location.address" class="text-gray-500">
          at {{ place.location.address }}
        </small>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '~/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('location', ['currentLocation', 'nearby', 'hasLocationSet'])
  },
  async mounted() {
    this.isLoading = true
    if (!this.hasLocationSet) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: long } = position.coords
        await this.fetchNearby({ lat, long })
        this.isLoading = false
      })
    } else {
      const { lat, long } = this.currentLocation
      await this.fetchNearby({ lat, long })
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions('location', ['fetchCurrentLocation', 'fetchNearby'])
  }
}
</script>
