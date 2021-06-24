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