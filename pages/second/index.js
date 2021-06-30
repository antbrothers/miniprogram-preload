import BasePage from "../../lib/CommonPage"
import {getAdsContent} from '../../utils/api'
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
    var result =  this.getAdsContentAll(46, query)
    // this.$setData(this.data);
    console.log(result)
    // this.$resolve(result);
    console.log('预加载结束' + query.preData, new Date().getTime() - app.globalData.timestamp)
  }
  
  onLoad = (options) => {
    console.log('onLoad: 开始第二个页面onLoad事件', Date.now() - app.globalData.timestamp)
    console.log('onLoad: 事件的option 参数', options)
    // 取出已经缓存过的异步数据
    const lightningData = this.$take('init-data');
     // 如果预加载数据失败, 再次请求数据
     this.initData(Object.assign({}, options, {preData: false}))  
    if (lightningData) {
      lightningData.then((data) => {
        console.log('打印出预加载的数据 $take', data)
        console.log('打印出预加载的数据 time', Date.now() - app.globalData.timestamp)
      })
      return
    }
     
  }
  onReady = () => {
    console.log('onReady: 第二个页面渲染完', Date.now() - app.globalData.timestamp);
  }
  getAdsContentAll(id, query){// 获取页面广告内容      
    getAdsContent(id).then((res)=>{   
      console.log('请求响应返回', query.preData, Date.now() - app.globalData.timestamp)
      this.$resolve(res);
    }).catch(()=>{
    })
  }
}
Page(new Index({ className: 'second' }));