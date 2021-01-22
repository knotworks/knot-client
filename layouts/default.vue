<template>
  <div
    class="absolute top-0 left-0 z-10 w-screen h-screen bg-gray-100 layout-default"
  >
    <PhotoSwipe />
    <transition name="slide-up">
      <NewPost
        v-show="newPostModalShowing"
        @close="newPostModalShowing = false"
      />
    </transition>
    <Navbar>
      <KnotLogo slot="title" class="h-8 cursor-pointer" @click="reload" />
    </Navbar>
    <Nuxt keep-alive :keep-alive-props="{ max: 7 }" />
    <BottomBar @newPost="newPostModalShowing = true" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import KnotLogo from '~/assets/images/logo.svg?inline'

export default {
  middleware: 'auth',
  components: {
    KnotLogo,
  },
  data() {
    return {
      newPostModalShowing: false,
    }
  },
  watch: {
    $route() {
      this.fetchLocation()
    },
  },
  mounted() {
    this.fetchLocation()
  },
  methods: {
    ...mapActions('location', ['fetchCurrentLocation']),
    fetchLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: long } = position.coords
          console.log(position.coords)
          if (lat && long) {
            this.fetchCurrentLocation({ lat, long })
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for Geolocation.')
              break

            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.')
              break

            case error.TIMEOUT:
              console.error('The request to get user location timed out.')
              break

            case error.UNKNOWN_ERROR:
              console.error('An unknown error occurred.')
              break
          }
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      )
    },
    reload() {
      window.location.reload()
    },
  },
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
