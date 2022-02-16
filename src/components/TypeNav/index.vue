<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派 -->
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 添加动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 事件委派 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryname="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- 使用声明式导航会出现抖动现象，因为router-link是组件，鼠标移动过快创建DOM元素一瞬间可能达到1000+ -->
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryname="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryname="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入lodash--按需引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，可以向服务器发送请求
  mounted() {
    // 通过Vue发送请求，获取数据，存储于仓库当中
    // eslint-disable-next-line no-undef
    // this.$store.dispatch("categoryList");

    // 当到达search组件时执行
    if (this.$route.path != "/home") {
        this.show = false;
      }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   // index：鼠标移上某个一级分类的元素的索引值
    //   this.currentIndex = index;
    // },
    // throttle回调函数别用箭头函数，可能出现上下文this
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    goSearch(event) {
      // 最好的解决方法：编程式导航 + 事件委派
      // 存在一些问题：事件委派，是把所有的子节点【h3,dt,dl,em】的事件委派给父节点
      // 点击a标签的时候，才会进行路由的跳转【则么能确定点击的一定是a标签】
      // 存在另一个问题：即使你能确定点击的是a标签，如何区分是一级，二级，三级分类的标签

      // 第一个问题：把子节点中a标签通过dataset属性，可以获取节点的自定义属性与属性值
      let element = event.target;
      // 获取当前触发这个事件的节点【h3,a,dt,dl】，需要带有data-categoryname这样的节点【一定是a标签】
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签身上拥有categoryname一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 判断一级分类，二级分类，三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理完参数
        location.query = query;
        // 合并params参数
        location.params = this.$route.params
        // 路由跳转
        this.$router.push(location);
      }
    },
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      this.currentIndex = -1;
      // 当到达search组件时执行
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }
          // h3:hover {
          //     background-color:blue;
          // }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //   &:hover {
          //     .item-list {
          //       display: block;
          //     }
          //   }
        }
        .cur {
          background-color: rgb(47, 97, 189);
        }
      }
    }
    .sort-enter , .sort-leave-to{
      // height: 0px;
      opacity:0;
    }
    .sort-enter-to ,.sort-leave{
      // height: 461px;
      opacity:1
    }
    .sort-enter-active,.sort-leave-active {
      transition: opacity linear 0.5s;
    }
  }
}
</style>