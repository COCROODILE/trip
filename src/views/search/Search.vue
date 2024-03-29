<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { formatMonthDay } from "@/utils/format_date";

import SearchBar from "@/components/searchBar/SearchBar.vue";
import DropDownSelect from "@/components/dropdownSelect/DropDownSelect.vue";
import TabSelect from "@/components/tabSelect/TabSelect.vue";
import SearchListItem from "@/components/searchListItem/SearchListItem.vue";
import SearchPanel from "./child/SearchPanel.vue";

import useSearch from "@/stores/modules/search";
import { storeToRefs } from "pinia";

const route = useRoute();
const startDate = route.query.startDate;
const endDate = route.query.endDate;
// const currentCity = route.query.currentCity;
const currentCity = route.query.keyword

const startDateStr = computed(() => formatMonthDay(startDate, "MM.DD"));
const endDateStr = computed(() => formatMonthDay(endDate, "MM.DD"));
const router = useRouter();
const onClickLeft = () => {
  router.back();
};

// 进行网络请求
const searchStore = useSearch();
searchStore.fetchSearchConditionsData();
searchStore.fetchSearchHouseData();
searchStore.fetchSearchGuessData();

const { searchConditions, searchHouse, guessULike } = storeToRefs(searchStore);
// console.log(guessULike.value);

const showCancelIcon = ref(false);
// 显示搜索面板
const showSearchPanel = ref(false);
// 前往搜索页面
const handleSearchClick = () => {
  // console.log('search');
  showSearchPanel.value = true;
};

// 回退到首页
const handleCancelClick = () => {
  showCancelIcon.value = false;
};

// 关闭SearchPanel面板
const handlePanelCancel = () => {
  showSearchPanel.value = false;
  // console.log('quxiao');
};

const handleTagClick = (item) => {
  showSearchPanel.value = false

  if(item.keyword){
    showCancelIcon.value = true
    currentCity.value = item.keyword
  }else{
    showCancelIcon.value = false
  }
}

const handleResultItemClick = (item) => {
  handleTagClick({
    currentCity: item.name
  })
}
</script>

<template>
  <div class="search">
    <div class="search-nav-bar">
      <!-- 导航栏 -->
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <search-bar
            class="search-content"
            title="currentCity"
            :city-name="currentCity"
            :start-date="startDateStr"
            :end-date="endDateStr"
            :keyword="`搜索${currentCity}的景点`"
            :show-cancel-icon="showCancelIcon"
            @search-click="handleSearchClick"
            @cancel-click="handleCancelClick"
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
    </div>

    <div class="list">
      <template v-for="(item, index) in searchHouse.items" :key="index">
        <search-list-item :item-data="item" />
      </template>
    </div>

    
    <!-- 点击搜索显示搜索面板 -->
    <search-panel
      v-if="showSearchPanel"
      :title="guessULike?.groupName"
      :searchPanelDatas="guessULike?.groups"
      @cancel="handlePanelCancel"
      @tag-click="handleTagClick"
      @result-item-click="handleResultItemClick"
    />
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

  .search-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;

    .tab-wrapper {
      padding: 12px 0 10px 20px;
      background-color: #f7f8fb;
    }
  }

  .list {
    padding: 0 20px;
    position: relative;
    top: 120px;
    height: calc(100vh - 120px);
    overflow-y: scroll;
  }
}
</style>