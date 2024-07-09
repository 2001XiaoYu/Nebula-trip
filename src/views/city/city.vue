<template>
    <div class="city top-page">
        <!-- 1.搜索框 -->
        <van-search 
            v-model="searchValue" 
            placeholder="城市/区域/位置" 
            shape="round" 
            show-action
            @cancel="cancelClick"
        />

        <!-- 2.tab的切换 -->
        <van-tabs v-model:active="tabActive" color="#ff9854">
            <van-tab title="国内·港澳台" name="a"></van-tab>
            <van-tab title="海外" name="b"></van-tab>
        </van-tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCityAll } from '@/service'

const router = useRouter()

//搜索框功能
const searchValue = ref("")
const cancelClick = () => {
    router.back()
}

// tab的切换
const tabActive = ref()

//网络请求： 请求城市的数据
getCityAll().then(res => {

})

</script>

<style lang="less" scoped>

</style>