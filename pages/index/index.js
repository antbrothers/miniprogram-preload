import BasePage from '../../lib/CommonPage'

class Index extends BasePage {
  constructor(...args) {
    super(...args)
    this.data = {
      testStr: 'this is test'
    }
  }

  onLoad(options) {
    console.log('index 页面 onload 事件执行')
  }

  jumpSecondPage = function() {    
    console.log('------ 点击跳转第二页的事件 ------', this)
    this.$route({path: '../second/index', query: {count: 10, title: '这是第二个页面'}, className: 'Index'});
  }
}

Page(new Index())