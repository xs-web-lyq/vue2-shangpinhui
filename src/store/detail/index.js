import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
import { getUUID } from "@/util/uuid_token";


const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的解构
        // 加入购物车以后（发请求），前台将参数给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code==200.代表这次操作成功
        // 因为服务器没有返回多余数据，因此我们不需要三连环
        // 注意：async函数执行返回的结果一定是一个promise【要么成功，要么失败】
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const getters = {
    // 路径导航简化数据
    categoryView(state){
        // 初始是goodInfo 为空对象打点调用为undefined,,
        // 当前计算出来的属性至少是一个空对象所以当为undefined时返回空对象
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}