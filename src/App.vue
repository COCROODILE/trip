<script setup>
import { useRoute } from 'vue-router'

// import Tabbar from '@/components/tabbar/Tabbar.vue'
import TabbarVant from '@/components/tabbar/TabbarVant.vue'
import Loading from '@/components/loading/Loading.vue'

const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    
    <tabbar-vant v-if="!route.meta.hideTabBar" />
    <!-- <tabbar-vant /> -->
    <loading />
  </div>
</template>

<style scoped>

</style>
