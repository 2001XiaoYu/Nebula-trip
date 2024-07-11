import { defineStore } from 'pinia'
import { getHomeCategories, getHomeHotSuggests } from '@/service'

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: []
    }),
    actions: {
        async fetchHotSuggestsData() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories()
            this.categories = res.data
        }
    }
})

export default useHomeStore