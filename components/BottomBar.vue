<template>
  <div class="px-2 py-2 bg-gray-200 border-t border-gray-400 bottom-bar">
    <nuxt-link
      to="/new-post"
      class="flex items-center justify-center block w-8 h-8 text-xl leading-none text-center text-white no-underline transition-transform duration-500 ease-in-out bg-red-600 rounded-full cursor-pointer btn-add-post"
    >
      <img src="~/assets/images/icons/add.svg" />
    </nuxt-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.bottom-bar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.btn-add-post {
  grid-column: 3;
  justify-self: center;

  &:focus {
    outline: none;
  }

  &--active {
    transform: rotate(315deg);
  }
}
</style>
