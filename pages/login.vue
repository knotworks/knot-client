<template>
  <div>
    <form
      class="flex flex-col items-center w-full max-w-sm px-4"
      @submit.prevent="doLogin()"
    >
      <input
        v-model="credentials.email"
        class="input"
        type="email"
        placeholder="Your Email"
      />
      <input
        v-model="credentials.password"
        class="input"
        type="password"
        placeholder="Enter a password"
      />
      <button
        class="block w-full h-12 mt-6 font-bold tracking-widest text-red-600 uppercase bg-white rounded shadow-md cursor-pointer"
        type="submit"
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  middleware: 'auth',
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      credentials: {
        email: 'collin@syropia.net',
        password: 'password123'
      }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async doLogin() {
      await this.login(this.credentials)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  @apply w-full rounded mb-4 h-12 px-3 border border-red-700 text-gray-800;

  box-shadow: 0 1px 0 0 rgba(#fff, 0.2);
}
</style>
