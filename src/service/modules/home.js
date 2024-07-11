import XYRequest from '../request'

export function getHomeHotSuggests() {
    return XYRequest.get({ 
        url: "/home/hotSuggests" 
    })
}

export function getHomeCategories() {
    return XYRequest.get({
        url: "/home/categories"
    })
}