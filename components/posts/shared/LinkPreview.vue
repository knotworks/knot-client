<template>
  <div>
    <slot
      :title="res.title"
      :description="res.description"
      :image="res.image"
      :isLoading="isLoading"
      :hasError="hasError"
    />
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    res: {
      title: '',
      description: '',
      image: '',
    },
    isLoading: true,
    hasError: false,
  }),
  async mounted() {
    const cached = this.$warehouse.get(this.url)
    if (cached) {
      this.res = cached
      this.isLoading = false
    } else {
      try {
        const expiration = new Date().getTime() + 5 * 24 * 60 * 60 * 1000
        this.res = await this.$client.post(
          'https://linkpreview.butts.workers.dev',
          { url: this.url }
        )

        this.$warehouse.set(this.url, this.res, expiration)
      } catch (e) {
        this.hasError = true
      } finally {
        this.isLoading = false
      }
    }
  },
}
</script>
