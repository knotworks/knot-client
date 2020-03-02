<template>
  <ul class="post-comments">
    <li
      v-for="comment in comments"
      :key="comment.id"
      class="flex items-start px-5 py-4 border-t border-grey-light"
    >
      <nuxt-link to="/" class="mr-2 flex-no-shrink">
        <Avatar :user="comment.user" :size="30" class="rounded-full" />
      </nuxt-link>
      <div class="-mt-1">
        <div class="mb-1 text-sm leading-normal text-gray-900">
          <strong>{{ comment.user.first_name }}: </strong> {{ comment.body }}
        </div>
        <div class="text-xs text-gray-600">
          <LiveDate :date="comment.created_at" />
          <span v-if="comment.location"> from {{ comment.location.city }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from '~/components/Avatar'
import LiveDate from '~/components/LiveDate'
export default {
  name: 'CommentsList',
  components: {
    Avatar,
    LiveDate
  },
  props: {
    comments: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    hasLocation() {
      return (
        this.comment.hasOwnProperty('location') &&
        this.comment.location.hasOwnProperty('city')
      )
    }
  }
}
</script>
