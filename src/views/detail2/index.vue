<template>
  <div class="detail">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="backClick"
    />
    <detail-swipe :house-pics="topModule?.housePicture?.housePics" />

    <div class="content" v-if="infos.mainPart">
      <house-info :top-module="topModule" />
      <facility-area
        :house-facility="dynamicModule?.facilityModule?.houseFacility"
      />
      <landlord-area :landlord="dynamicModule?.landlordModule" />
      <comment-area :comment="dynamicModule?.commentModule" />
      <rules-area :rules="dynamicModule?.rulesModule" />
      <action-bar :current-house="currentHouse" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfo } from '@/service'
import DetailSwipe from './cpns/detail_01-swipe.vue'
import HouseInfo from './cpns/detail_02-info.vue'
import FacilityArea from './cpns/detail_03-facility.vue'
import LandlordArea from './cpns/detail_04-landlord.vue'
import CommentArea from './cpns/detail_05-comment.vue'
import RulesArea from './cpns/rules-area.vue'
import ActionBar from './cpns/action-bar.vue'

const route = useRoute()
const router = useRouter()

const infos = ref({})
getDetailInfo(route.params.id).then((res) => {
  infos.value = res.data
})
const topModule = computed(() => infos.value?.mainPart?.topModule)
const dynamicModule = computed(() => infos.value?.mainPart?.dynamicModule)
const currentHouse = computed(() => infos.value?.currentHouse)

function backClick() {
  router.back()
}
</script>

<style lang="less" scoped>
.detail {
  height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 9;
  background-color: #f5f7fa;
  padding-bottom: 65px;
}
</style>
