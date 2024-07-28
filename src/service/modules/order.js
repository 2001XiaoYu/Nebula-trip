import XYRequest from '../request'

// type = pend 未完成的订单
// type = recent 最近订单
// type = all 全部订单 
export function getOrderList(type = "all") {
  return XYRequest.get({
    url: `/order/list?type=${type}`
  })
}