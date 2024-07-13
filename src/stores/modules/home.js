import { defineStore } from 'pinia'
import { getHomeCategories, getHomeHotSuggests, getHomeHouseList } from '@/service'

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [],
        currentPage: 1,
        houseList: []
    }),
    actions: {
        async fetchHotSuggestsData() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouseListData(currentPage) {
            const res = await getHomeHouseList(this.currentPage)
            this.houseList.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore