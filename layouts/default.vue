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
  mounted() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: long } = position.coords
        this.fetchCurrentLocation({ lat, long })
      },
      null,
      {
        enableHighAccuracy: true,
      }
    )
  },
  methods: {
    ...mapActions('location', ['fetchCurrentLocation']),
    reload() {
      window.location.reload(true)
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
