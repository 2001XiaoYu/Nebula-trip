<template>
    <div class="home">
        <home-nav-bar/>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import HomeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import useHomeStore from '@/stores/modules/home';


// 发送网路请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
// 1. 热门建议
// const hotSuggests = ref([])
// YBRequest.get({
//     url: "/home/hotSuggests"
// }).then(res => {
//     hotSuggests.value = res.data
// })


</script>

<style lang="less" scoped>
.banner {
    img {
        width: 100%;
    }
}

</style>