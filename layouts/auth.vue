<template>
  <div class="flex justify-center w-screen h-screen bg-white">
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'guest',
}
</script>
