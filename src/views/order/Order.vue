<script setup>
import { ref, watch } from "vue";
import useOrder from "@/stores/modules/order";
import { storeToRefs } from "pinia";
import OrderItem from "./child/OrderItem.vue";

const orderStore = useOrder();
orderStore.fecthOrderListData("all");
const { orderList } = storeToRefs(orderStore);

const active = ref(0);
const orderTitles = ["全部订单", "近期订单", "待支付"];
const orderTypes = ["all", "recent", "pend"];
watch(active, (newValue) => {
  // console.log(newValue);
  if (newValue !== undefined) {
    orderStore.fecthOrderListData(orderTypes[newValue]);
    console.log(orderTypes[newValue]);
  }
});
</script>
<template>
  <div class="order">
    <van-sticky>
      <!-- 导航栏 -->
      <van-nav-bar title="订单列表">
        <template #right>
          <van-icon name="wap-nav" size="24" />
        </template>
      </van-nav-bar>

      <!-- tabs -->
      <van-tabs
        v-model:active="active"
        title-active-color="#ff9854"
        :line-height="2"
      >
        <template v-for="(title, index) in orderTitles" :key="index">
          <van-tab :title="title"> </van-tab>
        </template>
      </van-tabs>
    </van-sticky>

    <div class="content">
      <div v-if="orderList.length">
        <template v-for="(item, indey) in orderList" :key="indey">
          <order-item :item-data="item" />
        </template>
      </div>

      <div v-else class="tips">
        <img src="@/assets/img/order/icon-order.png" alt="">
        <div class="title">近期暂无订单</div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="less">
.order {
  --van-nav-bar-title-text-color: var(--primary-color);

  background-color: #f7f8fb;

  .content {
    height: calc(100vh - 46px - 44px - 49px);
    overflow-y: scroll;

    .tips{
      text-align: center;
      margin: 80px;
      img{
        width: 1000%;
      }
      .title{
        margin-top: 20px;
        color: #000;
        font-size: 18px;
      }
    }
  }
}
</style>