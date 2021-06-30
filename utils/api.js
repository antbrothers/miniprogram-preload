import http from './http'


/**
 * 获取广告内容
*/
export const getAdsContent = function (id) {
    return http(`/ads-gold-digger/wechatCoupon/params/${id}`,{},"GET")
}


