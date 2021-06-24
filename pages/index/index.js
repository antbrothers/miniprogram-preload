import BasePage from '../../lib/CommonPage'

class Index extends BasePage {
  constructor(...args) {
    super(...args)
    this.data = {
      testStr: 'this is test'
    }
  }
  onReady = () => {
    console.log('onReady 调用')
  }
  onLoaded =() => {
    console.log('扩展 onLoaded 函数')
  }
  onLoad = (options) => {
    console.log('index 页面 onload 事件执行', options)
    // this.$route({path: '../second/index', query: {count: 10, title: '这是第二个页面'}, className: 'second'});
  }

  jumpSecondPage = function() {    
    console.log('------ 点击跳转第二页的事件 ------')
    this.$route({path: '../second/index', query: {count: 10, title: '这是第二个页面'}, className: 'second'});
  }
}
Page(new Index())