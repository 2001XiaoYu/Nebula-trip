<template>
    <div class="tab-bar">
        <van-tabbar 
            v-model="currentIndex"
            active-color="#ff9854" 
            route
        >
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>

<script setup>

import tabbarData from '@/assets/data/tabbar';
import { getAssetURL } from '@/utils/load_assets';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';


// 监听路由改变时，找到对应的索引，设置currentIndex
const route = useRoute()
const currentIndex = ref(0)
watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    if (index ===  -1 )  return
    currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar {
    // margin-top: 50px;
    img{
        height: 26px;
    }
}

</style>