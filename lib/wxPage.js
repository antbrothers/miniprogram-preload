// /**
//  * 扩展Page函数
//  * @param {*} Page 原生Page 
//  */
// const pageExtend = Page => {
//   return object => {
//     // 导出原生Page传入的object参数中的生命周期函数
//     // 由于命名冲突，所以将onLoad生命周期函数命名为onLoaded
//     const { onLoaded } = object
//     // 公共的onLoad生命周期函数
//     object.onLoad = function(options) {
//       // 执行 onLoaded生命周期函数
//       if (typeof onLoaded === 'function') {
//         onLoaded.call(this, options)
//       }
//     }
//     // 公共的onShareAppMessage事件处理函数
//     object.onShareAppMessage = () => {
//       return {
//         title: '分享标题',
//         imageUrl: '分享封面'
//       }
//     }
//     return Page(object)
//   }
// }

// // 获取原生Page
// const orginalPage = Page
// // 定义一个新的Page, 将原生Page传入Page扩展行数
// Page = pageExtend(orginalPage)


function WXPage (name, option) {
  name = option.name || '_unknow'
  option.$name = name
  option.$state = {
		// 是否小程序被打开首页启动页面
		firstOpen: false
	}
  if (option.onPreload) {
    console.log(`Page[${name}] define onPreload`)
    // option.onPreload({url, query})
  }
  Page(option)
  return option
}
Page.P = WXPage
module.exports = WXPage
