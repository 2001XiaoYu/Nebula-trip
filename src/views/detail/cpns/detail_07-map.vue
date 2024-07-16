<template>
    <div class="map">
      <detail-section title="位置周边" more-text="查看更多周边信息">
        <div class="baidu" ref="mapRef"></div>
      </detail-section>
    </div>
</template>

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue'
import { onMounted, ref } from 'vue';

const props = defineProps({
  position: {
    type: Object,
    default:() => ({})
  }
})

const mapRef = ref()

onMounted(() => {
  var map = new BMapGL.Map(mapRef.value);  //创建地图实例
  var point = new BMapGL.Point(props.position.longitude, props.position.latitude); // 创建点坐标
  map.centerAndZoom(point, 15);   // 初始化地图，设置中心点坐标和地图级别

  const marker = new BMapGL.Marker(point);// 设置具体位置标点
  map.addOverlay(marker)

  var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
  map.addControl(scaleCtrl);
  
  var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
  map.addControl(zoomCtrl);
})

</script>

<style lang="less" scoped>
.baidu {
  height: 250px;
}
</style>