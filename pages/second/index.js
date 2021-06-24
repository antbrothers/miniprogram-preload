// var p = require('../../lib/BasePage')
// p('second',{
//   data: {},
//   // 预加载数据
//   $onPreload(query) {
//     console.log('开始预加载 第二个页面的数据, 时间', new Date().getTime(), 'background: yellow')
//     console.log('第二页 实例', this, "background: green")
//     // 执行预加载请求数据
//     this.$put('init-data', this.initData(), query)
//   },
//   // 请求数据
//   initData(query, resolve, reject) {
//     // setTimeout(() => {
//     //   if (typeof query.count === "string") {
//     //     query.count = parseInt(query.count);
//     //   }
//     //   this.data.arr.splice(0, this.data.arr.length);
//     //   for (let i = 0; i < query.count; i++) {
//     //     this.data.arr.push({ id: i, name: `第${i}个`, age: parseInt(Math.random() * 20 + i) })
//     //   }
//     //   this.$setData(this.data);
//     //   this.$resolve(this.data);       //或者 resolve(this.data);
//     // }, 300);
//   },

//   onLoad(options) {
//     // console.log('-------此时刚刚执行第二个页面的onLoad方法--------', options);
//     // console.log('第二个页面加载初', Date.now() - app.globalData.timestamp);
//     // const lightningData = this.$take('init-data');
//     // if (lightningData) {
//     //   lightningData.then((data) => {
//     //     this.$setData(data);
//     //   });
//     //   return;
//     // }
//     this.initData(options);
//   }
// })

import BasePage from "../../lib/CommonPage"
var app = getApp()
class Index extends BasePage {
  constructor(...args) {
    super(...args)
    super.$init({
      arr: []
    });
  }
  // 预加载数据
  $onPreload(query) {
    
    console.log('开始预加载', new Date().getTime() - app.globalData.timestamp)
    // 执行预加载函数
    this.$put('init-data', this.initData.bind(this), Object.assign({}, query, {preData: true}))
  }
  // 请求数据
  initData(query, resolve, reject) {
    console.log(query)
    this.$setData(this.data);
    this.$resolve(this.data);
    console.log('预加载结束', new Date().getTime() - app.globalData.timestamp)
  }
  
  onLoad = (options) => {
    console.log('onLoad: 开始第二个页面onLoad事件', Date.now() - app.globalData.timestamp)
    console.log('onLoad: 事件的option 参数', options)
    // 取出已经缓存过的异步数据
    const lightningData = this.$take('init-data');
    if (lightningData) {
      lightningData.then((data) => {
        console.log('打印出预加载的数据 $take', data)
      })
      return
    }
    // 如果预加载数据失败, 再次请求数据
    this.initData(Object.assign({}, options, {preData: false}))    
  }
  onReady = () => {
    console.log('onReady: 第二个页面渲染完', Date.now() - app.globalData.timestamp);
  }  
}
Page(new Index({ className: 'second' }));