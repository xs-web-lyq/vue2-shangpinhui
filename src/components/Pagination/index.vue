<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="pageNo>3" @click="$emit('getPageNo',1)">1</button>
    <button v-if="pageNo>4">···</button>

    <button v-for="(page , index) in startPageAndEndPage.end" :key="index" v-if="page>=startPageAndEndPage.start" @click="$emit('getPageNo',page)" :class="{active:pageNo == page}">{{page}}</button>

    
    <button v-if="startPageAndEndPage.end<totalPage-1">···</button>
    <button v-if="startPageAndEndPage.end<totalPage" @click="$emit('getPageNo',totalPage)" >{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>

</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','continues','total'],
  computed:{
    totalPage(){
      return Math.ceil(this.total / this.pageSize)
    },
    // eslint-disable-next-line vue/return-in-computed-property
    startPageAndEndPage(){
      const {continues,pageNo,totalPage} = this;
      // 先定义两个变量存储起始数字与结束数字
      let start = 0;
      let  end = 0;
      // 连续页码数5【就是至少5页】，如果出现不正常的现象【就是不到5页】
      // 不正常现象【总页数没有连续页码多】
      if(continues > totalPage){
        start = 1;
        end = totalPage;
      } else{
        // 正常现象【连续页码5，但是你的总页码一定是大于5的】
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 纠正如果当前页为1，2时start错误
        if(start<1){
          start = 1;
          end = continues;
        }
        // 纠正如果当前页为最后两页时 end错误
        if(end>totalPage){
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return {start , end }
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }

}
.active{
  background-color:#409eff
}
</style>
