import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    modules: ['user', 'posts', 'location'],
  }).plugin(store)
}
