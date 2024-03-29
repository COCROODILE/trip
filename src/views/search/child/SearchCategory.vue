<script setup>
import { ref } from "vue";
import TabSelectItem from "@/components/tabSelectItem/TabSelectItem.vue";

const moreIconIsDown = ref(true)
// 是否展开
const moreClick = () => {
  moreIconIsDown.value = !moreIconIsDown.value
}

defineProps({
  title: {
    type: String,
    default: () => [],
  },
  itemDatas: {
    type: Array,
    default: () => [],
  },
  itemType: {
    type: String,
    default: 'default'
  }
});

const emit = defineEmits(['tagClick'])
const handleTagClick = (item) => {
  emit('tagClick', item)
}
</script>

<template>
  <div class="search-category">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="more">
        <slot name="more" @click="moreClick">
          <span class="m-name">展开</span>
          <i :class="['icon-more', moreIconIsDown ? 'down' : 'up']"></i>
        </slot>
      </div>
      <!-- <div class="clear">
          <span>清空</span>
          <i class="icon-delete"></i>
        </div> -->
    </div>

    <div :class="['content', moreIconIsDown ? 'hidden' : 'show-all']">
      <template v-for="(item, index) in itemDatas" :key="index">
        <tab-select-item
          :label="item.name"
          :type="itemType"
          @tag-click="handleTagClick(item)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.search-category {
  padding: 0 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      border-left: 3px solid var(--primary-color);
      padding: 0 5px;
      font-size: 16px;
    }

    .more {
      display: flex;
      justify-content: center;
      align-items: center;

      .m-name {
        font-weight: 500;
        font-size: 10px;
        color: #666;
        line-height: 20px;
        height: 20px;
        margin-right: 5px;
      }

      .icon-more {
        display: inline-block;
        background-image: url(@/assets/img/home/home-sprite.png);
        width: 10px;
        height: 5.5px;
        background-size: 207px 192px;
      }

      .down {
        background-position: -178px -121px;
      }
      .up {
        background-position: -176px -133px;
      }
    }
  }

  .content{
    margin-top: 7px;
    margin-bottom: 22px;
  }

  .content.hidden{
    max-height: 60px;
    overflow-y: hidden;
  }

  .content.show-all{
    overflow: auto;
  }
}
</style>