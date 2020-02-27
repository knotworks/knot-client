<template>
  <div v-if="media.length > 1">
    <client-only>
      <flickity class="post-media" :options="flickityOptions">
        <div
          v-for="item in media"
          :key="item.id"
          class="relative w-full h-0 bg-gray-100"
          :style="{ paddingBottom: baseRatio }"
        >
          <div
            class="absolute top-0 left-0 flex items-center justify-center w-full h-full"
          >
            <CldImage :public-id="item.path" responsive="width" lazy>
              <!-- eslint-disable -->
              <CldTransformation
                dpr="auto"
                fetchFormat="auto"
                crop="scale"
                quality="100"
              />
              <!-- eslint-enable -->
            </CldImage>
          </div>
        </div>
      </flickity>
    </client-only>
  </div>
  <div
    v-else
    class="relative w-full h-0 bg-gray-200"
    :style="{ paddingBottom: intrinsicRatio(media[0]) }"
  >
    <CldImage
      :public-id="media[0].path"
      responsive="width"
      class="absolute top-0 left-0 w-full h-full"
      lazy
    >
      <!-- eslint-disable -->
      <CldTransformation
        dpr="auto"
        fetchFormat="auto"
        crop="scale"
        quality="100"
      />
      <!-- eslint-enable -->
    </CldImage>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        adaptiveHeight: false
      }
    }
  },
  computed: {
    baseRatio() {
      const media = [...this.media].sort((a, b) => {
        return b.height - a.height
      })[0]

      return this.intrinsicRatio(media)
    }
  },
  methods: {
    intrinsicRatio(media) {
      return `${(media.height / media.width) * 100}%`
    },
    responsiveSetting(media) {
      return media.width >= media.height ? 'width' : 'height'
    }
  }
}
</script>

<style lang="scss">
.flickity-page-dots {
  position: relative;
  bottom: 0;
  margin: 10px 0;

  .dot {
    background-color: transparent;
    border: 2px solid theme('colors.gray.500');
    opacity: 0.75;

    &.is-selected {
      background-color: theme('colors.gray.500');
    }
  }
}
</style>
