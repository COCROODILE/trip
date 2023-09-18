<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
const onClickLeft = () => {
  router.back()
}
</script>

<template>
  <div class="message">
    <!-- 导航栏 -->
    <van-nav-bar title="消息中心" left-arrow  @click-left="onClickLeft">
      <template #right>
        <van-icon name="wap-nav" size="24" />
      </template>
    </van-nav-bar>

    <div class="content">
      <img src="@/assets/img/message/icon_message.png" alt="">
      <div class="text">暂无聊天消息</div>
    </div>
  </div>
</template>


<style scoped lang="less">
.message{
  --van-nav-bar-title-text-color: var(--primary-color);

  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    img{
      width: 100%;
    }
  }
}
</style>