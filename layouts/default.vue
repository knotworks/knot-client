<template>
  <div class="fixed top-0 left-0 w-screen h-screen bg-gray-200 layout-default">
    <Navbar>
      <img
        slot="title"
        src="~assets/images/logo.svg"
        class="h-8 cursor-pointer"
        @click="reload"
      />
    </Navbar>
    <nuxt />
    <BottomBar />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '~/components/Navbar'
import BottomBar from '~/components/BottomBar'
export default {
  components: {
    Navbar,
    BottomBar
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.fetchCurrentLocation(position.coords)
    })
  },
  methods: {
    ...mapActions('location', ['fetchCurrentLocation']),
    reload() {
      window.location.reload(true)
    }
  }
}
</script>

<style lang="scss">
.layout-default {
  display: grid;
  grid-template-rows: 44px minmax(1px, 1fr) 48px;
  grid-template-rows: calc(44px + env(safe-area-inset-top)) minmax(1px, 1fr) calc(
      48px + env(safe-area-inset-bottom)
    );
}
</style>
