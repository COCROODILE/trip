<script setup>
import useCity from "@/stores/modules/city";
import { computed } from "vue";
import { useRouter } from "vue-router";

// vue3是没有this的，在<script>标签中需要定义一个变量去接收props中的值才能可以这样使用
// 在template标签中不需要props.groupData,直接groupsData即可
// 一般都写成props，当然写成其他的名字也可以
// 同理defineEmit()也是一样的
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});

// 右侧的动态索引列表
const indexList = computed(() => {
  const list = props.groupData.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});

// 监听城市的点击
const cityStore = useCity();
const router = useRouter();
const cityClick = (city) => {
  // 把选择到的city存到store
  cityStore.currentCity = city;
  // 返回上一级
  router.back();
};
</script>

<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="city in groupData.hotCities" :key="city.cityId">
          <div class="city" @click="cityClick(city)">
            {{ city.cityName }}
          </div>
        </template>
      </div>

      <template v-for="(group, index) in groupData?.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>

    <!-- <template v-for="(group, index) in groupData?.cities" :key="index">
      <van-index-bar :sticky="false">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" />
        </template>
      </van-index-bar>
    </template> -->
  </div>
</template>

<style scoped lang="less">
.city-group {
  --van-index-anchor-font-weight: 400 !important;
  --van-font-bold: 400 !important;

  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 2px 16px;
    justify-content: space-around;
    .city {
      width: 70px;
      height: 28px;
      line-height: 28px;
      // padding: 2px 4px;
      background-color: var(--primary-color);
      margin: 4px;
      border-radius: 14px;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
