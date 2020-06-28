<template>
  <div class="flex px-4 py-3 bg-white">
    <Avatar :user="post.user" class="mr-4 rounded-full" />
    <div class="flex flex-col">
      <h1 class="text-sm font-semibold leading-none text-gray-900">
        {{ post.user.first_name }}
      </h1>
      <LiveDate :date="post.created_at" class="mt-1 text-xs text-gray-500" />
    </div>
    <div class="relative ml-auto">
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
        <img
          v-show="showReactions"
          src="~assets/images/icons/close.svg"
          class="h-6"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showReactions: false,
    }
  },
}
</script>

<style></style>
