<template>
  <div>
    <form
      class="flex flex-col items-center w-full max-w-sm px-4"
      @submit.prevent="register(user)"
    >
      <input
        v-model="user.first_name"
        class="input"
        type="text"
        placeholder="First Name"
      />
      <input
        v-model="user.last_name"
        class="input"
        type="text"
        placeholder="Last Name"
      />
      <input
        v-model="user.email"
        class="input"
        type="email"
        placeholder="Your Email"
      />
      <input
        v-model="user.password"
        class="input"
        type="password"
        placeholder="Enter a password"
      />
      <input
        v-model="user.password_confirmation"
        class="input"
        type="password"
        placeholder="Confirm your password"
      />
      <button
        class="block w-full h-12 mt-6 font-bold tracking-widest text-red-600 uppercase bg-white rounded shadow-md cursor-pointer"
        type="submit"
      >
        Sign Up
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
      user: {
        first_name: 'Collin',
        last_name: 'Henderson',
        email: 'collin@syropia.net',
        password: 'password123',
        password_confirmation: 'password123'
      }
    }
  },
  methods: {
    ...mapActions('user', ['register', 'login']),
    async registerAndLogin() {
      await this.register(this.user)
      const { email, password } = this.user
      await this.login({ email, password })
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
