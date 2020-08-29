import Vue from 'vue'

export default (_ctx, inject) => {
  const bus = new Vue()
  inject('bus', bus)
}
