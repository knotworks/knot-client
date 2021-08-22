<template>
  <ul
    class="absolute top-0 right-0 z-10 flex justify-center w-8 py-1 mt-10 rounded-full flex-column post-actions bg-black/50"
  >
    <li class="inline-flex items-center justify-center">
      <button
        class="inline-flex items-center justify-center w-6 h-6 text-center text-white bg-red-600 rounded-full"
        aria-label="Delete Post"
        @click="doDeletePost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PostActions',
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions('posts', ['deletePost']),
    doDeletePost() {
      if (window.confirm('Are you sure you want to delete this post?')) {
        this.$emit('hide')
        this.deletePost({ id: this.postId })
      }
    },
  },
}
</script>

<style lang="scss">
.post-actions {
  &-enter-active,
  &-leave-active {
    transition: opacity 175ms cubic-bezier(0.42, 0, 0.58, 1),
      transform 175ms cubic-bezier(0.42, 0, 0.58, 1);
  }
  &-enter,
  &-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
