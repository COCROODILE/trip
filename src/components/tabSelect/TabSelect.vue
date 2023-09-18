<script setup>
import { ref } from "vue";
import TabSelectItem from "../tabSelectItem/TabSelectItem.vue";
import ViewsHouseBtns from "../viewsHouseBtns/ViewsHouseBtns.vue";

defineProps({
  hotFilters: {
    type: Array,
    default: () => [],
  },
});

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

// tab的点击
const currentIndex = ref(0);
const handleTagClick = (item, index) => {
  currentIndex.value = index;
};

const currentSubIndex = ref(0)
// 二级tab的点击
const handleSubTagClick = (item, index) => {
  currentSubIndex.value = index
}
</script>

<template>
  <div class="tab-select">
    <template v-for="(item, index) in hotFilters" :key="index">
      <van-dropdown-menu active-color="#ff9854" v-if="item.subFilterItems">
        <van-dropdown-item :title="item.label" :ref="dropdownItemRefs">
          <div class="dropdown-bar-panel-content">
            <div class="drop-content">
              <tab-select-item
                v-for="(subItem, indey) in item.subFilterItems"
                :key="indey"
                @tagClick="handleSubTagClick(subItem, indey)"
                :label="subItem.label"
                class="d-item"
              />
            </div>
            <views-house-btns
              @clear="handleClearClick(item.label)"
              @viewClick="handleViewClick(item.label)"
            />
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>

      <tab-select-item
        v-else
        :label="item.label"
        @tagClick="handleTagClick(item, index)"
        :active="currentIndex === index"
      />
    </template>
  </div>
</template>

<style scoped lang="less">
.btn-style {
  height: 25px;
  line-height: 25px;
  border-radius: 13px;
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 0 3px;
  background-color: white;
}
:global(.tab-select .van-dropdown-menu) {
  display: inline-block;
}
// :global(.tab-select .van-dropdown-menu .van-dropdown-item--down) {
//   top: 140px !important;
// }
:global(.tab-select .van-dropdown-menu .van-dropdown-item__content) {
  // background-color: #f7f8fb;
  background-color: white;
  padding-top: 0px;
}
:global(.tab-select .van-dropdown-menu .van-dropdown-menu__bar) {
  .btn-style();
  box-shadow: none;
}
:global(.tab-select .van-dropdown-menu__title) {
  padding-right: 20px;
  font-size: 12px;
  color: #666;
}
:global(.tab-select .van-dropdown-menu__title::after) {
  right: 8px;
}
.tab-select {
  // display: flex;
  // align-items: center;
  white-space: nowrap;
  height: 29px;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  .drop-content {
    display: flex;
    margin-top: 12px;
    padding: 0 12px;
    flex-wrap: wrap;
    // justify-content: space-around;

    .d-item {
      border: 1px solid #979797;
      margin: 5px 8px;
      color: #666;
      padding: 5px 10px;
      // height: 20px;
      // line-height: 20px;
    }
  }
}

.active {
  color: var(--primary-color);
}
</style>