<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="caroucal in list" :key="caroucal.id">
        <img :src="caroucal.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
  watch: {
    //  监听bannerList数据的变化，因为这条数据发生变化---由空数组变为数组里面有元素
    bannerList: {
      immediate: true,
      handler() {
        // 现在咱们通过watch监听bannerList属性的属性值的变化
        // 如果执行handler方法，代表组件实例身上这个属性的属性以已经有了【数组：四个元素】
        // 当前这个函数执行：只能保证bannerList 数据已经有了，但是你没办法保证v-for已经执行结束了
        // v-for执行完毕，才有结构【你现在在watch当中没办法保证的】
        // nextTick：在下次DOM更新 循环结束之后，执行延迟回调，在修改数据之后，立即使用这个方法，获取更新后的DOM
        this.$nextTick(() => {
          // 在new Swiper之前，页面中的结果必须已经写好
          // 第一个参数可以是字符串也可以是真实的DOM节点
          //  var mySwiper =  new Swiper(".swiper-container", {
          new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>