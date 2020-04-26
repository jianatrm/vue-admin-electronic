import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

const store = new Vuex.Store({

  modules: {
    app,
    settings,
    user
  },
  getters,
  plugins: [vuexLocal.plugin]
})

export default store
