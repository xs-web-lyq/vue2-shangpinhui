import {
    reqCartList,
    reqDeleteCarById,
    reqUpdateCheckedById
} from "@/api"

const state = {
    cartList: [],
}
const actions = {
        // 获取购物车数据列表
        async getShopCart({
            commit
        }) {
            let result = await reqCartList();
            if (result.code == 200) {
                commit('GETSHOPCART', result.data)
            }
        },
        // 删除购物车产品
        async deleteCartListById({
            commit
        }, skuId) {
            let result = await reqDeleteCarById(skuId);
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 修改购物车某一产品选中状态
        async updatedCheckedById({commit}, {skuId,isChecked }) {
            let result = await reqUpdateCheckedById(skuId, isChecked);
            if (result.code == 200) {
                return 'ok'
            } else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 删除所有勾选的商品
        deleteAllCheckedCart({dispatch,getters}){
            // context:小仓库，commit【提交mutations修改state】getters【计算属性】 dispatch【派发action】
            // 获取购物车中全部的商品（是一个数组）
            let PromiseAll = [];
            getters.cartList[0].cartInfoList.forEach(item =>{
                let promise = item.isChecked == 1 ? dispatch('deleteCartListById',item.skuId) : '';
                // 将每一个返回的Promise添加到数组当中
                PromiseAll.push(promise);
            });
            // 只要全部的请求都成功，返回的结果即为成功
            // 如果有一个失败，返回即为失败结果
            return Promise.all(PromiseAll);
        },
        updateAllCartIsChecked({dispatch,state},isChecked){
            let PromiseAll = [];
            
            state.cartList[0].cartInfoList.forEach(item =>{
                let promise = dispatch('updatedCheckedById',{skuId:item.skuId,isChecked});
                PromiseAll.push(promise)
            })
            return Promise.all(PromiseAll)
        }
}
const mutations = {
    GETSHOPCART(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}