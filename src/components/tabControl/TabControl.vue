<script setup>
import { ref } from "vue";

defineProps({
  titles: {
    type: Array,
    default: () => ({}),
  },
});

const emit = defineEmits(["tabClick"]);

const currentIndex = ref(0);

const tabClick = (index) => {
  currentIndex.value = index;
  emit("tabClick", index);
};
</script>

<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="index">
      <div class="item">
        <span
          @click="tabClick(index)"
          :class="{ active: currentIndex === index }"
          >{{ item }}</span
        >
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.tab-control {
  display: flex;
  height: 44px;
  line-height: 44px;
  background-color: #fff;
  .item {
    flex: 1;
    text-align: center;
    span {
      font-size: 12px;
      padding: 10px;

      &.active {
        color: var(--primary-color);
        border-bottom: 1px solid var(--primary-color);
      }
    }
  }
}
</style>