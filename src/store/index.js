import Vue from 'vue' // 引入vue
import Vuex from 'vuex' // 引入Vuex
import user from './modules/user' // 引入user module

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user // 使用user.js中的action
  }
})

export default store
