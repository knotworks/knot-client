<template>
  <div class="relative inline-flex flex-col items-center text-center">
    <input
      type="file"
      accept="image/jpg, image/jpeg, image/png"
      class="absolute top-0 left-0 z-20 w-full h-full opacity-0"
      aria-label="Update Avatar"
      @change="setAvatar"
    />
    <Avatar
      :user="$auth.user"
      class="rounded-full ring ring-gray-300"
      :size="70"
    />
    <transition name="fade">
      <div
        v-show="isLoading"
        class="absolute inset-0 z-10 bg-black bg-opacity-75 rounded-full"
        style="backdrop-filter: blur(3px) saturate(180%)"
      ></div>
    </transition>
    <div
      class="absolute z-10 inline-block px-2 py-0 font-bold tracking-wide text-gray-800 uppercase bg-white rounded-full shadow-sm text-xxs -bottom-1.5"
    >
      {{ isLoading ? 'Loading...' : 'Edit' }}
    </div>
  </div>
</template>

<script>
import loadImage from 'blueimp-load-image'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      avatarData: null,
      isLoading: false,
    }
  },
  methods: {
    ...mapActions({
      updateAvatar: 'user/updateAvatar',
    }),
    setAvatar(e) {
      this.isLoading = true
      const [file] = e.target.files
      loadImage(
        file,
        async (canvas) => {
          this.avatarData = canvas.toDataURL()
          await this.uploadAvatar()
        },
        {
          canvas: true,
          contain: true,
          maxWidth: 500,
          maxHeight: 500,
          orientation: true,
        }
      )
    },
    async uploadAvatar() {
      const options = {
        timestamp: Date.now(),
        folder: `${this.$config.env}/avatars` || 'production/avatars',
      }
      const signature = await this.$axios.$post(
        '/api/generate-cloudinary-signature',
        options
      )

      if (signature) {
        try {
          const asset = await this.$cloudinary.upload(this.avatarData, {
            ...options,
            api_key: this.$config.cloudinaryApiKey,
            signature,
          })

          await this.updateAvatar(asset.public_id)
          this.isLoading = false
        } catch (e) {
          throw new Error(e)
        }
      } else {
        Promise.reject('Unable to generate signature for upload.')
      }
    },
  },
}
</script>
