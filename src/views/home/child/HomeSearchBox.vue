<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCity from "@/stores/modules/city";
import { formatMonthDay } from '@/utils/format_date'

// 获取位置
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取位置成功", res);
    },
    (err) => {
      console.log("获取位置失败", err);
    }
  );
};

const router = useRouter();

// 选择城市
const cityClick = () => {
  router.push("/city");
};

// 回显选择的城市
const cityStore = useCity();
const { currentCity } = storeToRefs(cityStore);

// 日期范围
const nowDate = new Date()
const startDate = ref(formatMonthDay(nowDate));
const endDate = ref(formatMonthDay(nowDate.setDate(nowDate.getDate() + 1)));
</script>

<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="date-range">
      <div class="start">
        <span class="tip">入住</span>
        <span class="time">{{ startDate }}</span>
      </div>
      <div class="stay">
        <span>共一晚</span>
      </div>
      <div class="end">
        <span class="tip">离店</span>
        <span class="time">{{ endDate }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.search-box {
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 22px;

    .city {
      flex: 1;
      color: #333;
    }

    .position {
      width: 74px;
      display: flex;
      align-items: center;

      .text {
        font-size: 12px;
        color: #666;
      }

      img {
        width: 18px;
        height: 18px;
        margin-left: 5px;
        margin-top: -4px;
      }
    }
  }

  .date-range {
    display: flex;
    padding: 0 22px;
    height: 44px;
    align-items: center;
    font-size: 12px;
    color: #666;
    border: 1px solid red;

    .start,
    .stay,
    .end {
      flex: 1;
    }
    .stay {
      text-align: center;
    }

    .end {
      text-align: right;
    }
  }
}
</style>
