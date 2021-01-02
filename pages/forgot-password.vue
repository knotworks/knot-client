<template>
  <div class="flex flex-col items-center w-full px-4 mt-24">
    <KnotLogo
      class="inline-block w-auto h-12 mt-2 fill-current text-primary-600"
    />
    <form
      class="flex flex-col items-center w-full mt-10 space-y-4"
      @submit.prevent="doRequestPasswordReset()"
    >
      <div v-if="success" class="flex items-start w-full text-sm">
        <CheckCircleIcon class="flex-shrink-0 w-5 h-5 mt-px text-green-500" />
        <span class="ml-2 text-gray-600">{{ success }}</span>
      </div>

      <div
        v-if="error"
        class="flex items-start w-full text-sm text-primary-600"
      >
        <ExclamationCircleIcon class="flex-shrink-0 w-5 h-5 mt-px" />
        <span class="ml-2">{{ error }}</span>
      </div>

      <input
        v-model="email"
        class="w-full h-12 px-3 text-gray-700 transition-colors duration-150 ease-linear border-2 border-gray-200 rounded outline-none appearance-none focus:border-primary-600"
        type="email"
        placeholder="Your Email"
      />
      <button
        class="block w-full py-3 font-bold tracking-widest text-white uppercase rounded shadow-sm cursor-pointer bg-primary-600 focus:outline-none focus:shadow-outline-red"
        type="submit"
        :disabled="loading || !email.trim()"
      >
        Send Reset Instructions
      </button>
    </form>
    <nuxt-link
      to="/login"
      class="block w-full mt-4 font-medium text-center text-primary-600"
    >
      Remember your password? Sign in
    </nuxt-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import KnotLogo from '~/assets/images/logo.svg?inline'
import CheckCircleIcon from '~/assets/images/icons/check-circle.svg?inline'
import ExclamationCircleIcon from '~/assets/images/icons/exclamation-circle.svg?inline'
export default {
  middleware: 'auth',
  auth: 'guest',
  layout: 'auth',
  components: {
    KnotLogo,
    CheckCircleIcon,
    ExclamationCircleIcon,
  },
  data() {
    return {
      email: this.$route.query.email || '',
      loading: false,
      success: null,
      error: null,
    }
  },
  methods: {
    ...mapActions('user', ['requestPasswordReset']),
    async doRequestPasswordReset() {
      this.success = null
      this.error = null
      this.loading = true
      try {
        await this.requestPasswordReset({ email: this.email })
        this.success =
          'Instructions to reset your password have been sent to the email you entered below.'
      } catch (e) {
        if (e.response?.data?.errors?.email) {
          this.error =
            'Sorry we could not send a password reset request for that email address.'
        } else {
          this.error =
            'Something went wrong and we could not process your password reset request. Please try again.'
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
