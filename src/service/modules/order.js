import XYRequest from '../request'

export function getOrderList(type = "all") {
  return XYRequest.get({
    url: "`/order/list?type=${type}`"
  })
}