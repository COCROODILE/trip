<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import useCity from "@/stores/modules/city";
import { storeToRefs } from "pinia";

// import {getCityAll} from '@/service'

import CityGroup from './cpns/CityGroup.vue'

// 搜索功能
const searchValue = ref("");
const router = useRouter();
const cancelClick = () => {
  router.back();
};

// tab切换
const tabActive = ref(0);
// const allCity = ref({})
// getCityAll().then(res => {
//   console.log(res);
//   allCity.value = res.data.data
// })

// 从stores中获取数据
const cityStore = useCity();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);

// 获取选中标签后的数据
// 根据key从allCities获取数据，默认直接获取的数据不是响应式的，所以必须包裹computed
const currentGroup = computed(() => allCities.value[tabActive.value]);
console.log(allCities.value);
</script>

<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        show-action
        shape="round"
        @cancel="cancelClick"
        placeholder="城市/区域/位置"
      />

      <!-- tab切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <!-- <van-tab :title="allCity?.cityGroup?.title"></van-tab> -->

        <!-- 遍历对象 -->
        <template v-for="(value, key, index) in allCities" :key="key">
          <!-- tabActive默认获取的是索引值，绑定了name属性后tabActive绑定的是name的值 -->
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <!-- <city-group :group-data="currentGroup" /> -->
      
      <template v-for="(value, key, index) in allCities" :key="key">
        <city-group v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.city {
  // top固定定位
  // --van-tabs-default-color: 40px;
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  // .content {
  //   margin-top: 98px;
  // }

  .top{
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
