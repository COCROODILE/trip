<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCity from "@/stores/modules/city";
import useHome from "@/stores/modules/home";
import useMain from "@/stores/modules/main";
import { formatMonthDay, getDiffDays } from "@/utils/format_date";

// 回显选择的城市
const cityStore = useCity();
const { currentCity } = storeToRefs(cityStore);

// 获取位置
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取位置成功", res);
      const latitude = res.coords.latitude; //十进制纬度
      const longitude = res.coords.longitude; //十进制经度
      // currentCity.value.cityName = res.coords
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

// 日期范围
const mainStore = useMain();
const { startDate, endDate } = storeToRefs(mainStore);

//获取好时间后再进行格式化
const startDateStr = computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));

const stayCount = ref(getDiffDays(startDate.value, endDate.value));

const showCalendar = ref(false);
const calendarClick = () => {
  showCalendar.value = true;
};
const onConfirm = (values) => {
  const [start, end] = values;
  startDate.value = start;
  endDate.value = end;
  stayCount.value = getDiffDays(start, end);
  // console.log(`${start} - ${end}`)
  // 隐藏日历
  showCalendar.value = false;
};

// 热门建议
const homeStore = useHome();
const { hotSuggest } = storeToRefs(homeStore);

const suggestClick = (item) => {
  // console.log(item.tagText.text)
  router.push({
    path: '/search',
    query: {
      keyword: item.tagText.text
    }
  })
}

const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
};

defineExpose({
  searchBtnClick
})
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
    <div class="date-range" @click="calendarClick">
      <div class="start">
        <span class="tip">入住</span>
        <span class="time">{{ startDateStr }}</span>
      </div>
      <div class="stay">
        <span>共{{ stayCount }}晚</span>
      </div>
      <div class="end">
        <span class="tip">离店</span>
        <span class="time">{{ endDateStr }}</span>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round="false"
      @confirm="onConfirm"
      :show-confirm="false"
    />

    <!-- 关键字 -->
    <div class="keyword">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="hot-suggest">
      <template v-for="(item, index) in hotSuggest" :key="index">
        <div
          class="text"
          :style="{
            background: item.tagText.background.color,
            color: item.tagText.color,
          }"
          @click="suggestClick(item)"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 热门搜索按钮 -->
    <div class="search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.search-box {
  padding: 0 22px;

  --van-calendar-popup-height: 100%;
  .location {
    display: flex;
    align-items: center;
    height: 44px;

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
    height: 44px;
    align-items: center;
    font-size: 12px;
    color: #666;

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

  .keyword {
    font-size: 12px;
    color: #333;
  }

  .hot-suggest {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    .text {
      font-size: 12px;
      margin: 3px 5px;
      padding: 4px 8px;
      border-radius: 5px;
    }
  }

  .search-btn {
    .btn {
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-weight: 500;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      background-image: var(--theme-linear-gradient);
    }
  }
}
</style>
