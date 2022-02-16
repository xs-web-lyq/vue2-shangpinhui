import { reqAddressInfo,reqOrderInfo } from "@/api";

const state = {
    addressInfo:[],
    orderInfo:{}
}
const actions = {
        // 获取用户地址信息
        async getAddressInfo({commit}){
            let result = await  reqAddressInfo()
            if(result.code ==200){
                commit('GETADDRESSINFO',result.data)
            }
        },
        // 获取订单信息
        async getOrderInfo({commit}){
            let result = await reqOrderInfo();
            if(result.code == 200 ){
                commit('GETORDERINFO',result.data)
            }
        },
}
const mutations = {
    GETADDRESSINFO(state,addressInfo){
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters,
}