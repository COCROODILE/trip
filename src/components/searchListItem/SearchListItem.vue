<script setup>
defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="search-list-item">
    <div class="swiper-wrapper">
      <!-- 图片 -->
      <img :src="itemData.defaultPicture" class="banner" alt="" />

      <div class="bottom">
        <div class="msg-tip">
          <strong class="score"
            >{{ itemData.commentBriefForCD.overall }}分</strong
          >
          <div class="answer">
            {{ itemData.commentBriefForCD.commentBrief }}
          </div>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="side-bar">
        <div class="tool-bar">
          <img :src="itemData.logoUrl" class="avatar" alt="fail" />
          <div class="collection">
            <img
              class="img"
              src="../../assets/img/search/tj-mob-ui_unit-item_collected-new.png"
              alt=""
            />
            <span>{{ itemData.preloadHouse.favoriteCount }}</span>
          </div>
          <div class="comment">
            <img
              class="img"
              src="../../assets/img/search/tj-mob-ui_unit-item_comment-new.png"
              alt=""
            />
            <span>{{ itemData.preloadHouse.totalCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="info">
        <van-tag color="#3f4954" text-color="#fff">{{
          itemData.address
        }}</van-tag>
        <span class="name">{{ itemData.unitSummeries[0].text }}</span>
        <span class="desc">{{ itemData.unitSummeries[1].text }}</span>
      </div>
      <div class="title">{{ itemData.unitName }}</div>
      <div class="tags">
        <template v-for="(tag, index) in itemData.houseTags" :key="index">
          <van-tag
            :color="tag.background.color"
            :text-color="tag.color"
            class="tag"
            >{{ tag.text }}</van-tag
          >
        </template>
      </div>
      <div class="price">
        <span class="real-price">￥{{ itemData.finalPrice }}</span>
        <span class="old-price">￥{{ itemData.productPrice }}</span>
        <van-tag
          round
          class="discount"
          v-if="itemData.priceTipBadge"
          color="rgb(251, 74, 74)"
          :text-color="itemData.priceTipBadge.color"
          >{{ itemData.priceTipBadge.text }}</van-tag
        >
      </div>
      <div v-if="itemData.promoContent" class="footer">
        <van-tag round color="transparent" text-color="#f66">{{
          itemData.promoContent
        }}</van-tag>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.search-list-item {
  margin: 10px 0;

  .swiper-wrapper {
    position: relative;

    .banner {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .bottom {
      position: absolute;
      bottom: 15px;
      left: 10px;
      right: 10px;

      .msg-tip {
        display: flex;
        max-width: 55%;
        padding-left: 6px;
        background-color: hsla(0, 0%, 100%, 0.9);
        align-items: center;
        border-radius: 10px;

        .score {
          font-size: 14px;
          transform: scale(0.8);
          transform-origin: 0 center;
          color: #333;
        }
        .answer {
          border-left: 1px solid #999;
          font-size: 12px;
          padding-left: 6px;
          transform: scale(0.8);
          transform-origin: 0 center;
          color: #666;
        }
      }
    }

    .side-bar {
      position: absolute;
      top: 10px;
      right: 10px;

      .tool-bar {
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: 5px;
          margin-bottom: 5px;
        }

        .collection,
        .comment {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .img {
            width: 30px;
            height: 30px;
          }

          span {
            color: #fff;
          }
        }
      }
    }
  }

  .content {
    .info {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: #666;
      .name {
        position: relative;
        margin: 0 8px;

        &::after {
          content: "";
          position: absolute;
          top: 7px;
          left: 31px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: #666;
        }
      }
    }

    .title {
      font-size: 18px;
      font-weight: 500;
      text-align: justify;
    }
    .tags {
      margin-top: 10px;
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      .tag {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }

    .price {
      .real-price,
      .old-price {
        margin-right: 10px;
      }
      .real-price {
        font-size: 20px;
        font-weight: 500;
        color: var(--primary-color);
      }

      .old-price {
        text-decoration: line-through;
        color: #666;
      }
    }
  }
}
</style>