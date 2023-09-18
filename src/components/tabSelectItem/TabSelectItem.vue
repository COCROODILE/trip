<script setup>
const props = defineProps({
  label:{
    type: String,
    default: ''
  },
  active:{
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['tagClick'])
const handleItemClick = () => {
  emit('tagClick', props.label)
}
</script>

<template>
  <div :class="['tab-select-item', active ? 'active' : '']" @click="handleItemClick">
    {{ label }}
  </div>
</template>

<style scoped lang="less">
.tab-select-item{
  display: inline-block;
  margin: 0 5px;
  // height: 25px;
  border-radius: 12px;
  font-size: 12px;
  background-color: #fff;
  padding: 6px 8px;
  color: #666;
  border: 1px solid #f2f3f5;
}

.active{
  color: var(--primary-color);
}
</style>