<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useDetail from "@/stores/modules/detail";
import { storeToRefs } from "pinia";

import DetailSwipe from './child/DetailSwipe.vue'
import DetailInfos from "./child/DetailInfos.vue";
import DetailFacility from './child/DetailFacility.vue'
import DetailLandlord from './child/DetailLandlord.vue'
import DetailComment from "./child/DetailComment.vue";
import DetailNotice from "./child/DetailNotice.vue";
import DetailMap from "./child/DetailMap.vue";
import DetailIntro from './child/DetailIntro.vue'


const route = useRoute();

const router = useRouter();

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back();
};

// 发送网络请求获取数据
const houseId = route.params.id;
const detailStore = useDetail();
detailStore.fetchDetailInfos(houseId);

const { detailInfos } = storeToRefs(detailStore);
// const mainPart = detailInfos.value.mainPart
const mainPart = computed(() => detailInfos.value.mainPart);
</script>

<template>
  <div class="detail top-page">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos :top-infos="mainPart.topModule" />
      <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <detail-landlord :landlord="mainPart.dynamicModule.landlordModule"/>
      <detail-comment :comment="mainPart.dynamicModule.commentModule" />
      <detail-notice :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <detail-map :position="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途，永无止境!</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.footer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img{
    width: 123px;
  }

  .text{
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
