<template>
  <div class="flex flex-col items-center w-full px-4 mt-24">
    <KnotLogo
      class="inline-block w-auto h-12 mt-2 fill-current text-primary-600"
    />
    <form
      class="flex flex-col items-center w-full mt-10"
      @submit.prevent="registerAndLogin(user)"
    >
      <div
        v-if="error"
        class="flex items-start w-full mb-4 text-sm text-primary-600"
      >
        <ExclamationCircleIcon class="w-5 h-5 mt-px" />
        <span class="ml-2">{{ error }}</span>
      </div>

      <input
        v-model="user.first_name"
        class="w-full h-12 px-3 mb-4 text-gray-700 transition-colors duration-150 ease-linear border-2 border-gray-200 rounded outline-none appearance-none focus:border-primary-600"
        type="text"
        placeholder="First Name"
      />
      <input
        v-model="user.last_name"
        class="w-full h-12 px-3 mb-4 text-gray-700 transition-colors duration-150 ease-linear border-2 border-gray-200 rounded outline-none appearance-none focus:border-primary-600"
        type="text"
        placeholder="Last Name"
      />
      <input
        v-model="user.email"
        class="w-full h-12 px-3 mb-4 text-gray-700 transition-colors duration-150 ease-linear border-2 border-gray-200 rounded outline-none appearance-none focus:border-primary-600"
        type="email"
        placeholder="Your Email"
      />
      <input
        v-model="user.password"
        class="w-full h-12 px-3 mb-4 text-gray-700 transition-colors duration-150 ease-linear border-2 border-gray-200 rounded outline-none appearance-none focus:border-primary-600"
        type="password"
        placeholder="Enter a password"
      />
      <input
        v-model="user.password_confirmation"
        class="w-full h-12 px-3 mb-4 text-gray-700 transition-colors duration-150 ease-linear border-2 border-gray-200 rounded outline-none appearance-none focus:border-primary-600"
        type="password"
        placeholder="Confirm your password"
      />
      <button
        class="block w-full py-3 mt-2 font-bold tracking-widest text-white uppercase rounded shadow-sm cursor-pointer bg-primary-600 focus:outline-none focus:shadow-outline-red"
        type="submit"
        :disabled="loading"
      >
        Sign Up
      </button>
    </form>
    <nuxt-link
      to="/login"
      class="block w-full mt-4 font-medium text-center text-primary-600"
    >
      Have an account? Sign In
    </nuxt-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import KnotLogo from '~/assets/images/logo.svg?inline'
import ExclamationCircleIcon from '~/assets/images/icons/exclamation-circle.svg?inline'
export default {
  middleware: 'auth',
  auth: 'guest',
  layout: 'auth',
  components: {
    KnotLogo,
    ExclamationCircleIcon,
  },
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      loading: false,
      error: null,
    }
  },
  methods: {
    ...mapActions('user', ['register', 'login']),
    async registerAndLogin() {
      this.error = null
      this.loading = true
      try {
        const { email, password } = this.user

        await this.register(this.user)
        await this.login({ email, password })
        this.$router.push('/')
      } catch (e) {
        this.error = Object.entries(e.errors)[0][1][0]
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
