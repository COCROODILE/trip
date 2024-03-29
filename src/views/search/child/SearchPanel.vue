<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { debounce } from "@/utils/debounce&throttle";
import useSearch from "@/stores/modules/search";
import SearchResultItem from "./SearchResultItem.vue";
import SearchCategory from "./SearchCategory.vue";

const searchStore = useSearch();

const value = ref("");

// 监听输入框输入的值
watch(
  value,
  debounce((newValue, oldValue) => {
    // 判断是否为空值
    if (!newValue.trim()) {
      return;
    }

    searchStore.addSearchHistory(newValue); //将新的值存入历史记录中
    searchStore.fecthSearchSuggestData(newValue);
  })
);

const { searchSuggest, searchHistorys } = storeToRefs(searchStore);

defineProps({
  searchPanelDatas:{
    type: Array,
    default: () => []
  },
  title:{
    type: String,
    default: ''
  }
})

const emit = defineEmits(["cancel", "search", "tagClick", "resultItemClick"]);
const onCancel = () => {
  value.value = "";
  searchSuggest.value = [];
  emit("cancel");
};

const onSearch = () => {
  emit("search");
};

const handleTagClick = (item) => {
  emit('tagClick', { keyword: item.name })
}

const handleResultItemClick = (item) => {
  emit('resultItemClick', item)
}
</script>

<template>
  <div class="search-panel">
    <van-sticky>
      <van-search
        v-model="value"
        show-action
        shape="round"
        placeholder="搜索广州的景点、地标、房源"
        @search="onSearch"
        @cancel="onCancel"
      />
    </van-sticky>

    <!-- 搜索结果 -->
    <div v-if="searchSuggest.length" class="search-result-panel">
      <template v-for="(suggest, index) in searchSuggest" :key="index">
        <search-result-item
          :name="suggest.name"
          :keyword="value"
          :description="suggest.description"
          :itemTypeName="suggest.itemTypeName"
          @item-click="handleResultItemClick"
        />
      </template>
    </div>

    <!-- 搜索历史 -->
    <div v-else class="search-category-panel">
      <search-category title="历史搜索"  />
      <template v-for="(item, index) in searchPanelDatas" :key="index">
        
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
// :global(.search-panel .van-search--show-action) {
//   padding-left: 0px;
// }

.search-panel {
  --van-field-icon-size: 24px;

  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: #fff;
  // padding: 0 20px;

  .search-result-panel {
    width: 100%;
    height: calc(100vh - 54px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .search-category-panel {
    padding-top: 30px;
    .clear {
      font-size: 12px;
      .icon-delete {
        position: relative;
        top: 2px;
        display: inline-block;
        background-image: url("@/assets/img/home/home-sprite.png");
        background-size: 207px 192px;
        background-position: -150px -133px;
        width: 11px;
        height: 11px;
        margin-left: 4px;
      }
    }
  }
}
</style>