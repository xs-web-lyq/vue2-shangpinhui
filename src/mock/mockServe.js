// 引入mockjs模块
import Mock from 'mockjs';

// 把JSON数据格式引入尽量【JSON数据格式化根本没有暴露，但是可以直接引入】
// webpack默认对外暴露的：图片，JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

// mock数据：第一个参数请求地址，第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})