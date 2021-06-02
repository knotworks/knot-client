<template>
  <div>
    <div v-if="media.length > 1">
      <client-only>
        <Carousel>
          <div
            v-for="item in media"
            :key="item.id"
            class="relative w-full h-0 min-w-full bg-gray-100"
            :style="{ paddingBottom: `${baseRatio}%` }"
          >
            <div
              class="absolute top-0 left-0 flex items-center justify-center w-full h-full"
            >
              <div
                v-if="item.type === 'image'"
                class="w-full h-auto"
                @click="openPhoto(item, $event)"
              >
                <CldImage
                  :public-id="item.path"
                  responsive
                  fetch-format="auto"
                  quality="auto"
                  loading="lazy"
                  dpr="auto"
                >
                  <CldPlaceholder />
                </CldImage>
              </div>
              <CldVideo
                v-else
                :public-id="item.path"
                width="500"
                crop="scale"
                class="w-full"
                loading="lazy"
                :poster="`https://res.cloudinary.com/${$config.cloudinaryCloudName}/video/upload/v1/${item.path}.jpeg`"
                controls
              />
            </div>
          </div>
        </Carousel>
      </client-only>
    </div>
    <div
      v-else
      class="relative w-full h-0 bg-gray-200"
      :style="{ paddingBottom: `${intrinsicRatio(media[0])}%` }"
    >
      <div
        v-if="media[0].type === 'image'"
        class="absolute top-0 left-0 w-full h-full"
        @click="openPhoto(media[0], $event)"
      >
        <CldImage
          :public-id="media[0].path"
          responsive="width"
          class="absolute top-0 left-0 w-full h-full transition-opacity"
          loading="lazy"
        >
          <CldTransformation
            dpr="auto"
            fetch-format="auto"
            crop="scale"
            quality="100"
          />
        </CldImage>
      </div>
      <CldVideo
        v-else
        :public-id="media[0].path"
        class="absolute top-0 left-0 w-full h-full"
        width="500"
        crop="scale"
        loading="lazy"
        :poster="`https://res.cloudinary.com/${$config.cloudinaryCloudName}/video/upload/v1/${media[0].path}.jpeg`"
        controls
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cloudName() {
      return this.$config.cloudinaryCloudName
    },
    baseRatio() {
      return [...this.media]
        .map((media) => this.intrinsicRatio(media))
        .sort((a, b) => b - a)[0]
    },
  },
  methods: {
    intrinsicRatio(media) {
      return (media.height / media.width) * 100
    },
    responsiveSetting(media) {
      return media.width >= media.height ? 'width' : 'height'
    },
    getImageUrl(image, maxDimensions = 1500) {
      return this.$cloudinary.image.url(image.path, {
        width: maxDimensions,
        height: maxDimensions,
        crop: 'fit',
        fetch_format: 'auto',
      })
    },
    openPhoto(image, e) {
      const targetRect = e.currentTarget.getBoundingClientRect()
      this.$bus.$emit('OPEN_IMAGE', {
        src: this.getImageUrl(image),
        msrc: this.getImageUrl(image, 500),
        w: image.width,
        h: image.height,
        thumb: {
          x: targetRect.left,
          y: targetRect.top,
          w: targetRect.width,
        },
      })
    },
  },
}
</script>

<style>
.cld-image {
  opacity: 0;
}
.cld-image.cld-image-loaded {
  opacity: 1;
}
</style>
