import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import echarts from 'echarts'

import '@/assets/ali_icons/iconfont.css'
import '@/assets/ali_svg/iconfont.js'
Vue.prototype.$echarts = echarts

import { baseUrl } from './const'
Vue.prototype.$baseUrl = baseUrl

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

import pdf from 'vue-pdf'
Vue.use(pdf)

import Print from 'vue-print-nb'
Vue.use(Print);


Vue.config.productionTip = false

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Date.prototype.format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
  return fmt;
};
export default vm;
