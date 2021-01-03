<template>
  <li class="flex p-4 bg-white">
    <Avatar :user="meta.user" class="flex-shrink-0 rounded-full" />
    <div class="ml-4">
      <p>
        <span>
          <strong>{{ name }}</strong> {{ meta.action }}
        </span>
        <span v-if="meta.body">&ldquo;{{ meta.body }}&rdquo;</span>
      </p>
      <div class="flex items-center mt-1">
        <span>{{ meta.icon }}</span>
        <LiveDate
          :date="notification.created_at"
          class="ml-2 text-xs text-gray-500"
        />
      </div>
    </div>
    <div
      v-if="type === 'PostReactedTo'"
      class="self-center flex-shrink-0 pl-4 ml-auto text-4xl"
    >
      {{ reactionTypeToEmoji[notification.data.reaction.type] }}
    </div>
  </li>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    type() {
      return this.notification.type.replace('Knot\\Notifications\\', '')
    },
    meta() {
      const notification = this.notification
      return {
        FriendRequestAccepted: {
          user: notification.data.recipient,
          icon: '🤝',
          action: 'accepted your friend request.',
          body: false,
        },
        AddedPost: {
          user: notification.data.post?.user,
          icon: '📰',
          action: 'added a new post.',
          body: false,
        },
        PostCommentedOn: {
          user: notification.data.comment?.user,
          icon: '🗣',
          action: 'commented on your post:',
          body: notification.data.comment?.body,
        },
        PostReactedTo: {
          user: notification.data.reaction?.user,
          icon: '👍',
          action: 'reacted to your post.',
          body: false,
        },
        CommentRepliedTo: {
          user: notification.data.comment?.user,
          icon: '📨',
          action: 'replied to your comment:',
          body: notification.data.comment?.body,
        },
      }[this.type]
    },
    name() {
      return this.meta.user.full_name
    },
  },
  created() {
    this.reactionTypeToEmoji = {
      smile: '😊 ',
      love: '😍',
      frown: '☹️',
      surprise: '😮',
      laugh: '😆',
      angry: '😡',
    }
  },
}
</script>
