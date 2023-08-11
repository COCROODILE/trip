<script setup>
import useMain from "@/stores/modules/main";
import { formatMonthDay } from "@/utils/format_date";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const mainStore = useMain()
const { startDate, endDate } = storeToRefs(mainStore)
const startDateStr = computed(() => formatMonthDay(startDate.value, "MM.DD"))
const endDateStr = computed(() => formatMonthDay(endDate.value, "MM.DD"))

</script>

<template>
  <div class="search">
    <div class="select-time">
      <div class="start">
        <span class="name">住</span>
        <span class="date">{{ startDateStr }}</span>
      </div>
      <div class="end">
        <span class="name">离</span>
        <span class="date">{{ endDateStr }}</span>
      </div>
    </div>
    <div class="content">
      <div class="keyword">关键字/位置/民宿</div>
    </div>
    <div class="right">
      <van-icon name="search" size="20" />
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 45px;
  line-height: 45px;
  padding: 0 10px;
  font-size: 14px;
  color: #999;
  border-radius: 6px;
  background-color: #f2f4f6;

  .left{
    font-weight: 500;
    min-width: 30px;
    font-size: 14px;
    padding-right: 6px;
    margin-right: 5px;
    border-right: 1px solid #fff;
    color: #333;
  }

  .select-time{
    margin-right: 5px;
    .start, .end{
      // display: flex;
      height: 16px;
      line-height: 16px;
      padding: 0;
      margin: 0;
    }
  }

  .content{
    position: relative;
    flex: 1;
    padding: 0 6px;
    text-align: left;
    border-left: 1ps solid #fff;

    .keyword{
      max-width: 155px;
      font-size: 12px;
    }

    // .icon-cancel {
    //   position: absolute;
    //   top: 30%;
    //   right: 0;
    //   display: inline-block;
    //   background-image: url('../../assets/img/sprite.png');
    //   background-position: -92px -58.5px;
    //   width: 14.5px;
    //   height: 14.5px;
    //   background-size: 125px 110px;
    // }
  }
}
</style>