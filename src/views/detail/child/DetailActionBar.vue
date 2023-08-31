<script setup>
import { getAssetURL } from '@/utils/get_assets_img.js'

defineProps({
  currentHouse:{
    type:Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="action-bar">
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="聊天" />
      <div class="info">
        <span class="newPrice">￥{{currentHouse.finalPrice}}</span>
        <span class="unit">{{ currentHouse.priceMark }}</span>
        <span v-if="currentHouse.productPrice" class="oldPrice">{{ currentHouse.productPrice }}</span>
      </div>
      <van-action-bar-button type="warning" text="加入购物车" :icon="getAssetURL('detail/icon_order.png')" />
    </van-action-bar>
  </div>
</template>

<style scoped lang="less">
.action-bar{
  .info{
    border-left: 1px solid #ccc;
    padding: 0 15px;
    .newPrice{
      font-weight: 600;
      font-size: 14px;
      color: var(--primary-color);
      margin-right: 5px;
    }
    .unit, .oldPrice{
      color: #999;
      font-size: 12px;
    }
    .oldPrice{
      text-decoration: line-through;
      margin-left: 5px;
    }
  }
}
</style>