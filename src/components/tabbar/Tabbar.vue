<template>
  <div class="tab-bar">
    <template v-for="(item,index) in tabbarData" :key="index">
      <div class="tab-bar-item"
       @click="itemClick(index, item)"
       :class="{ active: currentIndex === index }">
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {tabbarData} from "@/assets/data/tabbar.js";

import { getAssetURL } from '@/utils/get_assets_img.js'

const currentIndex = ref(0)

const router = useRouter()
const itemClick = (index,item) => {
  currentIndex.value = index
  router.push(item.path)
}


</script>

<style scoped lang="less">
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active{
      color: var(--primary-color);
    }

    img {
      width: 36px;
    }

    .text {
      width: 36px;
      text-align: center;
    }
  }
}
</style>
