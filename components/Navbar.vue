<template>
  <div
    class="relative flex items-center justify-center px-4 text-center text-white bg-red-600 navbar"
  >
    <div class="text-sm leading-none cursor-pointer left-buttons">
      <slot name="left-buttons" />
    </div>
    <h3 class="text-base font-medium leading-none">
      <slot name="title" />
    </h3>
    <div class="text-sm leading-none cursor-pointer right-buttons">
      <slot name="right-buttons" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss">
.navbar {
  height: 44px;
  height: calc(44px + constant(safe-area-inset-top));
  height: calc(44px + env(safe-area-inset-top));

  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);

  z-index: 99;
  .left-buttons {
    position: absolute;
    top: 15px;
    top: calc(15px + constant(safe-area-inset-top));
    top: calc(15px + env(safe-area-inset-top));

    left: 20px;
  }
  .right-buttons {
    position: absolute;
    top: 15px;
    top: calc(15px + constant(safe-area-inset-top));
    top: calc(15px + env(safe-area-inset-top));

    right: 20px;
  }
}
</style>
