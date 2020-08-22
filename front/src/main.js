import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//公用css
import '@/assets/css/reset.css'
import '@/assets/css/global.css'

//element
import ElementUI from 'element-ui'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
