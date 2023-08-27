<script setup>
import { onMounted, ref } from 'vue';
import DetailSection from '@/components/detailSection/DetailSection.vue';

const props = defineProps({
  position:{
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref()
onMounted(() => {
  const map = new BMapGL.Map(mapRef.value);
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude);
  map.centerAndZoom(point, 15); 
  const marker = new BMapGL.Marker(point);        // 创建标注   
  map.addOverlay(marker);                     // 将标注添加到地图中
})
</script>

<template>
  <div class="map">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<style scoped lang="less">
.baidu{
  width: 100%;
  height: 250px;
}
</style>