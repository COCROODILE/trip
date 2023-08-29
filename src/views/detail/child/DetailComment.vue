<script setup>
import DetailSection from "@/components/detailSection/DetailSection.vue";

defineProps({
  comment: {
    type: Object,
    default: () => ({}),
  },
});

const scoreFormat = (score) => {
  return Number(score).toFixed(1)
}
</script>

<template>
  <div class="comment">
    <detail-section title="热门评论" :more-text="`查看全部${comment.totalCount}条评论`">
      <div class="comment-inner">
        <div class="header">
          <div class="left">
            <div class="score">
              <span class="text">{{ scoreFormat(comment.overall) }}</span>
              <div class="line"></div>
            </div>
            <div class="info">
              <div class="title">{{ comment.scoreTitle }}</div>
              <div class="count">{{ comment.totalCount }}条评论</div>
              <div class="star">
                <van-rate
                  v-model="comment.overall"
                  :size="12"
                  color="#ff9854"
                  void-icon="star"
                  void-color="#eee"
                  allow-half
                  readonly
                />
              </div>
            </div>
          </div>
          <div class="right">
            <template v-for="(item, index) in comment.subScores" :key="index">
              <div class="item">
                {{ item }}
              </div>
            </template>
          </div>
        </div>
        <div class="tags">
          <template v-for="(item, index) in comment.commentTagVo" :key="index">
            <span
              class="item"
              :style="{
                backgroundColor: item.backgroundColor,
                color: item.color,
              }"
            >
              {{ item.text }}
            </span>
          </template>
        </div>
        <div class="content">
          <div class="user">
            <div class="avatar">
              <img :src="comment.comment.userAvatars" alt="" />
            </div>
            <div class="profile">
              <div class="name">{{ comment.comment.userName }}</div>
              <div class="date">{{ comment.comment.checkInDate }}</div>
            </div>
          </div>
          <div class="desc">
            {{ comment.comment.commentDetail }}
          </div>
        </div>
      </div>
    </detail-section>
  </div>
</template>

<style scoped lang="less">
.comment-inner {
  padding: 10px 0;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      width: 50%;
      // align-items: center;
      .score {
        width: 65px;
        height: 100%;
        color: #333;
        font-weight: 600;
        // background-color: #fab;
        .text {
          position: relative;
          font-size: 40px;
          z-index: 2;
        }
        .line {
          position: relative;
          bottom: 13px;
          width: 55px;
          height: 5px;
          background-color: var(--primary-color);
          z-index: 1;
        }
      }
      .info {
        .count {
          color: #999;
        }
      }
    }

    .right {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        color: #666;
        margin: 3px 0;
      }
    }
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    .item {
      padding: 1px;
      margin: 3px 5px;
    }
  }
  .content {
    .user {
      display: flex;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .profile {
        .date {
          margin-top: 3px;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .desc {
      font-size: 12px;
      line-height: 16px;
      color: #333;
      margin-top: 16px;
    }
  }
}
</style>