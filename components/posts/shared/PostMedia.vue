<template>
  <div v-if="media.length > 1">
    <client-only>
      <flickity class="post-media" :options="flickityOptions">
        <div
          v-for="item in media"
          :key="item.id"
          class="relative w-full h-0 media-wrapper"
          :style="{ paddingBottom: shortestRatio }"
        >
          <CldImage
            :public-id="item.path"
            :responsive="responsiveSetting(item)"
            dpr="auto"
            quality="auto"
            fetch-format="auto"
            crop="scale"
            placeholder="color"
            class="absolute top-0 h-full"
            lazy
          />
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
      dpr="auto"
      quality="auto"
      fetch-format="auto"
      crop="scale"
      responsive="width"
      placeholder="color"
      class="absolute top-0 left-0 w-full h-full"
      lazy
    />
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
    shortestRatio() {
      const media = [...this.media].sort((a, b) => {
        return a.height - b.height
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
.post-media {
  .flickity-slider {
    display: flex;
    align-items: center;
  }
}

.media-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;

  .cld-image > img {
    height: 100%;
  }
}

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
