// 对axios进行二次封装,使用请求拦截器，和响应拦截器
import axios from 'axios'
// 引入nprogress
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css";
// 引入store
import store from '@/store'

// 1.利用axios对象的方法create，去创建
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求时，路径当中会出现api
    baseURL:"/api",
    // 代表请求超时的时间
    timeout:5000,
})

// 请求拦截器，在发送请求之前，请求拦截器都可以检测到，可以在请求发送出去之前做一些事情

requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段，要和后端商量好
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    // 进度条开始动
    nprogress.start();
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数，服务器响应数据回来后，拦截器就可以检测到，可以做一些事情
    // 进度条结束
    nprogress.done()
    return res.data
},()=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('false'))
})

// 对外暴露
export default requests