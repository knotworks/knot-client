<template>
  <ul class="post-comments">
    <li
      v-for="comment in comments"
      :key="comment.id"
      class="flex items-start px-5 py-4 border-t border-grey-light"
    >
      <NuxtLink :to="`/profile/${comment.user.id}`" class="flex-shrink-0 mr-2">
        <Avatar :user="comment.user" :size="30" class="rounded-full" />
      </NuxtLink>
      <div class="-mt-1">
        <div class="mb-1 text-sm leading-normal text-gray-900">
          <strong>{{ comment.user.first_name }}: </strong> {{ comment.body }}
        </div>
        <div class="text-xs text-gray-500">
          <LiveDate :date="comment.created_at" />
          <span v-if="hasLocation(comment)">
            from {{ comment.location.city }}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CommentsList',
  props: {
    comments: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    hasLocation(comment) {
      return !!comment.location?.city?.trim()
    },
  },
}
</script>
