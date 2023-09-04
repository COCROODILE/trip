<script setup>
const props = defineProps({
  label:{
    type: String,
    default: ''
  }
})

const emit = defineEmits(['tagClick'])
const handleItemClick = () => {
  emit('tagClick', props.label)
}
</script>

<template>
  <div class="tab-select-item" @click="handleItemClick">
    {{ label }}
  </div>
</template>

<style scoped lang="less">
.tab-select-item{
  display: inline-block;
  margin: 0 5px;
  // height: 25px;
  border-radius: 10px;
  font-size: 12px;
  background-color: #fff;
  padding: 6px;
  color: #666;
}
</style>