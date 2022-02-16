// 登录注册的模块
import {reqGetCode,reqUserRegister,reqUserLogin, reqGetUserInfo,reqLoginOut } from '@/api/index'
import {setToken,getToken,removeToken} from "@/util/token"
const state = {
    code:'',
    token:getToken(),
    userInfo:{},

}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        console.log(result);
        if(result.code){
            commit('GETCODE',result.data)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        console.log(result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户登录
    async userLogin({commit},user){
        let result = await reqUserLogin(user);
        // 服务器下发token;用户唯一标识符（uuid）
        // 将来经常通过代token找服务器要用户信息进行展示
        if(result.code==200){
            commit('USERLOGIN',result.data.token);
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result =  await reqGetUserInfo();
        if(result.code==200){
            commit("GETUSERINFO",result.data);
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async loginOut({commit}){
        let result = await reqLoginOut();
        if(result.code){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

}
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.token = removeToken();
        state.userInfo = {}
    },

}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters,
}