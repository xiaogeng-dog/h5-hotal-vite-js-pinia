<template>
  <div class="house-area">
    <h2 class="title">热门精选</h2>
    <div class="house-list">
      <template v-for="item in houselist" :key="item.data.houseId">
        <house-item-v1
          v-if="item.discoveryContentType === 3"
          :item-data="item.data"
          @click="itemClick(item.data.houseId)"
        />
        <house-item-v2
          v-else-if="item.discoveryContentType === 9"
          :item-data="item.data"
          @click="itemClick(item.data.houseId)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import HouseItemV1 from '@/components/house-item-v1/index.vue'
import HouseItemV2 from '@/components/house-item-v2/index.vue'
import useHomeStore from '@/store/modules/home'
import { storeToRefs } from 'pinia'

const router = useRouter()

const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

// 监听点击
function itemClick(houseId) {
  console.log('itemClick', houseId)
  router.push({
    path: '/detail/' + houseId
  })
}
</script>

<style lang="less" scoped>
.house-area {
  .title {
    margin: 20px 0 0 20px;
  }

  .house-list {
    display: flex;
    flex-wrap: wrap;
    // margin-top: 8px;
    padding: 8px;
  }
}
</style>
