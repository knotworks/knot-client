<template>
  <div class="flex flex-wrap px-4 py-3">
    <div
      v-for="(media, i) in files"
      :key="i"
      class="relative flex items-center justify-center w-16 h-16 mr-4 text-4xl text-gray-700 bg-gray-300 border border-gray-400 rounded-sm cursor-pointer"
    >
      <img src="~/assets/images/icons/add-dark.svg" class="h-4" />
      <img
        v-if="media.preview"
        :src="media.preview"
        class="absolute top-0 left-0 object-cover w-full h-full"
      />
      <input
        ref="file"
        type="file"
        accept="image/*"
        class="absolute top-0 left-0 w-full h-full opacity-0"
        @change="setFile(i, $event)"
      />
      <button
        v-show="media.file"
        class="absolute top-0 right-0 w-6 h-6 -mt-2 -mr-3 text-sm text-white bg-red-500 rounded-full focus-none"
        type="button"
        @click="removeFile(i)"
      >
        <span class="inline-block w-full h-full font-bold">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [
        {
          file: null,
          preview: ''
        }
      ]
    }
  },
  methods: {
    setFile(i, e) {
      if (e.target.files.length) {
        const wasPopulated = !!this.files[i].preview
        this.files[i].file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (ev) => {
          this.files[i].preview = ev.target.result
        }
        reader.readAsDataURL(e.target.files[0])
        if (!wasPopulated && this.files.length < 5) {
          this.files.push({ file: null, preview: '' })
        }
        this.$emit('change', this.files)
      }
    },
    removeFile(i) {
      this.files.splice(i, 1)
      this.$emit('change', this.files)
    }
  }
}
</script>

<style></style>
