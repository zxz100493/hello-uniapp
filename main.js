
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// import '~@/common/iconfont.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
// import '@/common/js/bootstrap.min.js';

export function createApp() {
  const app = createSSRApp(App)
  // app.provide("bootstrap",bootstrap);
  return {
    app
  }
}
// #endif