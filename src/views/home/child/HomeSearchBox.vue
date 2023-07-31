<script setup>
import { useRouter } from 'vue-router';

// 获取位置
const positionClick = () => {
  navigator.geolocation.getCurrentPosition((res) => {
    console.log('获取位置成功', res);

  }, err => {
    console.log('获取位置失败', err);
  })
}

const router = useRouter()

// 选择城市
const cityClick = () => {
  router.push('/city')
}
</script>

<template>
  <div class="search-box">
    <div class="location">
      <div class="city" @click="cityClick">广州</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.search-box{
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
}
</style>