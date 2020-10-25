import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import iView from 'iview' // 引入iview库
import 'iview/dist/styles/iview.css' // 使用css

Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
