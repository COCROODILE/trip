<script setup>
defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="city-group">
    <template v-for="(group, index) in groupData?.cities" :key="index">
      <van-index-bar>
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" />
        </template>
      </van-index-bar>

      <!-- <div class="group-item">
        <h2 class="title">标题： {{ group.group }}</h2>
        <div class="list">
          <template v-for="(city, indey) in group.cities" :key="indey">
            <div class="city">{{ city.cityName }}</div>
          </template>
        </div>
      </div> -->
    </template>
  </div>
</template>

<style scoped lang="less"></style>
