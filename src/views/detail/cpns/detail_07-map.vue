<template>
  <div class="map">
    <detail-section header-text="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="baiduRef"></div>
    </detail-section>
  </div>
</template>

<script setup name="map">
import { ref, onMounted } from 'vue'
import DetailSection from '@/components/detail-section/detail-section.vue'

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const baiduRef = ref()
const map = ref()

function initMap() {
  try {
    map.value = new BMapGL.Map(baiduRef.value)
    let point = new BMapGL.Point(
      props.position.longitude,
      props.position.latitude
    )

    map.value.centerAndZoom(point, 20)
    const marker = new BMapGL.Marker(point)
    map.value.addOverlay(marker)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>
.baidu {
  width: 100%;
  height: 200px;
}
</style>
