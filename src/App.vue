<template>
  <div id="app">
    <Header />

    <!-- 路由组件展示区 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{Header,Footer},
  // 用于优化项目，以为app组件只执行一次，所有可以在此发送在home/search都要发送的请求
  // 
  mounted(){
        this.$store.dispatch("categoryList");
  }

}
</script>

<style>

</style>
