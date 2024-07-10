import XYRequest from '../request'

export function getHomeHotSuggests() {
    return XYRequest.get({ 
        url: "/home/hotSuggests" 
    })
}