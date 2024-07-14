<template>
    <div class="detail top-page">
        <van-nav-bar
            title="房屋详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="main" v-if="mainPart">
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from '@/service'

import DetailSwipe from './cpns/detail_01-swipe.vue'

const router = useRouter()
const route = useRoute()
const houseId = route.params.id
// console.log(route.params.id);

// 发送网络请求获取数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
})

//监听返回按钮的点击
const onClickLeft = () => {
    router.back()
}

</script>

<style lang="less" scoped>
</style>