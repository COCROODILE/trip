<script setup>
// import Tabbar from '@/components/tabbar/Tabbar'
// import Tabbar from '@/components/tabbar/Tabbar.vue'
import Tabbar2 from '@/components/tabbar/Tabbar2.vue'
</script>

<template>
  <div class="app">
    <router-view />
    <!-- <router-link to="/home">首页</router-link>
    <router-link to="/favor">收藏</router-link>
    <router-link to="/order">订单</router-link>
    <router-link to="/message">消息</router-link> -->
    
    <Tabbar2 />
  </div>
</template>

<style scoped>

</style>
