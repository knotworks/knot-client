<template>
  <div
    :style="{ width: size + 'px', height: size + 'px' }"
    class="relative overflow-hidden bg-gray-200"
  >
    <CldImage
      v-if="user.profile_image"
      :public-id="user.profile_image"
      :alt="user.first_name"
      :width="size"
      :height="size"
      crop="lfill"
      class="avatar"
      responsive="width"
    />
    <div
      v-else
      class="flex items-center justify-center font-bold text-gray-600 bg-blue-200 rounded-sm default-avatar"
      :style="`line-height:${size}px;font-size:${size - 11}px;`"
    >
      <span>{{ initials }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Avatar',
  props: {
    user: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 35
    }
  },
  computed: {
    initials() {
      return this.user.first_name.charAt(0).toUpperCase()
    }
  }
}
</script>
