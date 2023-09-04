<script setup>
import { onMounted, ref } from "vue";
import SideBarVue from "../sideBar/SideBar.vue";
import ViewsHouseBtnsVue from "../viewsHouseBtns/ViewsHouseBtns.vue";

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

const active = ref(0);

const dropdownRefs = {};
const dropdownItemRefs = (el) => {
  // console.log(el.title);
  if (el) {
    dropdownRefs[el.title] = el;
  }
};

const handleClearClick = (title) => {
  // console.log(dropdownRefs[title].toggle);
  //vant 通过 ref 可以获取到 DropdownItem 实例并调用实例方法
  dropdownRefs[title]?.toggle();
};

const handleViewClick = (title) => {
  dropdownRefs[title]?.toggle();
};
</script>

<template>
  <div class="dropdown-select">
    <van-dropdown-menu active-color="#ff9854">
      <template v-for="(item, index) in itemsData" :key="index">
        <van-dropdown-item
          title="位置"
          v-if="item.gType === 2"
          :ref="dropdownItemRefs"
        >
          <div class="dropdown-bar-panel-content">
            <side-bar :side-datas="item.subGroups"></side-bar>
            <views-house-btns
              @clear="handleClearClick('位置')"
              @view-click="handleViewClick('位置')"
            />
          </div>
        </van-dropdown-item>

        <van-dropdown-item
          v-if="item.gType === 4"
          v-model="value"
          :options="options"
        />

        <van-dropdown-item
          title="筛选"
          v-if="item.gType === 1"
          :ref="dropdownItemRefs"
        >
          <div class="dropdown-bar-panel-content">
            <side-bar :side-datas="item.subGroups"></side-bar>
            <views-house-btns
              @clear="handleClearClick('筛选')"
              @view-click="handleViewClick('筛选')"
            />
          </div>
        </van-dropdown-item>
      </template>
    </van-dropdown-menu>
  </div>
</template>

<style scoped lang="less">
@popupHeight: 500px;
.dropdown-select {
  --van-sidebar-active-color: var(--primary-color);
  --van-sidebar-selected-text-color: var(--primary-color);
  --van-sidebar-width: 120px;
  --van-sidebar-selected-font-weight: 400;
  --van-sidebar-padding: 18px;
  --van-dropdown-menu-content-max-height: 100%;

  overflow-y: hidden;
  :deep(.van-sidebar-item--select:before) {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    left: 5px;
  }

  .dropdown-bar-panel-content {
    height: @popupHeight;
    overflow: hidden;
  }
}
</style>