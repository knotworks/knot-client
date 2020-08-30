<template>
  <div>
    <div ref="carousel" class="overflow-hidden">
      <div class="flex">
        <slot />
      </div>
    </div>
    <div v-if="carousel">
      <ul class="flex justify-center w-full py-2 space-x-2">
        <li
          v-for="(__, index) in carousel.slideNodes()"
          :key="index"
          class="w-2 h-2 transition-colors duration-300 ease-in-out bg-gray-300 rounded-full"
          :class="{
            'bg-gray-500': currentSlide === index,
          }"
          @click="carousel.scrollTo(index)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import EmblaCarousel from 'embla-carousel'
export default {
  data() {
    return {
      carousel: null,
      currentSlide: 0,
    }
  },
  mounted() {
    this.carousel = EmblaCarousel(this.$refs.carousel)
    this.carousel.on('select', this.setCurrentSlide)
  },
  beforeDestroy() {
    this.carousel.off('select', this.setCurrentSlide)
    this.carousel.destroy()
  },
  methods: {
    setCurrentSlide() {
      this.currentSlide = this.carousel.selectedScrollSnap()
    },
  },
}
</script>

<style></style>
