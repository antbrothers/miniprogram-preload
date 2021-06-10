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
  $init(originData) {

    Object.assign(this.data = this.data ? this.data : {}, originData);
    this.$orgin = JSON.parse(JSON.stringify(this.data));
    Object.freeze(this.$orgin)
  }
  /**
    * 监听页面卸载
    */
  onUnload() {
    if (this.data.className) {
      let className = Navigator.getPage(this.data.className);
      if (!className || !clazz.$orgin) {
        onsole.error('请先在页面的constructor方法中注入init(data)，以避免出现不必要的错误');
        return;
      }
      className.data = JSON.parse(JSON.stringify(className.$orgin));
    }
  }
  $setData = function (data) {
    if (this.setData) {
      this.setData(data);
    } else {
      Object.assign(this.data = this.data ? this.data : {}, data);
    }
  };
  /**
   * 实现跳转之前预加载数据
   * @param {path} 跳转的路由
   * @param {query} 参数
   * @param {className} 当前页面类名称
   */
  $route = function ({ path = "", query = {}, className = "" }) {
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
        wx.navigateTo({
          url: `${path + args}`
        })
      }, 150);
    } else {
      wx.navigateTo({
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
  $put = function (key, fun, args) {
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

  /**
   * 获取当前请求实例
   * @param {标识} key 
   */
  $take(key) {
    if (key) {
      const promise = CommonPage.prototype._pageVules[`${this.data.className}?${key}`]
      delete CommonPage.prototype._pageVules[`${this.data.className}?${key}`]              // 使用结束之后，需要删除当前记录
      return promise
    }
    return null
  }

  /**
   * 成功数据返回值
   * @param {数据返回值} data 
   */
  $resolve = function (data) {
    const ctx = CommonPage.prototype.currentPageContext;
    ctx && ctx.resolve && ctx.resolve(data)
    CommonPage.prototype.currentPageContext = null

  }

  /**
   * 失败数据返回
   * @param {数据} data 
   * @param {失败} error 
   */
  $reject = function (data, error) {
    const ctx = CommonPage.prototype.currentPageContext;
    ctx && ctx.resolve && ctx.reject(data, error)
    CommonPage.prototype.currentPageContext = null
  }

}

CommonPage.prototype._pageVules = {};            // 存储当前请求的promise 实例
CommonPage.prototype.currentPageContext = null;   // 存储当前实例