<template>
  <div class="p-5 text-sm leading-normal text-gray-800">
    <span class="break-words post-body" v-html="body" />
    <ul v-if="links" class="mt-4 list-reset">
      <li
        v-for="(link, i) in links"
        :key="i"
        class="px-3 py-2 mb-2 bg-gray-100 border border-gray-300 rounded-sm"
      >
        <a :href="link.url" target="_blank" class="text-gray-700 no-underline">
          <LinkPreview
            v-slot="{ title, description, image, isLoading, hasError }"
            :url="link.url"
          >
            <div v-if="!isLoading && !hasError" class="flex">
              <img
                v-if="image"
                :src="image"
                :alt="title"
                class="object-cover w-12 h-12 mr-4 rounded lazyload"
              />
              <div class="overflow-hidden">
                <h3 class="text-sm truncate">{{ title }}</h3>
                <p
                  v-if="description"
                  class="mt-1 text-xs text-gray-400 truncate"
                >
                  {{ description }}
                </p>
              </div>
            </div>
            <div v-if="isLoading" class="text-gray-400">Loading...</div>
            <div v-if="!isLoading && hasError" class="text-gray-400">
              Could not fetch link details.
            </div>
          </LinkPreview>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it'
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    postTextWithMeta() {
      let text = this.post.body || ''
      const people = this.post.accompaniments
      if (this.post.body && (this.post.location || people.length)) {
        text += ' **—**'
      }
      if (people.length) {
        text += ' with '
        people.forEach((person, i) => {
          text += `**${person.user.first_name}**`
          if (people.length > 2 && i < people.length - 2) {
            text += ', '
          } else if (people.length >= 2 && i === people.length - 2) {
            text += ' and '
          }
        })
      }
      if (this.post.location) {
        text += ` at **${this.post.location.name}**`
      }
      return text
    },
    body() {
      if (this.md) {
        return this.md.render(this.postTextWithMeta.trim())
      } else {
        return ''
      }
    },
    links() {
      if (this.md && this.post.body) {
        return this.md.linkify.match(this.post.body)
      } else {
        return null
      }
    },
  },
  created() {
    this.md = new MarkdownIt({
      linkify: true,
      typographer: true,
    })
    const defaultRender =
      this.md.renderer.rules.link_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
      }
    this.md.renderer.rules.link_open = function (
      tokens,
      idx,
      options,
      env,
      self
    ) {
      tokens[idx].attrPush(['target', '_blank'])
      tokens[idx].attrPush(['class', 'text-blue-500'])

      return defaultRender(tokens, idx, options, env, self)
    }
  },
}
</script>
