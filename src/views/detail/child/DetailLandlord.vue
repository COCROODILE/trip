<script setup>
import DetailSection from "@/components/detailSection/DetailSection.vue";
defineProps({
  landlord: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="land-lord">
    <detail-section title="房东介绍" more-text="查看房东介绍">
      <div class="intro">
        <div class="top">
          <img :src="landlord?.topScroll" alt="" />
        </div>
        <div class="header">
          <div class="left">
            <div class="avatar">
              <img :src="landlord?.hotelLogo" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ landlord.hotelName }}</div>
              <div class="tags">
                <template
                  v-for="(item, index) in landlord.hotelTags"
                  :key="index"
                >
                  <div class="item" :style="{ color: item.tagText.color }">
                    <span>{{ item.tagText.text }}</span>
                    <span
                      v-if="index !== landlord.hotelTags.length - 1"
                      class="divider"
                      >|</span
                    >
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="contact">联系房东</div>
          </div>
        </div>
        <div class="bottom">
          <template v-for="(item, index) in landlord.hotelSummary" :key="index">
            <div class="item">
              <div class="title">{{ item.title }}</div>
              <div class="score">{{ item.introduction }}</div>
              <div class="desc">{{ item.tip }}</div>
            </div>
          </template>
        </div>
      </div>
    </detail-section>
  </div>
</template>

<style scoped lang="less">
.intro {
  .top {
    img {
      width: 100%;
      border-radius: 3px;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;

    .left {
      display: flex;
      align-items: center;

      .avatar {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        .name {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 5px;
        }
        .tags {
          display: flex;
          .item {
            .divider {
              padding: 0 5px;
            }
          }
        }
      }
    }

    .right {
      .contact {
        height: 24px;
        line-height: 24px;
        border-radius: 5px;
        padding: 0 12px;
        font-size: 12px;
        color: #fff;
        background-image: linear-gradient(90deg, #fa8c1d, #fcaf3f);
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    margin: 50px 10px 10px;

    .item {
      font-size: 12px;

      .title {
        color: #999;
      }

      .score {
        font-size: 16px;
        margin: 5px 0;
        font-weight: 700;
      }
      .desc {
        color: #333;
      }
    }
  }
}
</style>