<template>
    <div class="home" ref="homeRef">
        <home-nav-bar/>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box />
        <home-categories />
        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar :start-date="'09.19'" :end-date="'09.20'" /> 
        </div>
        <home-content />

        <!-- <button @click="moreBtnClick">加载更多</button> -->
    </div>
</template>

<script>
export default { name: "home" }
</script>
<script setup>
import { computed, onActivated, ref, watch } from 'vue';
import HomeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import useHomeStore from '@/stores/modules/home';
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import SearchBar from '@/components/search-bar/search-bar.vue'

import useScroll from '@/hooks/useScroll';



// 发送网路请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategoriesData()
// let currentPage = 1
homeStore.fetchHouseListData()

//默认加载更多
// const moreBtnClick = () => {
//     console.log("加载更多的数据");
//     // currentPage++
//     homeStore.fetchHouseListData()    
// }

//监听window窗口的滚动
// 1.当我们离开页面时，我们移除监听
// 2.如果别的页面也进行类似的监听，会编写重复代码
// const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop  = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     if (clientHeight + scrollTop + 1 >= scrollHeight ) {
//         homeStore.fetchHouseListData()
//     }
// }
// onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler)
// })

// onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
// })

// useScroll(() => {
//     homeStore.fetchHouseListData()
// })

//监听滚动到底部
const homeRef = ref()
const { isReachBottom, scrollTop } =  useScroll(homeRef)
watch(isReachBottom, (newValue)  =>  {
    if(newValue) {
        homeStore.fetchHouseListData().then(() => {
            isReachBottom.value = false
        })
    }
})

//搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//     isShowSearchBar.value = newTop > 100
// })

//定义可响应式的数据，依赖另外一个可响应式的数据，那么可以使用计算函数(computed)
const isShowSearchBar = computed(() => {
    return scrollTop.value >= 450
})


//跳转回home时,保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>
.home {
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 60px;
}

.banner {
    img {
        width: 100%;
    }
}

.search-bar  {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}

</style>