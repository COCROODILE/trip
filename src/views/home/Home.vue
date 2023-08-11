<script setup>
import { watch, computed } from "vue";
import useHome from "@/stores/modules/home";

import HomeNavBar from "./child/navbar/HomeNavBar.vue";
import HomeSearchBox from "./child/HomeSearchBox.vue";
import HomeCategories from "./child/HomeCategories.vue";
import HomeContent from "./child/HomeContent.vue";
import SearchBar from "@/components/searchBar/SearchBar.vue";

import useScroll from '@/hooks/useScroll'

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

const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newVal) => {
  if(newVal){
    // 异步：确保数据加载完成后再将isReachBottom赋值为false
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 上拉至热门精选时 搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 160
// })

// 使用watch监听会浪费性能，可以使用computed
// 定义的可响应式数据，依赖另外一个可响应式的数据，那么可以使用计算属性
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350
})
</script>

<template>
  <div class="home">
    <!-- <van-nav-bar title="旅途" />   -->
    <home-nav-bar />

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>

    <home-search-box />
    <home-categories />

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="9.23"  :end-date="10.25" />
    </div>

    <home-content />
    <!-- <button @click="moreBtnClick">加载更多</button> -->
  </div>
</template>

<style scoped lang="less">
.home {
  margin-bottom: 100px;
  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar{
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
