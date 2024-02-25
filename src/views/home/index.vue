<template>
  <div class="home" ref="pageEl">
    <van-nav-bar title="弘源旅途"></van-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <search-box :hot-suggests="hotSuggests" />
    <div class="content">
      <category-list :categories="categories" />
      <house-area :houselist="houselist" />
    </div>
  </div>
  <div v-show="showSearchBar" class="home-top">
    <search-bar
      start-date="07.25"
      end-date="07.26"
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
import { useRouter } from 'vue-router'
import useReachBottom from '@/hooks/useReachBottom'
import SearchBox from './cpns/search-box.vue'
import CategoryList from './cpns/category-list.vue'
import HouseArea from './cpns/house-area.vue'
import {
  getHomeHotSuggests,
  getHomeCategories,
  getHomeHouselist
} from '@/service'
import useScroll from '@/hooks/useScroll'
const router = useRouter()
const hotSuggests = ref([])
getHomeHotSuggests().then((res) => {
  hotSuggests.value = res.data
})

const categories = ref([])
getHomeCategories().then((res) => {
  categories.value = res.data
})

let currentPage = 1
const houselist = ref([])
fetchHouseListData()

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
      address: '广州',
      cityId: 45,
      startDate: '07-25',
      endDate: '07-26'
    }
  })
}
function fetchHouseListData() {
  getHomeHouselist(currentPage).then((res) => {
    houselist.value.push(...res.data)
    currentPage++
  })
}

// 监听达到底部
const pageEl = ref()
useReachBottom(() => {
  fetchHouseListData()
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
