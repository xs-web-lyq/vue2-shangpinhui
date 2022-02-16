import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api/index'

// home小仓库
const state = {
    // 在设置数据初始化时，要根据实际数据的类型一定要保持一直与服务器返回值一致
    categoryList:[],
    bannerList:[],
    floorList:[],

};
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code ==200){
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code ==200){
            commit('GETBANNERLIST',result.data)
        }
    },
    // 获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            commit('GETFLOORLIST',result.data)
        }
    },
   
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList.slice(0,16)
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    },
  
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}