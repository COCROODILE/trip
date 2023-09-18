<script setup>
import { formatMonthDay } from "@/utils/format_date";
import { onMounted, ref } from "vue";
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});

const checkIndex = (index) => {
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  for (let i in weekdays) {
    if (index === i) {
      return weekdays[i];
    }
  }
};

let checkInIndex = formatMonthDay(props.itemData.checkInDate, "d");
let checkInDate = checkIndex(checkInIndex);

let checkOutIndex = formatMonthDay(props.itemData.checkOutDate, "d");
let checkOutDate = checkIndex(checkOutIndex);

let remainingTime = ref(0);
const timer = ref(null);
let counter = 1;

const startCountDown = () => {
  timer.value = setInterval(() => {
    remainingTime.value = parseInt((props.itemData.countdown - counter) / 60);
    counter++;
    if (remainingTime.value <= 0) {
      clearInterval(timer.value);
      return;
    }
  }, 1000);
};

onMounted(() => {
  startCountDown();
});
</script>

<template>
  <div class="order-item">
    <div class="header">
      <div class="title">{{ itemData.unitName }}</div>
      <span class="status" :style="{ color: itemData.orderStatusDescColor }">{{
        itemData.orderStatusDesc
      }}</span>
    </div>
    <div class="banner">
      <img :src="itemData.unitPicture" alt="" class="img-banner" />

      <div class="bottom">
        <div class="left">
          <div class="time">
            <div class="date">{{ formatMonthDay(itemData.checkInDate) }}</div>
            <div class="week">
              <span>{{ checkInDate }}</span>
              <span>{{ itemData.checkInLatestTime }}</span>
            </div>
          </div>
          <img
            class="arrow"
            src="@/assets/img/order/icon_right_orderlist.png"
          />
          <div class="time">
            <div class="date">{{ formatMonthDay(itemData.checkInDate) }}</div>
            <div class="week">
              <span>{{ checkOutDate }}</span>
              <span>{{ itemData.checkOutLatestTime }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <span class="text">支付总价</span>
          <span class="price">￥{{ itemData.prepayAmount }}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="left">
        <template v-if="itemData.orderStatus === 1">
          <img
            class="icon-time"
            src="@/assets/img/order/icon-time.png"
            alt=""
          />
          <span class="time">{{ remainingTime }}分</span>
          <span>后订单自动取消</span>
        </template>
      </div>

      <div class="right">
        <template v-if="itemData.orderStatus === 1">
          <van-button type="default" size="small" class="btn"
            >联系房东</van-button
          >
          <van-button color="#ff9854" size="small" class="btn"
            >去支付</van-button
          >
        </template>
        <template v-else-if="itemData.orderStatus === 5">
          <van-button type="default" size="small" class="btn"
            >去支付</van-button
          >
          <van-button color="#ff9854" size="small" class="btn">删除</van-button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.rowlayout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.order-item {
  padding: 10px 15px;
  background-color: #fff;
  margin: 10px 0;
  .header {
    .rowlayout();
    margin: 10px 0;

    .title {
      max-width: 60%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 14px;
    }

    .status {
      font-size: 18px;
      color: var(--primary-color);
    }
  }

  .banner {
    position: relative;
    overflow: hidden;
    .img-banner {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }

    .bottom {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      width: 100%;
      height: 60px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        width: 65%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-right: 1px solid #ccc;

        .time {
          text-align: center;
          .date {
            font-size: 16px;
          }
          .week {
            color: #cfd1d0;
            font-size: 13px;
          }
        }
        .arrow {
          width: 20px;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-right: 10px;
        .text {
          color: #bbb;
        }

        .price {
          color: var(--primary-color);
        }
      }
    }
  }

  .footer {
    .rowlayout();
    height: 60px;

    .left {
      .rowlayout();
      color: #666;

      .icon-time {
        width: 12px;
        margin-right: 3px;
        // vertical-align: baseline;
      }

      .time {
        color: var(--primary-color);
      }
    }

    .right {
      .rowlayout();
      .btn {
        margin-left: 10px;
      }
    }
  }
}
</style>