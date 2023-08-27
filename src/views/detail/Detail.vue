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
    </div>
  </div>
</template>

<style scoped lang="less"></style>
