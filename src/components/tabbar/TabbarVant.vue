<script setup>
import { ref } from "vue";

import {tabbarData} from "@/assets/data/tabbar.js";

import { getAssetURL } from '@/utils/get_assets_img.js'

const currentIndex = ref(0);
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData" 
      :key="index">
        <van-tabbar-item :to="item.path">
          <!-- 默认插槽 #default -->
          <span>{{ item.text }}</span>
          <!-- 具名插槽 -->
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

<style scoped lang="less">
.tab-bar{
  // 局部定义一个变量：只针对 .tab-bar子元素才生效
  // --van-tabbar-item-icon-size: 50px;

  // 找到类，对类中的css属性重写
  :deep(.van-tabbar-item__icon) {
    font-size: 50px;
  }

  img{
    height: 26px;
  }
}
</style>
