<template>
  <div class="fixed top-0 left-0 w-screen h-screen bg-gray-200">
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
}
</script>
