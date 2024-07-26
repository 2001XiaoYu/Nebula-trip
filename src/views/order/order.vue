<template>
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

</style>
