const http = function (action, data = {}, method = 'POST') {
  const url = 'https://kong.iwosai.com' // wx._hwjShareData.serverUrl
  let header={'content-type': 'application/json'}
  let token = wx.getStorageSync("authInfo:token");
  if (token) header["Authorization"] = `Bearer ${token}`;
  return new Promise(async function (resolve, reject) {
    wx.showLoading({title: '加载中...', mask: true})
    wx.request({
      data,
      method,
      url: url + action,
      header: header,
      success(res) {
        wx.hideLoading()
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if(res.statusCode === 401){
          reject(res)
        } else {
          wx.showToast({icon: 'none', title: '网络错误，状态码：' + res.statusCode})
          resolve(null)
        }
      },
      fail(err) {
        wx.hideLoading()
        wx.showToast({icon: 'none', title: err.errMsg})
        reject(err)
      }
    })
  })
}


export default http
