// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from './routes'
// 引入store
import store from '@/store'


// 先将VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;


// 重写push/replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递那些参数）
// 第二个参数：成功回调
// 第三个参数：失败的回调
// call||apply区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点： call与apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组

VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
// 暴露路由

let router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior() {
        // 始终滚动到顶部
        return { y: 0 }
      },
})

// 全局路由守卫，前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to,from,next)=>{
    // to:可以获取到你要跳转到哪个路由信息
    // from : 可以获取到你从哪个路由而来的信息
    // next:放行函数 next()  放行 next(path) 放行到指定路由 next(false)
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name
    if(token){
        if(to.path == '/login' || to.path == '/register'){
            next('/home');
        }else{
            // 登录，去的不是【home|search|detail|shopcart】
            // 如果用户名已有
            if(name){
                next()
            }else{
                // 没有用户信息，派发action让仓库存储用户信息在跳转
                try{
                    await store.dispatch('getUserInfo')
                    next()
                }catch(error){
                    // token失败了获取不到用户信息，从新登录
                    // 清除token
                    await store.dispatch('loginOut');
                    next('/login')
                }
            }
        }
    }else{
        // 未登录，不能去交易相关页面，支付相关页面pay|paysuccess，不能去个人中心
        // 未登录去--登录页面
        // 其他页面放行
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            // 把登录
            next('/login?redirect='+toPath);
        }else{
            next();
        }
    }
})







export default router;