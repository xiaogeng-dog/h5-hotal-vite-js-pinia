<template>
  <div class="detail" ref="detailRef">
    <van-nav-bar
      title="房屋详情"
      left-arrow
      left-text="旅途"
      @click-left="backClick"
    />
    <div class="tabs">
      <tab-control
        v-if="showTabs"
        :titles="['描述', '设施', '房东', '评论', '须知', '周边']"
        @item-click="tabItemClick"
      />
    </div>
    <div class="content" v-if="infos.mainPart" v-memo="[infos.mainPart]">
      <detail-swiper
        :swiper-data="infos.mainPart.topModule.housePicture.housePics"
      />
      <detail-infos
        :ref="getContentRef"
        :top-module="infos.mainPart.topModule"
      />
      <detail-facility
        :ref="getContentRef"
        :house-facility="
          infos.mainPart.dynamicModule.facilityModule.houseFacility
        "
      />
      <detail-landloard
        :ref="getContentRef"
        :landlord="infos.mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        :ref="getContentRef"
        :comment="infos.mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        :ref="getContentRef"
        :order-rules="infos.mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map
        :ref="getContentRef"
        :position="infos.mainPart.dynamicModule.positionModule"
      />
      <detail-intro :intro="infos.mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
    <detail-action-bar :current-house="infos.currentHouse" />
  </div>
</template>

<script setup name="detail">
import DetailSwiper from './cpns/detail_01-swiper.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandloard from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from './cpns/detail_07-map.vue'
import DetailIntro from './cpns/detail_08-intro.vue'
import DetailActionBar from './cpns/detail-action-bar.vue'
import TabControl from '@/components/tab-control/tab-control.vue'
import { useRoute, useRouter } from 'vue-router'

import { getDetailInfos } from '@/service/modules/detail'
import { ref } from 'vue'
import useScroll from '@/hooks/useScroll'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const houseId = route.params.id

const infos = ref({})
getDetailInfos(houseId).then((res) => {
  infos.value = res.data
})

const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabs = computed(() => {
  console.log(scrollTop.value)
  return scrollTop.value >= 300
})

const contentEls = []
const getContentRef = (el) => {
  if (el) contentEls.push(el.$el)
}
const tabItemClick = (index) => {
  console.log('index:', index, contentEls)
  detailRef.value.scrollTo({
    top: contentEls[index].offsetTop - 44,
    behavior: 'smooth'
  })
}

function backClick() {
  router.back()
}
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  padding-bottom: 60px;
  background-color: #fff;
  overflow-y: auto;

  &:deep(.van-nav-bar__left) {
    font-size: 16px;
    font-weight: 600;
  }
}

.tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
