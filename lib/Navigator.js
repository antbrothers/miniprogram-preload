/**
 * 存储所有页面实例
 */
export default class Navigator {
  static pages = {}
  // 当前路由绑定实例
  static putPage(path, _this) {
    this.pages[path] = _this
  }
  // 读取当前页面实例
  static getPage(path) {
    return this.pages[path]
  }
  // 删除当前实例
  static delPage(path) {
    delete this.pages[path]
  }
}