<template>
  <textarea
    :style="`min-height:${minHeight}px;max-height:${maxHeight}px;`"
    @input="resize"
  ></textarea>
</template>

<script>
export default {
  props: {
    minHeight: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 9999
    }
  },
  mounted() {
    this.resize()
  },
  methods: {
    resize() {
      this.$el.style.height = 'auto'
      this.$el.style.height = `${this.$el.scrollHeight}px`
      this.$emit('input', this.$el.value)
    }
  }
}
</script>
