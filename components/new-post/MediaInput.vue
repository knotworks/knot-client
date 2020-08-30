<template>
  <div class="px-4 pt-3 overflow-hidden">
    <canvas
      ref="canvas"
      class="absolute invisible w-16 h-16"
      style="top: -9999px; left: -9999px"
    />
    <transition-group
      name="list"
      tag="div"
      class="relative flex flex-wrap w-full"
    >
      <div
        v-for="(media, i) in files"
        :key="media.uuid"
        class="relative flex items-center justify-center w-16 h-16 mb-4 mr-4 text-4xl text-gray-700 rounded-sm shadow-sm cursor-pointer bg-gray-50 media-input-container"
        :class="{ 'border border-gray-300': !media.preview }"
      >
        <img
          v-if="!media.loading"
          src="~/assets/images/icons/add-dark.svg"
          class="h-4"
        />
        <transition name="fade">
          <img
            v-if="media.preview"
            :src="media.preview"
            class="absolute top-0 left-0 object-cover w-full h-full rounded-sm"
          />
        </transition>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png, video/mp4, video/quicktime"
          class="absolute top-0 left-0 w-full h-full opacity-0"
          aria-label="Add file"
          @change="setFile(i, $event)"
        />
        <button
          v-show="media.file"
          class="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 -mt-2 -mr-3 text-sm text-white bg-red-500 rounded-full focus-none"
          type="button"
          aria-label="Close"
          @click="removeFile(i)"
        >
          <CloseIcon
            class="flex-shrink-0 block w-6 h-6 text-white fill-current"
          />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import loadImage from 'blueimp-load-image'
import CloseIcon from '~/assets/images/icons/close.svg?inline'
export default {
  components: {
    CloseIcon,
  },
  data() {
    return {
      files: [
        {
          file: null,
          preview: '',
          loading: false,
          uuid: this.generateTimestamp(),
        },
      ],
    }
  },
  computed: {
    hasVideo() {
      return this.files.some(
        (media) => media.file && this.fileIsVideo(media.file)
      )
    },
  },
  mounted() {
    this.$bus.$on('POST_CREATED', () => {
      this.files = [
        {
          file: null,
          preview: '',
          loading: false,
          uuid: this.generateTimestamp(),
        },
      ]
    })
  },
  methods: {
    fileIsVideo(file) {
      return file.type.match('video')
    },
    setFile(i, e) {
      if (e.target.files.length) {
        const wasPopulated = !!this.files[i].preview
        const file = e.target.files[0]

        if (this.fileIsVideo(file)) {
          if (this.hasVideo && !wasPopulated) {
            e.target.value = ''
            alert('You may only upload 1 video per post.')
            return false
          } else {
            this.files[i].file = file
            this.files[i].preview = '/video-preview.svg'
            this.$emit('change', this.files)
          }
        } else {
          this.files[i].loading = true
          loadImage(
            file,
            (canvas) => {
              this.files[i].preview = canvas.toDataURL()
              canvas.toBlob((blob) => {
                this.files[i].file = blob
                this.files[i].loading = false
                this.$emit('change', this.files)
              }, 'image/jpeg')
            },
            {
              canvas: true,
              contain: true,
              maxWidth: 2400,
              maxHeight: 3200,
              orientation: true,
            }
          )
        }
        if (!wasPopulated && this.files.length < 5) {
          this.files.push({
            file: null,
            preview: '',
            loading: false,
            uuid: this.generateTimestamp(),
          })
        }
      }
    },
    removeFile(i) {
      if (this.fileIsVideo(this.files[i].file)) {
        URL.revokeObjectURL(this.$refs.video.src)
      }
      this.files.splice(i, 1)
      this.$emit('change', this.files)
    },
    generateTimestamp() {
      return parseInt((new Date().getTime() / 1000).toFixed(0), 10)
    },
  },
}
</script>

<style>
.media-input-container {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
