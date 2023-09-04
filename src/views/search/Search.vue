<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { formatMonthDay } from "@/utils/format_date";

import SearchBar from "@/components/searchBar/SearchBar.vue";
import DropDownSelect from '@/components/dropdownSelect/DropDownSelect.vue'
import TabSelect from "@/components/tabSelect/TabSelect.vue";
import SearchListItem from "@/components/searchListItem/SearchListItem.vue";

import useSearch from '@/stores/modules/search'
import { storeToRefs } from "pinia";

const route = useRoute();
const startDate = route.query.startDate;
const endDate = route.query.endDate;
const currentCity = route.query.currentCity;

const startDateStr = computed(() => formatMonthDay(startDate.value, "MM.DD"));
const endDateStr = computed(() => formatMonthDay(endDate.value, "MM.DD"));

const router = useRouter();
const onClickLeft = () => {
  router.back();
};

// 进行网络请求
const searchStore = useSearch()
searchStore.fetchSearchConditionsData()
searchStore.fetchSearchHouseData()

const { searchConditions, searchHouse } = storeToRefs(searchStore)
// console.log(searchConditions.value);
</script>

<template>
  <div class="search">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #title>
        <search-bar
          :keyword="`搜索${currentCity}的景点`"
          class="search-content"
          :start-date="startDateStr"
          :end-date="endDateStr"
          title="currentCity"
        ></search-bar>
      </template>
      <template #right>
        <van-icon name="wap-nav" size="24" />
      </template>
    </van-nav-bar>

    <!-- 位置 - 欢迎度排序 - 筛选 -->
    <drop-down-select :items-data="searchConditions" />

    <!-- 优惠 - 多人入住 - 复式loft -->
    <div class="tab-wrapper">
      <tab-select :hot-filters="searchHouse.hotFilters" />
    </div>

    <div class="list">
      <template v-for="(item, index) in searchHouse.items" :key="index">
        <search-list-item :item-data="item" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  --van-nav-bar-arrow-size: 24px;

  :deep(.van-nav-bar__title) {
    flex: 1;
    font-weight: 400;
    max-width: 76% !important;
  }

  .search-content {
    margin: 0 10px;
    height: 36px;
  }

  .tab-wrapper{
    padding: 12px 0 10px 20px;
    background-color: #f7f8fb;
  }

  .list{
    padding: 0 20px;
  }
}
</style>