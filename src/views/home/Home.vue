<script setup>
import { watch, computed, ref, onActivated } from "vue";
import { useRouter } from "vue-router";

import useHome from "@/stores/modules/home";

import HomeNavBar from "./child/navbar/HomeNavBar.vue";
import HomeSearchBox from "./child/HomeSearchBox.vue";
import HomeCategories from "./child/HomeCategories.vue";
import HomeContent from "./child/HomeContent.vue";
import SearchBar from "@/components/searchBar/SearchBar.vue";

import useScroll from "@/hooks/useScroll";
import useMain from "@/stores/modules/main";
import { storeToRefs } from 'pinia';

import { formatMonthDay } from "@/utils/format_date";


const homeStore = useHome();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
homeStore.fetchHouseListData();

// const moreBtnClick = () => {
//   homeStore.fetchHouseListData();
// };

//其实做到这里已经很牛了
// 通过在内部返回一个callback，在callback中进行逻辑操作
// useScroll(() => {
//   homeStore.fetchHouseListData()
// })

// 监听滚动到底部
const homeRef = ref();
const { isReachBottom, scrollTop } = useScroll(homeRef);
watch(isReachBottom, (newVal) => {
  if (newVal) {
    // 异步：确保数据加载完成后再将isReachBottom赋值为false
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false;
    });
  }
});

// 上拉至热门精选时 搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 160
// })

// 使用watch监听会浪费性能，可以使用computed
// 定义的可响应式数据，依赖另外一个可响应式的数据，那么可以使用计算属性
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350;
});

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  });
});

const mainStore = useMain();
const { startDate, endDate } = storeToRefs(mainStore)
const startDateStr = computed(() => formatMonthDay(startDate.value, "MM.DD"))
const endDateStr = computed(() => formatMonthDay(endDate.value, "MM.DD"))
const homeSearchBoxRef = ref();
const router = useRouter();
const searchClick = () => {
  // router.push({
  //   path:'/search',
  // })

  // console.log(homeSearchBoxRef.value.searchBtnClick);
  homeSearchBoxRef.value.searchBtnClick();
};
</script>

<script>
export default {
  name: "home",
};
</script>

<template>
  <div class="home" ref="homeRef">
    <!-- <van-nav-bar title="旅途" />   -->
    <home-nav-bar />

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>

    <home-search-box ref="homeSearchBoxRef" />
    <home-categories />

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar
        keyword="关键字/位置/民宿"
        :start-date="startDateStr"
        :end-date="endDateStr"
        :is-have-search-btn="true"
        @search-click="searchClick"
      />
    </div>

    <home-content />
    <!-- <button @click="moreBtnClick">加载更多</button> -->
  </div>
</template>

<style scoped lang="less">
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  margin-bottom: 100px;
  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
    z-index: 9;
  }
}
</style>
