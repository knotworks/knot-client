<template>
  <textarea
    class="flex-grow overflow-hidden border-0 outline-none resize-none"
    :style="`min-height:${minHeight}px;max-height:${maxHeight}px;`"
    :value="value"
    @input="resize"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    minHeight: {
      type: Number,
      default: 0,
    },
    maxHeight: {
      type: Number,
      default: 9999,
    },
  },
  mounted() {
    this.resize()
  },
  methods: {
    resize() {
      this.$el.style.height = `${this.minHeight}px`
      this.$el.style.height = `${this.$el.scrollHeight}px`
      this.$emit('input', this.$el.value)
    },
  },
}
</script>
