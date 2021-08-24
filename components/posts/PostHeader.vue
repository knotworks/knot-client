<template>
  <div class="flex px-4 py-3 bg-white">
    <NuxtLink :to="`/profile/${post.user.id}`">
      <Avatar :user="post.user" class="mr-4 rounded-full" />
    </NuxtLink>
    <div class="flex flex-col">
      <h1 class="text-sm font-semibold leading-none text-gray-900">
        {{ post.user.first_name }}
      </h1>
      <LiveDate :date="post.created_at" class="mt-1 text-xs text-gray-500" />
    </div>
    <div class="flex items-center ml-auto space-x-2">
      <div class="relative">
        <transition name="reactions">
          <AddReaction
            v-show="showReactions"
            :post-id="post.id"
            @hide="showReactions = false"
          />
        </transition>
        <button
          class="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full cursor-pointer text-zero focus-none"
          type="button"
          @click="showReactions = !showReactions"
        >
          <img
            v-show="!showReactions"
            src="~assets/images/icons/heart.svg"
            class="h-4"
          />
          <CloseIcon v-show="showReactions" class="w-6 h-6 text-gray-500" />
        </button>
      </div>
      <div v-if="canModifyOrDeletePost" class="relative">
        <transition name="post-actions">
          <PostActions
            v-show="showPostActions"
            :post-id="post.id"
            @hide="showPostActions = false"
          />
        </transition>
        <button
          class="flex items-center justify-center w-8 h-8 text-gray-500 bg-gray-200 rounded-full cursor-pointer text-zero focus-none"
          type="button"
          @click="showPostActions = !showPostActions"
        >
          <svg
            v-show="!showPostActions"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
            />
          </svg>
          <CloseIcon v-show="showPostActions" class="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '~/assets/images/icons/close.svg?inline'
export default {
  components: {
    CloseIcon,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showReactions: false,
      showPostActions: false,
    }
  },
  computed: {
    canModifyOrDeletePost() {
      return (
        this.$auth.user.is_admin || this.post.user_id === this.$auth.user.id
      )
    },
  },
}
</script>
