import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.less'
import './assets/font/iconfont.css'
require('./Mock')
import {parseTime} from './utils'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(mavonEditor)
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false
Vue.filter('parseTime', (v) => parseTime(v,'{y}-{m}-{d}'))
import dispatchEventStroage from '@/utils/tools'
Vue.use(dispatchEventStroage)
// 为了解决setItemEvent不立即生效，使用事件派发强制更高

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
