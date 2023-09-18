<script setup>
import useFavor from "@/stores/modules/favor";
import { storeToRefs } from "pinia";

import SearchListItem from "@/components/searchListItem/SearchListItem.vue";
import { ref } from "vue";

const favorStore = useFavor();

favorStore.fetchFavorListData();
favorStore.fecthHistoryListData()
const { favorList, historyList } = storeToRefs(favorStore);

const active = ref(0);
const activeName = ref("house");

const landlordList = ref([]);
</script>

<template>
  <div class="favor">
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar">
      <template #title>
        <van-tabs v-model:active="active" type="card">
          <van-tab title="我的收藏"></van-tab>
          <van-tab title="浏览历史"></van-tab>
        </van-tabs>
      </template>
      <template #right>
        <van-icon name="wap-nav" size="24" />
      </template>
    </van-nav-bar>

    <!-- 我的收藏： 房屋 - 房东 -->
    <div v-if="active === 0">
      <van-tabs v-model:active="activeName" class="tabs">
        <van-tab title="房屋" name="house">
          <div class="content">
            <template v-for="(item, index) in favorList.items" :key="index">
              <search-list-item :item-data="item" />
            </template>
          </div>
        </van-tab>
        <van-tab title="房东" name="landlord">
          <div class="content">
            <!-- 内容 -->
            <div class="list" v-if="landlordList.length"></div>

            <div v-else class="empty-data">
              <img
                src="@/assets/img/favor/empty_favorite.44731802.png"
                alt=""
              />
              <div class="name">暂无收藏</div>
              <div class="desc">
                点击
                <img src="@/assets/img/favor/favor.png" alt="" class="icon" />
                即可收藏对应的房东
              </div>
              <div class="btn">随便去逛逛</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 浏览历史 -->
    <div v-else-if="active === 1" class="history">
      <div class="content">
        <template v-for="(item, index) in historyList.items" :key="index">
          <search-list-item :item-data="item" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.favor {
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .tabs {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
  }
  .content {
    padding: 10px 20px 55px 20px;
    background-color: rgb(247, 248, 251);
    height: calc(100vh - 89px - 49px);
    overflow-y: scroll;

    .empty-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 100%;
      }

      .name {
        color: #333;
        font-size: 18px;
        font-weight: 500;
        line-height: 27px;
      }

      .desc {
        color: #666;
        line-height: 18px;
        font-size: 14px;
        margin: 7px auto 36px;

        img {
          width: 12px;
          position: relative;
          top: 4px;
        }
      }

      .btn {
        padding: 0 38px;
        height: 40px;
        line-height: 40px;
        background-color: var(--primary-color);
        color: #fff;
        border-radius: 20px;
      }
    }

    
  }

  .history{
      position: relative;
      top: 46px;
    }
}
</style>