<template>
  <div class="relative overflow-hidden bg-gray-200">
    <CldImage
      :public-id="user.profile_image"
      :alt="user.first_name"
      :width="size"
      :height="size"
      crop="lfill"
      class="avatar"
      responsive="width"
    />
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
