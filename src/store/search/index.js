import {reqGetSearchInfo} from '@/api/index'

// search小仓库
const state = {
    searchList:{}
}
const actions = {
     // 获取搜索页数据
     async getSearchList({commit},params={}){
        //  reqGetSearchInfo调用时至少传递一个空对象
        let result = await reqGetSearchInfo(params);
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
// 计算属性，在项目当中，为了简化数据而生
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}