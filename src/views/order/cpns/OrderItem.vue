<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface IOrder {
  unitName: string
  unitPicture: string
  orderStatus: number
  orderStatusDesc: string
  orderStatusDescColor: string
  checkInDate: string
  checkOutDate: string
  checkInLatestTime: string
  checkOutLatestTime: string
  prepayAmount: number
  countdown: number
}

interface IProps {
  itemData: IOrder
}

const props = defineProps<IProps>()

// 处理时间
const getFormDate = computed(() => {
  return (dataString: string, isWeek = false) => {
    let date = new Date(dataString)
    if (isWeek) {
      return '周' + '日一二三四五六'.charAt(date.getDay())
    }
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
})

// 倒计时
const remainingTime = ref(0)
let counter = 1
const startCountDown = () => {
  const timer = setInterval(() => {
    remainingTime.value = Math.floor((props.itemData.countdown - counter) / 60)
    counter++
    if (remainingTime.value <= 0) {
      clearInterval(timer)
      return
    }
  }, 1000)
}
// 挂载完毕调用计时器
onMounted(() => {
  startCountDown()
})
</script>

<template>
  <div class="order-item">
    <div class="title">
      <div class="unit-name">{{ itemData.unitName }}</div>
      <div
        class="order-status"
        :style="{ color: itemData.orderStatusDescColor }"
      >
        {{ itemData.orderStatusDesc }}
      </div>
    </div>
    <div class="info">
      <img :src="itemData.unitPicture" alt="" class="bg" />
      <div class="bottom">
        <div class="l">
          <div class="date">
            <div class="month">{{ getFormDate(itemData.checkInDate) }}</div>
            <span class="week">
              {{ getFormDate(itemData.checkInDate, true) }}
            </span>
            <span class="time">{{ itemData.checkInLatestTime }}</span>
          </div>
          <img
            src="@/assets/img/home/icon_right_orderlist.png"
            alt=""
            class="arrow"
          />
          <div class="date">
            <div class="month">{{ getFormDate(itemData.checkOutDate) }}</div>
            <span class="week">
              {{ getFormDate(itemData.checkOutDate, true) }}
            </span>
            <span class="time">{{ itemData.checkOutLatestTime }}</span>
          </div>
        </div>
        <div class="r">
          <div class="text">支付总价</div>
          <div class="total-count">¥{{ itemData.prepayAmount }}</div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <div class="btn-l">
        <div v-if="itemData.orderStatus === 1">
          <img src="@/assets/img/home/icon-time.png" alt="" />
          <span class="time">{{ remainingTime }}分</span>
          <span class="msg">后订单自动取消</span>
        </div>
      </div>
      <div class="btn-r">
        <button v-if="itemData.orderStatus === 1" class="btn connect">
          联系房东
        </button>
        <button v-if="itemData.orderStatus === 1" class="btn pay">
          去支付
        </button>
        <button v-if="itemData.orderStatus === 5" class="btn delete">
          删除
        </button>
        <button v-if="itemData.orderStatus === 5" class="btn order">
          再次预定
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.row-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-item {
  border-top: 10px solid #f7f8fb;
  padding: 0 10px;
  .title {
    .row-flex();
    padding: 20px 0; // less 的用法 类似解构对象的方式
    .unit-name {
      width: 65%;
      overflow: hidden;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
    }
    .order-status {
      font-size: 22px;
    }
  }
  .info {
    position: relative;
    overflow: hidden;
    .bg {
      border-radius: 8px;
      width: 100%;
    }
    .bottom {
      .row-flex();
      position: absolute;
      bottom: 0;
      left: 0;
      width: 92%;
      padding: 14px 15px;
      border-radius: 0 0 8px 8px;

      background: rgba(0, 0, 0, 0.3);
      .l {
        .row-flex();
        text-align: center;
        border-right: 1px solid #fff;
        padding-right: 12px;
        .date {
          .month {
            font-size: 18px;
            color: #fff;
          }
          .week {
            color: rgb(233, 232, 232);
            font-size: 12px;
          }
          .time {
            color: rgb(233, 232, 232);
            font-size: 12px;
          }
        }
        .arrow {
          width: 30px;
          height: 20px;
          margin: 0 8px;
        }
      }
      .r {
        margin-right: 20px;
        text-align: center;
        .text {
          color: #c3c0bf;
          margin-bottom: 6px;
        }
        .total-count {
          color: #ff9645;
        }
      }
    }
  }

  .btn-box {
    .row-flex();
    margin: 10px 0;

    .btn-l {
      // line-height: 1;
      img {
        margin-right: 5px;
        width: 15px;
        height: 15px;
      }
      .time {
        color: #ff9645;
      }
    }
    .btn-r {
      .btn {
        display: inline-block;
        text-align: center;
        line-height: 30px;
        margin-left: 10px;

        font-size: 14px;
        min-width: 75px;
        color: #666;
        background: #fff;
        border: 1px solid #e9e9e9;
        border-radius: 6px;
      }
      .pay {
        color: white;
        background-color: var(--primary-color, #ff9645);
        border: 1px solid var(--primary-color, #ff9645);
      }
      .order {
        color: var(--primary-color, #ff9645);
        background-color: #fff;
        border: 1px solid var(--primary-color, #ff9645);
      }
    }
  }
}
</style>
