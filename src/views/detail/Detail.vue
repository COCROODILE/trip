<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useDetail from "@/stores/modules/detail";
import { storeToRefs } from "pinia";
import useScroll from "@/hooks/useScroll";

import TabControl from "@/components/tabControl/TabControl.vue";

import DetailSwipe from "./child/DetailSwipe.vue";
import DetailInfos from "./child/DetailInfos.vue";
import DetailFacility from "./child/DetailFacility.vue";
import DetailLandlord from "./child/DetailLandlord.vue";
import DetailComment from "./child/DetailComment.vue";
import DetailNotice from "./child/DetailNotice.vue";
import DetailMap from "./child/DetailMap.vue";
import DetailIntro from "./child/DetailIntro.vue";

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

const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => {
  return scrollTop.value > 300;
});

// const sectionEls = []
// const getSectionRef = (ref) => {
//   // console.log(ref.$el);
//   sectionEls.push(ref.$el)
// }

const sectionEls = ref({})
const getSectionRef = (ref) => {
  // console.log(ref.$el.getAttribute('name'));
  if(!ref) return
  const name = ref.$el.getAttribute('name')
  sectionEls.value[name] = ref.$el
}

const names = computed(() => {
  return Object.keys(sectionEls.value)
})

const tabClick = (index) => {
  // let distance = sectionEls[index].offsetTop
  // if(index !== 0) distance = distance - 44
  // detailRef.value.scrollTo({
  //   top: distance,
  //   behavior: 'smooth'
  // })

  // console.log(sectionEls.value[names.value[index]].offsetTop);
  let distance = sectionEls.value[names.value[index]].offsetTop
  if(index !== 0) distance = distance - 44
  detailRef.value.scrollTo({
    top: distance,
    behavior: 'smooth'
  })
};

//页面滚动，滚动时匹配对应的tabControl的index
const tabControlRef = ref()
watch(scrollTop, (newTop) => {
  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value)
  const offsetTops = els.map(el => el.offsetTop)
  // console.log(offsetTops);

  // 2.根据newTop去匹配想要的index
  let index = offsetTops.length - 1
  for(let i = 0; i < offsetTops.length; i++){
    if(offsetTops[i] > newTop + 44){
      index = i - 1
      break;
    }
  }

  // console.log(index);
  // console.log(tabControlRef.value.currentIndex);
  if(tabControlRef.value.currentIndex !== index) tabControlRef.value?.currentIndex = index
})

</script>

<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      :titles="names"
      class="tabs"
      v-show="showTabControl"
      @tabClick="tabClick"
      ref="tabControlRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />
      <detail-facility name="设施" :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
      <detail-notice name="须知" :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途，永无止境!</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
