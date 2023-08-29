<script setup>
defineProps({
  topInfos: {
    type: Object,
    default: () => ({}),
  },
});
const scoreFormat = (score) => {
  return Number(score).toFixed(1)
}
</script>

<template>
  <div class="infos">
    <div class="name">{{ topInfos.houseName }}</div>
    <div class="tags">
      <template v-for="(item, index) in topInfos.houseTags" 
      :key="index">
        <span
          class="item"
          v-if="item.tagText"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </span>
      </template>
    </div>

    <div class="comment layout-flex">
      <div class="left">
        <span class="score">{{ scoreFormat(topInfos.commentBrief.overall) }}</span>
        <span class="title">{{ topInfos.commentBrief.scoreTitle }}</span>
        <span class="brief">{{ topInfos.commentBrief.commentBrief }}</span>
      </div>

      <div class="right">
        <span class="count">{{ topInfos.commentBrief.totalCount }}条评论</span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="position layout-flex">
      <div class="left">{{ topInfos.nearByPosition.address }}</div>
      <div class="right address">地图·周边
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.infos{
  padding: 16px;
  background-color: #fff;

  .name {
    font-weight: 700;
    font-size: 20px;
    color: #333;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;
  }

  .tags{
    .item{
      font-size: 12px;
      margin: 0 2px;
      padding: 1px 3px;
    }
  }

  .layout-flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 5px;
    background-color: #f5f7fa;

    .right{
      color: var(--primary-color);
    }
  }

  .comment{
    .score{
      font-size: 18px;
      font-weight: 700;
      color: 700;
      margin-right: 5px;
    }

    .title{
      color: #333;
      font-weight: 700;
      margin-right: 5px;
    }

    .brief{
      color: #666;
    }
  }

  .position{
    .address {
      font-size: 14px;
      font-weight: 700;
    }
  }
}
</style>
