<template>
  <div class="px-2 bg-gray-100 border-t border-gray-200 bottom-bar">
    <NuxtLink
      to="/"
      class="inline-flex items-center justify-center w-full h-8 text-gray-400 cursor-pointer"
      active-class="text-red-500"
      aria-label="Timeline"
      exact
    >
      <TimelineIcon class="w-full h-full fill-current" />
    </NuxtLink>
    <NuxtLink
      to="/notifications"
      class="inline-flex items-center justify-center w-full h-8 text-gray-400 cursor-pointer"
      active-class="text-red-500"
      aria-label="Notifications"
      exact
    >
      <NotificationsIcon class="w-8 h-8 fill-current" />
    </NuxtLink>
    <div class="flex justify-center w-full">
      <NuxtLink
        to="/new-post"
        class="inline-flex items-center justify-center w-8 h-8 bg-red-600 rounded-full cursor-pointer btn-add-post"
        aria-label="Add Post"
        exact
      >
        <AddIcon class="w-6 h-6 text-white fill-current" />
      </NuxtLink>
    </div>
    <NuxtLink
      to="/profile"
      class="inline-flex items-center justify-center w-full h-8 text-gray-400 cursor-pointer"
      active-class="text-red-500"
      aria-label="Profile"
      exact
    >
      <ProfileIcon class="w-full h-full fill-current" />
    </NuxtLink>
    <NuxtLink
      to="/friends"
      class="inline-flex items-center justify-center w-full h-8 text-gray-400 cursor-pointer"
      active-class="text-red-500"
      aria-label="Friends"
      exact
    >
      <FriendsIcon class="w-full h-full fill-current" />
    </NuxtLink>
  </div>
</template>

<script>
import AddIcon from '~/assets/images/icons/add.svg?inline'
import TimelineIcon from '~/assets/images/icons/timeline.svg?inline'
import NotificationsIcon from '~/assets/images/icons/notifications.svg?inline'
import FriendsIcon from '~/assets/images/icons/friends.svg?inline'
import ProfileIcon from '~/assets/images/icons/profile.svg?inline'
export default {
  components: {
    AddIcon,
    TimelineIcon,
    NotificationsIcon,
    FriendsIcon,
    ProfileIcon,
  },
}
</script>

<style lang="scss">
.bottom-bar {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: calc(0px + env(safe-area-inset-bottom));
}
</style>
