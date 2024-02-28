<template>
  <div class="home" ref="pageEl">
    <van-nav-bar title="弘源旅途"></van-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <search-box />
    <div class="content">
      <category-list />
      <house-area />
    </div>
  </div>
  <div v-show="showSearchBar" class="home-top">
    <search-bar
      :start-date="formatMonthDay(startDate)"
      :end-date="formatMonthDay(endDate)"
      height="45px"
      key-word-font-size="14px"
      :search-icon="true"
      key-word="关键字/位置/民宿"
      @search-click="handleSearchClick"
    ></search-bar>
  </div>
</template>

<script setup>
import { ref, computed, onActivated, onDeactivated } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { formatMonthDay } from '@/utils/format_date'
import useReachBottom from '@/hooks/useReachBottom'
import SearchBox from './cpns/search-box.vue'
import CategoryList from './cpns/category-list.vue'
import HouseArea from './cpns/house-area.vue'

import useCityStore from '@/store/modules/city'
import useMainStore from '@/store/modules/main'
import useHomeStore from '@/store/modules/home'
import useScroll from '@/hooks/useScroll'
const router = useRouter()

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
// 日期范围的处理
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

// 监听点击
// function itemClick(houseId) {
//   console.log('itemClick', houseId)
//   router.push({
//     path: '/detail/' + houseId
//   })
// }
const handleSearchClick = () => {
  router.push({
    path: '/search',
    query: {
      address: currentCity.value.cityName,
      cityId: 45,
      startDate: formatMonthDay(startDate.value),
      endDate: formatMonthDay(endDate.value)
    }
  })
}

// 监听达到底部
const pageEl = ref()
useReachBottom(() => {
  homeStore.fetchHouselistData()
})

// 监听页面的滚动
const { scrollTop } = useScroll()
const showSearchBar = computed(() => {
  return scrollTop.value >= 350
})

onActivated(() => {
  window.scrollTo({
    top: scrollTop.value
  })
})
onDeactivated(() => {})
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
}

.banner {
  img {
    width: 100%;
  }
}

.content {
  margin-top: 20px;
  background-color: #f5f7f9;
}

.home-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 16px 10px 16px;
  background-color: white;
  z-index: 100;
}
</style>
