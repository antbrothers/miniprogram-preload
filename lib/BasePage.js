import Navigator from './Navigator'
function WXPage(name, option) {
  console.log('basePage', name, option)
  return Page(option)
}
Page.P = WXPage
module.exports = WXPage