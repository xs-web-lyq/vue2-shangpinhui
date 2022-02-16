import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 三级联动组件---全局组件
import TypeNav from './components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {MessageBox} from 'element-ui'
// 第一个参数，全局组件名。第二个参数：哪个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)


// ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入mockServe.js-----mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import xzpq from '@/assets/1.jpg'
Vue.use(VueLazyload, {
  loading: xzpq,

})
// 统一接口管理
import * as API from '@/api/index'


// 引入表单校验插件
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由，
  // 注册路由信息，当这里书写router的时候，组件身上都拥有$router,$router属性
  router,
  // 配置仓库:组件实例身上会多一个$store属性
  store

}).$mount('#app')
