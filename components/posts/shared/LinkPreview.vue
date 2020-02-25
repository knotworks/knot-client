<template>
  <div>
    <slot
      v-if="res"
      :title="res.title"
      :description="res.description"
      :image="res.image"
    />
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data: () => ({
    res: null
  }),
  async mounted() {
    const cached = this.$warehouse.get(this.url)
    if (cached) {
      this.res = cached
    } else {
      const expiration = new Date().getTime() + 5 * 24 * 60 * 60 * 1000
      this.res = await this.$client
        .withoutAuth()
        .post('https://linkpreview.butts.workers.dev', { url: this.url })

      this.$warehouse.set(this.url, this.res, expiration)
    }
  }
}
</script>
