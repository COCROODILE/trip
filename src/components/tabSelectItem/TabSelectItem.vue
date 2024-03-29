<script setup>
const props = defineProps({
  label:{
    type: String,
    default: ''
  },
  active:{
    type: Boolean,
    default: false
  },
  type:{
    type: String,
    default: 'default' // default / primary / pink / gray
  }
})

const emit = defineEmits(['tagClick'])
const handleItemClick = () => {
  emit('tagClick', props.label)
}
</script>

<template>
  <div :class="['tab-select-item', type, active ? 'active' : '']"
   @click="handleItemClick">
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



.tab-select-item.active,
.tab-select-item.primary {
  color: var(--primary-color);
  &::before {
    // border-top: v-bind("props.borderWidth") solid var(--primary-color);
    // border-right: v-bind("props.borderWidth") solid var(--primary-color);
    // border-bottom: v-bind("props.borderWidth") solid var(--primary-color);
    // border-left: v-bind("props.borderWidth") solid var(--primary-color);

    border: 1px solid var(--primary-color);
  }
}

.tab-select-item.pink {
  color: #333;
  background-color: #fff4ec;
  padding: 0px 12px;
  margin-bottom: 6px;
  margin-left: 5px;
}
.tab-select-item.gray {
  color: #333;
  background-color: rgb(240, 243, 246);
  padding: 0px 12px;
  margin-bottom: 6px;
  margin-left: 10px;
}
</style>