import Navigator from './Navigator'
export default class CommonPage {
  constructor(...args) {
    if (args.length) {
      const name = args[0].className;
      if (name) {
        this.data = {
          className: name
        }
        Navigator.putPage(name, this)
      }
    }
  }
  /**
   * 实现跳转之前预加载数据
   * @param {path} 跳转的路由
   * @param {query} 参数
   * @param {className} 当前页面类名称
   */
  $route = function({path="", query={}, className=""}) {
    let args = '';
    if (Object.keys(query).length) {
      args = '?';
      for (let i in query) {
        if (query.hasOwnProperty(i)) {
          args += i + '=' + query[i] + '&';
        }
      }
      args = args.substring(0, args.length - 1);
    }
    let ctx = Navigator.getPage(className);
    if (ctx && ctx.$onPreload) {
      // 牺牲150ms的跳转时间，为预加载腾出空间
      ctx.$onPreload(query)
      setTimeout(() => {
        wx.navigatorTo({
          url: `${path + args}`
        })
      }, 150);
    } else {
      wx.navigatorTo({
        url: `${path + args}`
      })
    }
  }

  /**
   * 添加预加载方法
   * @param {标识} key 
   * @param {预加载方法} fun 
   * @param {参数} args 
   */
  $put = function(key, fun, args) {
    if (key && fun) {
      CommonPage.prototype._pageVules[`${this.data.className}?${key}`] = CommonPage._$delay(this, fun, args)
    }
  }
  /**
   * 开始执行预加载回调方法
   * @param {上下文对象} ctx 
   * @param {回调函数} cb 
   * @param {参数} args 
   */
  static _$delay(ctx, cb, args) {
    return new Promise((resolve, reject) => {
      ctx.resolve = resolve;
      ctx.reject = reject;
      CommonPage.prototype.currentPageContext = ctx;
      cb && cb(args, resolve, reject)
    })
  }
}