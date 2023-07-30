<script setup>
import { ref } from "vue";

import {tabbarData} from "@/assets/data/tabbar.js";

import { getAssetURL } from '@/utils/get_assets_img.js'

const currentIndex = ref(0);
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex">
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item>
          <span>首页</span>
          <template #icon>
            <img
              v-if="currentIndex !== index"
              :src="getAssetURL(item.image)"
              alt=""
            />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less"></style>
