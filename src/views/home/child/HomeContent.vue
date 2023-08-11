<script setup>
import useHome from "@/stores/modules/home";
import { storeToRefs } from "pinia";

import HouseItemV3 from "@/components/houseItem/HouseItemV9.vue";
import HouseItemV9 from "@/components/houseItem/HouseItemV3.vue";
import { useRouter } from "vue-router";

const homeStore = useHome();
const { houseList } = storeToRefs(homeStore);

const router = useRouter()
// 跳转到详情Detail页面
const itemClick = (id) => {
  router.push(`/detail/${id}`)
}
</script>

<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <house-item-v3
          v-if="item.discoveryContentType === 9"
          :item-data="item.data"
          @click="itemClick(item.data.houseId)"
        />
        <house-item-v9
          v-else-if="item.discoveryContentType === 3"
          :item-data="item.data"
          @click="itemClick(item.data.houseId)"
        />
      </template> 
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  padding: 10px 8px;
  // padding: 0 22px;
  .title{
    padding: 0 22px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    font-size: 22px;
  }
}
</style>
