<template>
  <div
    class="
      relative
      flex
      items-center
      justify-center
      overflow-hidden
      bg-gray-200
    "
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <client-only>
      <CldImage v-if="user.avatar" :public-id="user.avatar" class="avatar">
        <!-- eslint-disable -->
        <CldTransformation
          :width="size * 2"
          :height="size * 2"
          crop="thumb"
          dpr="auto"
          fetch-format="auto"
          responsive="width"
        />
        <!-- eslint-enable -->
      </CldImage>
      <span
        v-else
        class="h-full font-bold text-gray-500"
        :style="`font-size:${size / 2.1875}px;line-height:${size}px;`"
      >
        {{ nameFirstLetter }}
      </span>
    </client-only>
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
