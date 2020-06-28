{<template>
  <div
    class="relative flex items-center justify-center overflow-hidden bg-gray-200"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <CldImage
      v-if="user.profile_image"
      :public-id="user.profile_image"
      class="avatar"
    >
      <!-- eslint-disable -->
      <CldTransformation
        :width="size"
        :height="size"
        crop="lfill"
        dpr="auto"
        fetchFormat="auto"
      />
      <!-- eslint-enable -->
    </CldImage>
    <span
      v-else
      class="h-full font-bold text-gray-500"
      :style="`line-height:${size}px;`"
    >
      {{ nameFirstLetter }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'Avatar',
  props: {
    user: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 35,
    },
  },
  computed: {
    nameFirstLetter() {
      return this.user.first_name.charAt(0).toUpperCase()
    },
  },
}
</script>
