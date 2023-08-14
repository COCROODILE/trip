<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});

// 对数据进行转换

// 思路一：两次循环
// const swipeGroup = {}
// for(const item of props.swipeData){
//   swipeGroup[item.enumPictureCategory] = []
// }

// for(const item of props.swipeData){
//   const valueArray = swipeGroup[item.enumPictureCategory]
//   valueArray.push(item)
// }

// 思路二：一次循环
const swipeGroup = {};
for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory];

  //第一次循环valueArray是没有值的
  if (!valueArray) {
    valueArray = [];
    swipeGroup[item.enumPictureCategory] = valueArray;
  }

  valueArray.push(item);
}

// 定义转换数据的方法
const nameReg = /【(.*?)】/i;
const getName = (name) => {
  // return name.replace('：', '').replace('【', '').replace('】', '')

  // 使用正则表达匹配
  const results = nameReg.exec(name);
  return results[1];
};

// 动态的页码
const getCategories = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}
</script>

<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>

      <!-- 作用域插槽 -->
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" 
          :key="key">
            <span
              class="item"
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategories(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<style scoped lang="less">
.swipe {
  .swipe-list {
    position: relative;

    .item {
      img {
        width: 100%;
      }
    }

    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;

      .item {
        margin: 0 3px;

        &.active {
          background-color: #fff;
          color: #333;
          border-radius: 5px;
          padding: 0 3px;
        }
      }
    }
  }
}
</style>
