<template>
  <div
    class="w-full max-w-xl px-3 py-4 space-y-6 overflow-y-auto scrolling-touch"
  >
    <div v-if="friendships.outgoing.length">
      <h3 class="text-lg font-semibold text-gray-900">Sent Requests</h3>
      <ul
        class="mt-1 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow-sm"
      >
        <li
          v-for="sent in friendships.outgoing"
          :key="sent.id"
          class="flex items-center p-4"
        >
          <Avatar :user="sent.recipient" class="mr-2 rounded-full" />
          <div class="font-medium">
            {{ sent.recipient.full_name }}
          </div>
          <div
            class="px-2 py-1 ml-auto text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full"
          >
            Pending
          </div>
        </li>
      </ul>
    </div>
    <div v-if="friendships.requests.length">
      <h3 class="text-lg font-semibold text-gray-900">Friend Requests</h3>
      <ul
        class="mt-2 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow-sm"
      >
        <li
          v-for="req in friendships.requests"
          :key="req.id"
          class="flex items-center p-4"
        >
          <Avatar :user="req.sender" class="mr-2 rounded-full" />
          <div class="font-medium">
            {{ req.sender.full_name }}
          </div>
          <div class="flex items-center h-full ml-auto">
            <button
              class="w-8 h-8 bg-red-200 rounded-full"
              @click="denyFriendship(req.sender_id)"
            >
              <CloseIcon class="w-full h-full text-red-800 fill-current" />
            </button>
            <button
              class="w-8 h-8 ml-4 text-white bg-green-200 rounded-full"
              @click="acceptFriendship(req.sender_id)"
            >
              <CheckIcon class="w-full h-full text-green-800 fill-current" />
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="friendships.friends.length">
      <h3 class="text-lg font-semibold text-gray-900">Friends</h3>
      <ul
        class="mt-2 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow-sm"
      >
        <li v-for="friend in friendships.friends" :key="friend.id">
          <nuxt-link
            :to="`/profile/${friend.id}`"
            class="flex items-center p-4 no-underline flex-no-shrink text-grey-darkest"
          >
            <Avatar :user="friend" class="mr-2 rounded-full" />
            <div class="font-medium">
              {{ friend.full_name }}
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div v-if="friendships.suggested.length">
      <h3 class="text-lg font-semibold text-gray-900">Suggested</h3>
      <ul
        class="mt-1 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow-sm"
      >
        <li
          v-for="user in friendships.suggested"
          :key="user.id"
          class="flex items-center p-4 bg-white border-b border-gray-100"
        >
          <Avatar :user="user" class="mr-2 rounded-full" />
          <div class="font-medium">
            {{ user.full_name }}
          </div>
          <div class="flex items-center ml-auto">
            <button
              class="w-8 h-8 bg-green-200 rounded-full"
              @click.stop="requestFriendship(user.id)"
            >
              <AddIcon class="w-full h-full text-green-800 fill-current" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddIcon from '~/assets/images/icons/add.svg?inline'
import CheckIcon from '~/assets/images/icons/check.svg?inline'
import CloseIcon from '~/assets/images/icons/close.svg?inline'

export default {
  components: {
    AddIcon,
    CheckIcon,
    CloseIcon,
  },
  computed: {
    ...mapGetters('user', ['friendships']),
  },
  async mounted() {
    await this.fetchFriendships()
  },
  methods: {
    ...mapActions('user', [
      'fetchFriendships',
      'requestFriendship',
      'acceptFriendship',
      'denyFriendship',
    ]),
  },
}
</script>

<style></style>
