<template>
  <div class="city-list">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="hot">
        <template v-for="(item, index) in cityData.hotCities" :key="index">
          <div class="item">{{ item.cityName }}</div>
        </template>
      </div>
      <template v-for="item in cityData.cities" :key="item">
        <van-index-anchor :index="item.group" />
        <template v-for="iten in item.cities" :key="iten">
          <van-cell :title="iten.cityName" @click="selectIten(iten)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import useCityStore from '@/store/modules/city'
import { useRouter } from 'vue-router'

const props = defineProps({
  cityData: {
    type: Object,
    default: () => ({})
  }
})

const indexList = computed(() => {
  const indexs = props.cityData.cities.map((item) => item.group)
  indexs.unshift('#')
  return indexs
})

const cityStore = useCityStore()
const router = useRouter()
const selectIten = (item) => {
  cityStore.currentCity = item
  router.back()
}
</script>

<style lang="less" scoped>
.hot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
  padding-right: 20px;

  .item {
    width: 70px;
    height: 28px;
    text-align: center;
    border-radius: 14px;
    line-height: 28px;
    font-size: 12px;
    background-color: #fff4ec;
    margin: 6px;
  }
}
</style>
