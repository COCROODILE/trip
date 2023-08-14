<script setup>
import DetailSection from '@/components/detailSection/DetailSection.vue'

defineProps({
  houseFacility:{
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="facility">
    <detail-section title="房屋设施" more-text="查看全部设施">
      <div class="facility-inner">
        <template v-for="(item, index) in houseFacility.houseFacilitys" :key="index">
          <div class="item" v-if="houseFacility.facilitySort.includes(index)">
            <div class="head">
              <img :src="item.icon" alt="">
              <div class="text">{{ item.groupName }}</div>
            </div>
            <div class="list">
              <template v-for="(iten, indey) in item.facilitys.slice(0, 4)" :key="indey">
                <div class="iten" >
                  <i class="icon_check icon"></i>
                  <span>{{ iten.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </detail-section>
  </div>
</template>

<style scoped lang="less">
.facility{
  .facility-inner{
    padding: 5px 0;
    border-radius: 6px;
    font-size: 12px;
    background-color: #f7f9fb;

    .item{
      display: flex;
      margin: 25px 0;

      .head{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 10px;
        width: 20%;
        img{
          width: 25px;
          height: 25px;
          margin-bottom: 5px;
        }
        .text{
          font-size: 12px;
        }
      }

      .list{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .iten{
          display: flex;
          width: 50%;
          .icon{
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
