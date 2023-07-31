<script setup>
// import Tabbar from '@/components/tabbar/Tabbar.vue'
import TabbarVant from '@/components/tabbar/TabbarVant.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view />
    
    <!-- <tabbar-vant v-if="!route.meta.hideTabBar" /> -->
    <tabbar-vant />
  </div>
</template>

<style scoped>

</style>
