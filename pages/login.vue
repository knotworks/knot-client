<template>
  <div class="flex flex-col items-center w-full px-4 mt-24">
    <a href="/">
      <KnotLogo
        class="inline-block w-auto h-12 mt-2 fill-current text-primary-600"
      />
    </a>
    <form
      class="flex flex-col items-center w-full mt-10 space-y-4"
      @submit.prevent="doLogin()"
    >
      <div v-if="error" class="flex items-start w-full text-sm text-red-600">
        <ExclamationCircleIcon class="w-5 h-5 mt-px" />
        <span class="ml-2">{{ error }}</span>
      </div>

      <input
        v-model="credentials.email"
        class="w-full h-12 px-3 text-gray-700 transition-colors duration-150 ease-linear border-2 border-gray-200 rounded outline-none appearance-none focus:border-primary-600"
        type="email"
        placeholder="Your Email"
      />
      <input
        v-model="credentials.password"
        class="w-full h-12 px-3 text-gray-700 transition-colors duration-150 ease-linear border-2 border-gray-200 rounded outline-none appearance-none focus:border-primary-600"
        type="password"
        placeholder="Enter a password"
      />
      <div class="flex w-full">
        <nuxt-link
          :to="`/forgot-password?email=${credentials.email}`"
          class="ml-auto font-medium text-red-600"
        >
          I forgot my password
        </nuxt-link>
      </div>

      <button
        class="block w-full py-3 font-bold tracking-widest text-white uppercase bg-red-600 rounded shadow-sm cursor-pointer focus:outline-none focus:shadow-outline-red"
        type="submit"
        :disabled="loading"
      >
        Sign In
      </button>
    </form>
    <nuxt-link
      to="/register"
      class="block w-full mt-4 font-medium text-center text-red-600"
    >
      No account? Sign Up
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
      credentials: {
        email: '',
        password: '',
      },
      loading: false,
      error: null,
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async doLogin() {
      this.error = null
      this.loading = true
      try {
        await this.login(this.credentials)
        this.$router.push('/')
      } catch (e) {
        if (e.response.data.error === 'Invalid Credentials') {
          this.error = 'Incorrect email or password.'
        } else {
          this.error =
            'Something went wrong and we could not log you in. Please try again.'
        }
        this.credentials.password = ''
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
