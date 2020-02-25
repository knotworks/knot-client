<template>
  <div class="px-5 pt-2 pb-0 border-t border-gray-300">
    <transition-group
      name="post-reaction-list"
      tag="ul"
      class="flex flex-wrap post-reaction-list list-reset"
    >
      <li
        v-for="reaction in post.reactions"
        :key="reaction.id"
        class="relative mb-2 mr-2 leading-none post-reaction"
      >
        <nuxt-link to="/" class="flex-no-shrink">
          <Avatar :user="reaction.user" :size="25" class="rounded-sm"></Avatar>
        </nuxt-link>
        <img
          :src="reactionIconPath(reaction)"
          width="18"
          height="18"
          class="absolute w-4 h-4 post-reaction-icon"
        />
      </li>
    </transition-group>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar'
export default {
  components: {
    Avatar
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    reactionIconPath(reaction) {
      const reactions = {
        smile: '/reactions/smile.svg',
        love: '/reactions/love.svg',
        frown: '/reactions/frown.svg',
        surprise: '/reactions/surprise.svg',
        laugh: '/reactions/laugh.svg',
        angry: '/reactions/angry.svg'
      }

      return reactions[reaction.type]
    }
  }
}
</script>

<style lang="scss">
.post-reaction {
  transition: all 350ms;
}
.post-reaction-list-enter,
.post-reaction-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.post-reaction-list-leave-active {
  position: absolute;
}

img.post-reaction-icon {
  position: absolute;
  bottom: -2px;
  right: -4px;
}
</style>
