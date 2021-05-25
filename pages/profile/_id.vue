<template>
  <div class="overflow-y-auto scrolling-touch">
    <transition name="slide-up">
      <EditProfile
        v-show="isEditingProfile"
        @close="isEditingProfile = false"
      />
    </transition>
    <div class="flex items-center px-4 py-8 bg-gray-800">
      <Avatar
        :user="currentProfile.user"
        class="mr-4 rounded-full"
        :size="70"
      />
      <div>
        <p class="text-xl font-semibold text-white">
          {{ currentProfile.user.full_name }}
        </p>
        <div v-if="isUserProfile">
          <button
            class="px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-red-600 rounded-full shadow-sm"
            @click="isEditingProfile = true"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
    <Feed :posts="currentProfile.posts.data" @loadNextPage="loadNextPage" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async fetch({ store, params }) {
    await store.dispatch('posts/fetchProfile', { page: 1, id: params.id })
  },
  data() {
    return {
      isEditingProfile: false,
    }
  },
  computed: {
    ...mapGetters('posts', ['currentProfile']),
    isUserProfile() {
      return this.currentProfile.user.id === this.$auth.user.id
    },
  },
  mounted() {
    this.$bus.$on('POST_CREATED', async () => {
      if (this.$route.params.id) {
        await this.$store.dispatch('posts/fetchProfile', {
          page: 1,
          id: this.$route.params.id,
        })
      }
    })
  },
  methods: {
    ...mapActions('posts', ['fetchProfile']),
    loadNextPage() {
      const {
        current_page: currentPage,
        last_page: lastPage,
      } = this.currentProfile
      if (currentPage < lastPage) {
        this.fetchProfile({ id: this.$route.params.id, page: currentPage + 1 })
      }
    },
  },
}
</script>
