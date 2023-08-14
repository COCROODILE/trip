<script setup>
import DetailSection from '@/components/detailSection/DetailSection.vue'
defineProps({
  landlord:{
    type:Object,
    default:() => ({})
  }
})
</script>

<template>
  <div class="land-lord">
    <detail-section title="房东介绍" more-text="查看房东介绍">
      <div class="intro">
        <div class="top">
          <img :src="landlord?.topScroll" alt="">
        </div>
        <div class="header">
          <div class="left">
            <div class="avatar">
              <img :src="landlord?.hotelLogo" alt="">
            </div>
            <div class="info">
              <div class="name">{{ landlord.hotelName }}</div>
              <div class="tags">
                <template v-for="(item, index) in landlord.hotelTags" :key="index">
                  <div class="item" :style="{ color: item.tagText.color }">
                    <span>{{ item.tagText.text }}</span>
                    <span v-if="index !== landlord.hotelTags.length - 1"
                     class="divider">|</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </detail-section>
  </div>
</template>

<style scoped lang="less">
.intro{
  .top{
    img{
      width: 100%;
      border-radius: 3px;
    }
  }

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>