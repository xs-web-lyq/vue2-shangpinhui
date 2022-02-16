import Vue from 'vue'
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex);
// state:仓库存储数据的地方
// const state = {};
// // actions:处理action,可以书写自己的业务逻辑，可以处理异步操作
// const actions = {};
// // mutations:修改state中的数据的唯一手段
// const mutations = {}
// // getters : 可以理解为计算属性，用于简化仓库的数据，让组件获取仓库的数据更加方便
// const getters = {}


import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade';

// 对外暴露Store类的一个实例
export default new Vuex.Store({
    modules : {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})
