<script setup>
const emit = defineEmits(['clear', 'viewClick'])
const clear = () => {
  emit('clear')
}

const hanledViewHouse = () => {
  emit('viewClick')
}
</script>

<template>
  <div class="house-btns">
    <van-button round color="#f3f4f6" class="clear" @click="clear">清空</van-button>
    <van-button color="#ff9854" round class="view-house" 
    @click="hanledViewHouse">
      查看房屋(220套)
    </van-button>
  </div>
</template>

<style scoped lang="less">
.house-btns {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .clear {
    width: 85px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #dadada !important;
  }

  .view-house {
    width: 240px;
    height: 40px;
  }
}
</style>