<template>
  <div class="spec-preview">
    <img :src="imgUrl.imgUrl" />
    <!-- 鼠标滑动的舞台，用于获得鼠标再图片上距离图片边框的距离 -->
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <!-- ref = "big" 用于获取放大后元素进而改变其left top 值 -->
      <img :src="imgUrl.imgUrl" ref = "big"/>
    </div>
    <!-- 遮罩层 ref="mask" 用于获取遮罩层元素，用来调节遮罩层的位置-->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data(){
      return {
        currentIndex:0
      }
    },
    props:['skuImageList'],
    computed:{
      imgUrl(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    mounted(){
      this.$bus.$on('getIndex',(index)=>{
        this.currentIndex = index;
      })
    },
    methods:{
      handler(event){
        // 获取元素节点
        let mask = this.$refs.mask;
        let big = this.$refs.big;
        // 改变遮罩层的left top 
        let left = event.offsetX - mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2;
        // 约束遮罩层边界问题
        if(left<=0){left = 0}
        if(left>=mask.offsetWidth) left = mask.offsetWidth;
        if(top <= 0) top = 0;
        if(top >= mask.offsetHeight) top = mask.offsetHeight
        mask.style.left = left + 'px';
        mask.style.top = top + 'px';
        // 改变放大镜里的图片位置
        big.style.left = - 2 * left + 'px';
        big.style.top = - 2 * top + 'px';
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>