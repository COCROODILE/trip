<script setup>
import useHome from "@/stores/modules/home";
import { storeToRefs } from "pinia";

const homeStore = useHome();
const { categories } = storeToRefs(homeStore);
</script>

<template>
  <div class="categories">
    <template v-for="(item, index) in categories" :key="index">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <div class="text">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.categories {
  display: flex;
  padding: 0 10px;
  overflow-x: auto;
  height: 80px;
  margin-top: 16px;
  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    width: 70px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    img {
      width: 32px;
      height: 32px;
    }

    .text{
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>
