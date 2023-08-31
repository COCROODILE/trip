<script setup>
import { ref } from "vue";
import SideBarVue from "../sideBar/SideBar.vue";

const props = defineProps({
  itemsData: {
    type: Array,
    default: () => [],
  },
});

const value = ref(0);
const options = [
  { text: "欢迎度排序", value: 0 },
  { text: "好评优先", value: 1 },
  { text: "点评数多->少", value: 2 },
  { text: "低价优先", value: 3 },
  { text: "高价优先", value: 4 },
];


const active = ref(0)
</script>

<template>
  <div class="dropdown-select">
    <van-dropdown-menu active-color="#ff9854">
      <template v-for="(item, index) in itemsData" :key="index">
        <van-dropdown-item title="位置" v-if="item.gType === 2">
          <side-bar :side-datas="item.subGroups"></side-bar>
        </van-dropdown-item>

        <van-dropdown-item v-if="item.gType === 4" v-model="value" :options="options" />

        <van-dropdown-item title="筛选" v-if="item.gType === 1">
          <side-bar :side-datas="item.subGroups"></side-bar>
        </van-dropdown-item>
      </template>
    </van-dropdown-menu>
    {{ itemsData }}
  </div>
</template>

<style scoped lang="less">
.dropdown-select{
  --van-sidebar-active-color: var(--primary-color);
  --van-sidebar-selected-text-color: var(--primary-color);
  --van-sidebar-width: 120px;
  --van-sidebar-selected-font-weight: 400;
  --van-sidebar-padding: 18px;

  overflow-y: hidden;
  :deep(.van-sidebar-item--select:before){
    width: 5px;
    height: 5px;
    border-radius: 50%;
    left: 5px;
  }
}
</style>