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
      class="
        absolute
        z-10
        inline-block
        px-2
        py-0
        font-bold
        tracking-wide
        text-gray-800
        uppercase
        bg-white
        rounded-full
        shadow-sm
        text-xxs
        -bottom-1.5
      "
    >
      {{ isLoading ? 'Loading...' : 'Edit' }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      avatar: null,
      isLoading: false,
    }
  },
  methods: {
    ...mapActions({
      updateAvatar: 'user/updateAvatar',
    }),
    async setAvatar(e) {
      this.isLoading = true
      this.avatar = e.target.files[0]

      await this.uploadAvatar()
    },
    async uploadAvatar() {
      const options = {
        timestamp: Date.now(),
        folder: `${this.$config.appEnv}/avatars`,
        upload_preset: 'avatars',
      }
      const signature = await this.$axios.$post(
        '/api/generate-cloudinary-signature',
        options
      )

      if (signature) {
        try {
          const asset = await this.$cloudinary.upload(this.avatar, {
            ...options,
            api_key: this.$config.cloudinaryApiKey,
            signature,
          })

          await this.updateAvatar(asset.public_id)
        } catch (e) {
          throw new Error(e)
        } finally {
          this.isLoading = false
        }
      } else {
        this.isLoading = false
        Promise.reject('Unable to generate signature for upload.')
      }
    },
  },
}
</script>
