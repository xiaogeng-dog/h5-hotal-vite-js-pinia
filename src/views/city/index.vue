<template>
  <div class="city">
    <div class="top">
      <!-- <van-sticky class="sticky"> -->
      <van-search
        v-model="searchValue"
        shape="round"
        placeholder="城市/区域/位置"
        show-action
        @cancel="cancelClick"
      />
      <van-tabs v-model:active="currentName">
        <template v-for="(item, key, index) in allCity" :key="index">
          <van-tab :title="item.title" :name="key"></van-tab>
        </template>
      </van-tabs>
      <!-- </van-sticky> -->
    </div>
    <div class="content">
      <template v-for="(item, key, index) in allCity" :key="index">
        <city-list v-show="key === currentName" :city-data="item" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useCityStore from '@/store/modules/city'
import CityList from './cpns/city-list.vue'

const searchValue = ref()
const currentName = ref()

const cityStore = useCityStore()
const { allCity } = storeToRefs(cityStore)
cityStore.fetchAllCityData()

const router = useRouter()
const cancelClick = () => {
  router.back()
}
</script>

<style lang="less" scoped>
.city {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;

  .top {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 104px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
  }
}
</style>
