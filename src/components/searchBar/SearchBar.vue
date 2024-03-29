<script setup>
// import { computed } from "vue";
// import useMain from "@/stores/modules/main";
// import { formatMonthDay } from "@/utils/format_date";
// import { storeToRefs } from "pinia";

// const mainStore = useMain()
// const { startDate, endDate } = storeToRefs(mainStore)
// const startDateStr = computed(() => formatMonthDay(startDate, "MM.DD"))
// const endDateStr = computed(() => formatMonthDay(endDate, "MM.DD"))

const props = defineProps({
  title:{
    type: String,
    default:''
  },
  isHaveSearchBtn:{
    type: Boolean,
    default: false
  },
  startDate:{
    type: String,
    default: '00.00'
  },
  endDate:{
    type: String,
    default: '00.00'
  },
  keyword:{
    type: String,
    default: ''
  },
  showCancelIcon:{
    type: Boolean,
    default: false
  },
  cityName: {
    type: String,
    default: '广州'
  }
})

const emit = defineEmits(['searchClick', 'cancelClick'])

const handleSearchClick = () => {
  emit('searchClick')
}

// 取消图片的点击
const handleCancleClick = () => {
  emit('cancelClick')
}
</script>

<template>
  <div class="search">
    <div class="left" v-if="title">
      <slot name="left">
        <span>{{ cityName }}</span>
      </slot>
    </div>
    <div class="select-time">
      <div class="start">
        <span class="name">住</span>
        <span class="date">{{ startDate }}</span>
      </div>
      <div class="end">
        <span class="name">离</span>
        <span class="date">{{ endDate }}</span>
      </div>
    </div>
    <div class="content" @click="handleSearchClick">
      <slot name="content">
        <div class="keyword">{{ keyword }}</div>
        <!-- .stop阻止冒泡事件，不让当前元素的事件继续往外触发 -->
        <i class="icon-cancel" @click.stop="handleCancleClick" 
        v-if="showCancelIcon"></i>
      </slot>
    </div>
    <div class="right">
      <slot name="right">
        <van-icon name="search" size="20"  v-if="isHaveSearchBtn"/>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
  font-size: 14px;
  color: #999;
  border-radius: 6px;
  background-color: #f2f4f6;

  .date{
    color: #333;
    margin-left: 2px;
    font-size: 12px;
  }

  .left{
    // font-weight: 500;
    min-width: 30px;
    font-size: 14px;
    padding-right: 6px;
    margin-right: 5px;
    border-right: 1px solid #fff;
    color: #333;
  }

  .select-time{
    margin-right: 5px;
    padding-right: 5px;
    border-right: 1px solid #fff;
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

    .icon-cancel {
      position: absolute;
      top: 30%;
      right: 0;
      display: inline-block;
      background-image: url('../../assets/img/sprite.png');
      background-position: -92px -58.5px;
      width: 14.5px;
      height: 14.5px;
      background-size: 125px 110px;
    }
  }
}
</style>