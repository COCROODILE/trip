<script setup>
// import { ref } from "vue";

import HomeNavBar from './child/navbar/HomeNavBar.vue';
import HomeSearchBox from './child/HomeSearchBox.vue';
</script>

<template>
  <div class="home"> 
    <!-- <van-nav-bar title="旅途" />   -->
    <home-nav-bar />

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <home-search-box />
  </div>
</template>

<style scoped lang="less">
.home{
  .banner {
    img {
      width: 100%;
    }
  }

  
}
</style>
