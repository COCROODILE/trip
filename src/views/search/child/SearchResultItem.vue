<script setup>
import { computed } from "vue"

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  itemTypeName: {
    type: String,
    default: ''
  },
  keyword: {
    type: String,
    default: ''
  },
})

const hightLightWord = computed(() => {
  let name = props.name
  if(name){
    // replace(pattern, replacement) 
    // pattern 可以是字符串或 RegExp(正则)
    // replacement 可以是字符串或一个在每次匹配时调用的函数
    name = name.replace(new RegExp(props.keyword, 'ig'), () => {
      return `<font style="color: #ff9645;">${props.keyword}</font>`
    })
  }

  return name
})

const emit = defineEmits(['itemClick'])
const handleItemClick = () => {
  emit('itemClick', { name: props.name, typeName: props.itemTypeName })
}
</script>

<template>
  <div class="search-result-item" @click="handleItemClick">
    <div class="left">
      <div class="address" v-html="hightLightWord"></div>
      <div class="desp">{{ description }}</div>
    </div>
    <div class="right">{{ itemTypeName }}</div>
  </div>
</template>

<style scoped lang="less">
.search-result-item {
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  // padding: 10px;
  margin: 0 20px;

  .left {
    width: 85%;
    .address{
      max-width: 85%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .desp {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }

  .right{
    color: #666;
  }
}
</style>