import XYRequest from '../request/index'

export function getCityAll () {
    return XYRequest.get({
        url: "/city/all"
    })
}