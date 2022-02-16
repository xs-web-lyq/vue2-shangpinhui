<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.key" :list="floor"/>
    <Brand />
  </div>

</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Brand from './Brand'
import Floor from './Floor'
import {mapState} from 'vuex'
export default {
    name:'Home',
    components:{ListContainer,Recommend,Rank,Like,Brand,Floor},
    mounted(){
        this.$store.dispatch('getFloorList')
        // 获取用户信息
        this.$store.dispatch('getUserInfo')
    },
    computed:{
        ...mapState({
          floorList:(state) => state.home.floorList,
        })

    }
}
</script>

<style>

</style>