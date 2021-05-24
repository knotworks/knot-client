<template>
  <div class="absolute top-0 left-0 z-30 w-screen h-screen bg-gray-100">
    <Navbar>
      <button slot="left-buttons" @click="closePanel">Close</button>
      <span slot="title" class="text-white">Edit Profile</span>
    </Navbar>
    <div class="p-4">
      <div class="flex">
        <div class="mr-4">
          <EditAvatar />
        </div>
        <form
          class="flex flex-col flex-grow space-y-2"
          @submit.prevent="doUpdateProfile"
        >
          <input
            v-model="user.email"
            class="
              w-full
              h-12
              px-3
              text-gray-700
              transition-colors
              duration-150
              ease-linear
              border-2 border-gray-200
              rounded
              outline-none
              appearance-none
              focus:border-primary-600
            "
            type="email"
            placeholder="Email"
          />
          <input
            v-model="user.first_name"
            class="
              w-full
              h-12
              px-3
              text-gray-700
              transition-colors
              duration-150
              ease-linear
              border-2 border-gray-200
              rounded
              outline-none
              appearance-none
              focus:border-primary-600
            "
            type="text"
            placeholder="First Name"
          />
          <input
            v-model="user.last_name"
            class="
              w-full
              h-12
              px-3
              text-gray-700
              transition-colors
              duration-150
              ease-linear
              border-2 border-gray-200
              rounded
              outline-none
              appearance-none
              focus:border-primary-600
            "
            type="text"
            placeholder="Last Name"
          />
          <div>
            <p class="mt-4 font-bold text-gray-700">Change Your Password</p>
            <div class="flex flex-col mt-2 space-y-2">
              <input
                v-model="user.current_password"
                class="
                  w-full
                  h-12
                  px-3
                  text-gray-700
                  transition-colors
                  duration-150
                  ease-linear
                  border-2 border-gray-200
                  rounded
                  outline-none
                  appearance-none
                  focus:border-primary-600
                "
                type="password"
                placeholder="Current Password"
              />
              <input
                v-model="user.password"
                class="
                  w-full
                  h-12
                  px-3
                  text-gray-700
                  transition-colors
                  duration-150
                  ease-linear
                  border-2 border-gray-200
                  rounded
                  outline-none
                  appearance-none
                  focus:border-primary-600
                "
                type="password"
                placeholder="New Password"
              />
              <input
                v-model="user.password_confirmation"
                class="
                  w-full
                  h-12
                  px-3
                  text-gray-700
                  transition-colors
                  duration-150
                  ease-linear
                  border-2 border-gray-200
                  rounded
                  outline-none
                  appearance-none
                  focus:border-primary-600
                "
                type="password"
                placeholder="Confirm New Password"
              />
            </div>
          </div>
          <div>
            <button
              class="
                block
                w-full
                py-3
                mt-4
                font-bold
                tracking-widest
                text-white
                uppercase
                rounded
                shadow-sm
                cursor-pointer
                bg-primary-600
                focus:outline-none
                focus:shadow-outline-red
              "
              type="submit"
              :disabled="isLoading"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      user: {
        email: this.$auth.user.email,
        first_name: this.$auth.user.first_name,
        last_name: this.$auth.user.last_name,
        current_password: '',
        password: '',
        password_confirmation: '',
      },
      isLoading: false,
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'user/updateProfile',
    }),
    async doUpdateProfile() {
      this.isLoading = true
      try {
        await this.updateProfile(this.user)
        this.closePanel()
      } catch (e) {
        alert(e)
      } finally {
        this.isLoading = false
      }
    },
    closePanel() {
      this.$emit('close')
    },
  },
}
</script>
