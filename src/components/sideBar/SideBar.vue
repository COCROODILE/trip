<script setup>
import { ref } from "vue";

defineProps({
  sideDatas: {
    type: Array,
    default: () => [],
  },
});

const active = ref(0);

const subActive = ref(0);
const onChange = (index) => {
  console.log(`标签名 ${index + 1}`)
};
</script>

<template>
  <div class="side-bar">
    <van-sidebar v-model="active">
      <template v-for="(item, index) in sideDatas" :key="index">
        <van-sidebar-item :title="item.label" />
      </template>
    </van-sidebar>
    <div class="content">
      <!-- 如果没有二级菜单 -->
      <template
        v-for="(item, index) in sideDatas[active].items"
        :key="index"
        v-if="sideDatas[active].items"
      >
        <div class="list-item">
          <div class="name">{{ item.label }}</div>
          <span class="desp" v-if="item.percentageUser">{{ item.percentageUser }}</span>
        </div>
      </template>

      <!-- 如果有二级菜单 -->
      <template v-if="sideDatas[active].subGroups.length">
        <div class="sub-side-panel">
          <van-sidebar v-model="subActive" @change="onChange" class="sub-sidebar">
            <template
              v-for="(item, index) in sideDatas[active].subGroups"
              :key="index"
            >
              <van-sidebar-item :title="item.label" />
            </template>
          </van-sidebar>

          <div class="secondary-content">
            <template
              v-for="(group, index) in sideDatas[active].subGroups[subActive]
                .items"
              :key="index"
            >
              <div class="list-item">
                <div class="name">{{ group.label }}</div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
@popupHeight: 500px;

.side-bar :deep(.van-sidebar) {
  height: calc(@popupHeight - 60px);
}

.side-bar {
  display: flex;
  // overflow-y: auto;

  .content {
    flex: 1;
    overflow-y: auto;
    height: calc(@popupHeight - 60px);

    .list-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 55px;
      margin-left: 20px;
      padding: 2px 0;

      .name {
        margin-bottom: 6px;
      }

      .desp {
        color: #999;
        font-size: 12px;
      }
    }

    .sub-side-panel {
      display: flex;
    }
  }
}
</style>