<template>
  <div class="absolute top-0 left-0 z-30 w-screen bg-white panel">
    <Navbar>
      <button slot="left-buttons" @click="$emit('close')">
        Close
      </button>
      <span slot="title" class="text-white">People</span>
      <button slot="right-buttons" @click="$emit('change', selectedFriends)">
        Done
      </button>
    </Navbar>
    <ul class="overflow-y-auto">
      <li
        v-for="friend in friendships.friends"
        :key="friend.id"
        class="flex items-center h-16 px-4 border-b border-gray-300 cursor-pointer"
        @click="toggleFriend(friend)"
      >
        <Avatar :user="friend" />
        <span class="inline-block ml-3 font-semibold text-gray-700">{{
          friend.full_name
        }}</span>
        <div v-show="friendIsSelected(friend)" class="ml-auto">
          <CheckIcon class="w-6 h-6 text-gray-700" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '~/components/Navbar.vue'
import Avatar from '~/components/Avatar.vue'
import CheckIcon from '~/assets/images/icons/check.svg?inline'
export default {
  components: {
    Navbar,
    Avatar,
    CheckIcon,
  },
  data() {
    return {
      selectedFriends: [],
    }
  },
  computed: {
    ...mapGetters('user', ['friendships']),
  },
  methods: {
    toggleFriend(friend) {
      const index = this.selectedFriends.findIndex((f) => f.id === friend.id)
      if (index > -1) {
        this.selectedFriends.splice(index, 1)
      } else {
        this.selectedFriends.push(friend)
      }
    },
    friendIsSelected(friend) {
      return !!this.selectedFriends.find((f) => f.id === friend.id)
    },
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
