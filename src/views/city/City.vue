<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import {getCityAll} from '@/service'

// 搜索功能
const searchValue = ref("");
const router = useRouter();
const cancelClick = () => {
  router.back();
};

// tab切换
const tabActive = ref(0)
const allCity = ref({})
getCityAll().then(res => {
  console.log(res);
  allCity.value = res.data.data
})
</script>

<template>
  <div class="city top-page">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      show-action
      shape="round"
      @cancel="cancelClick"
      placeholder="城市/区域/位置"
    />

    <!-- tab切换 -->
    <van-tabs v-model:active="tabActive" color="#ff9854">
      <!-- <van-tab :title="allCity?.cityGroup?.title"></van-tab> -->

      <!-- 遍历对象 -->
      <template v-for="(value, key, index) in allCity" :key="key">
        <van-tab :title="value.title"></van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<style scoped lang="less">
// .city{
  // --van-tabs-default-color: 40px;

// }
</style>
