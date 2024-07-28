<!-- <template>
  <div class="order">
      <van-sticky>
          <nav-bar title="订单列表"></nav-bar>
          <van-tabs 
              v-model:active="currentOrder"
              title-active-color="#ff9854"
              color="#ff9854"
              :line-height="2"
          >
          <template v-for="(item, index) in orderTitles">
              <van-tab :title="item" :name="index"></van-tab>
          </template>
          </van-tabs>
      </van-sticky>
      <div class="content">
          <div class="tips" >
              <img src="@/assets/img/order/icon-order.png" alt="">
              <div class="title">近期暂无订单</div>
          </div>
      </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import NavBar from "@/components/nav-bar/nav-bar.vue"
import { getOrderList } from '@/service';

const currentOrder =  ref()
const orderTitles = ["全部订单", "近期订单", "待支付"];

</script>

<style lang="less" scoped>
.order {
  height: 100vh;
  --van-tabs-line-height: 40px;
  padding-bottom: 55px;

  .content {
      height: calc(100% - 86px);
      overflow: scroll;

      .tips {
          text-align: center;
          margin-top: 80px;
          img {
              width: 88%;
          }
          .title {
              margin-top: 20px;
              color: #000;
              font-size: 18px;
          }
      }
  }
}

</style> -->

<script setup lang="ts">
import NavBar from "@/components/nav-bar/nav-bar.vue"
import OrderItem from './cpns/OrderItem.vue'
import { getOrderList } from '@/service'
import { ref, watch } from 'vue';

const orderList = ref<any>([])
const activeName = ref(0)
const orderTitles = ['全部订单', '近期订单', '待支付']
const orderTitleType = ['all', 'recent', 'pend']

// 发送网络请求获取订单列表数据
getOrderList().then((res) => {
  console.log(res)
  orderList.value = res.data.data.orders ?? [] // 保存订单列表
})

// 监听tab栏的切换发送网络请求获取不同状态订单列表
watch(activeName, (newVal) => {
  if (newVal !== undefined) {
    getOrderList(orderTitleType[newVal]).then((res) => {
      orderList.value = res.data.data.orders ?? [] // 根据不同的切换 保存不同状态订单列表
    })
  }
})
</script>

<template>
  <div class="order">
    <NavBar title="订单列表" :is-show-left="true" />
    <van-tabs v-model:active="activeName" title-active-color="#ff9854" sticky>
      <template v-for="(item, index) in orderTitles" :key="index">
        <van-tab :title="item" :name="index"></van-tab>
      </template>
    </van-tabs>
    <div class="content">
      <div v-if="orderList.length">
        <template v-for="(item, index) in orderList" :key="index">
          <OrderItem :item-data="item"></OrderItem>
        </template>
      </div>
      <div v-else>暂无订单数据</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.content{
  margin-bottom: 55px;
}
</style>

