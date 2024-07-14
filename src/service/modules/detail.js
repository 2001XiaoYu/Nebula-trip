import XYRequest from  '../request'

export function getDetailInfos(houseId) {
    return XYRequest.get({
        url: "/detail/infos",
        params: {
            houseId
        }
    })
}