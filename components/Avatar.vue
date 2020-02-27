<template>
  <div
    class="relative overflow-hidden bg-gray-200"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <CldImage :public-id="user.profile_image" class="avatar">
      <!-- eslint-disable -->
      <CldTransformation
        :width="size"
        :height="size"
        crop="lfill"
        dpr="auto"
        fetchFormat="auto"
        quality="100"
      />
      <!-- eslint-enable -->
    </CldImage>
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
