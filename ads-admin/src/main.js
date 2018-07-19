import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.filter('formatDate', (val) => {
  var d = new Date(val)
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  return year + '-' + month + '-' + day
})
Vue.filter('formatRole', (val) => {
  if (val == 1) {
    return '管理员'
  } else {
    return '普通用户'
  }
})
Vue.filter('formatGender', (val) => {
  if (val == 1) {
    return '男'
  } else {
    return '女'
  }
})
Vue.filter('formatAdState', (val) => {
  if (val == 1) {
    return '有效'
  } else {
    return '失效'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
