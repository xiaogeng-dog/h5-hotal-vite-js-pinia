<template>
  <div class="detail" ref="detailRef">
    <van-nav-bar
      title="房屋详情"
      left-arrow
      placeholder
      left-text="旅途"
      :safe-area-inset-top="false"
      @click-left="backClick"
    />
    <div class="tabs">
      <tab-control
        ref="tabControlRef"
        v-if="showTabs"
        :titles="names"
        @item-click="tabItemClick"
      />
    </div>
    <div class="content" v-if="infos.mainPart" v-memo="[infos.mainPart]">
      <detail-swiper
        :swiper-data="infos.mainPart.topModule.housePicture.housePics"
      />
      <detail-infos
        name="描述"
        :ref="getContentRef"
        :top-module="infos.mainPart.topModule"
      />
      <detail-facility
        name="设施"
        :ref="getContentRef"
        :house-facility="
          infos.mainPart.dynamicModule.facilityModule.houseFacility
        "
      />
      <detail-landloard
        name="房东"
        :ref="getContentRef"
        :landlord="infos.mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        name="评论"
        :ref="getContentRef"
        :comment="infos.mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        name="须知"
        :ref="getContentRef"
        :order-rules="infos.mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map
        name="周边"
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
import { ref, watch, computed, onMounted } from 'vue'
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
import useScroll from '@/hooks/useScroll'

const route = useRoute()
const router = useRouter()
const houseId = route.params.id

const infos = ref({})
getDetailInfos(houseId).then((res) => {
  infos.value = res.data
})

onMounted(() => {
  console.dir(document.documentElement)
})

const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabs = computed(() => {
  return scrollTop.value >= 300
})

// 方法一
// const contentEls = []
// const getContentRef = (el) => {
//   if (el) contentEls.push(el.$el)
// }

// const tabItemClick = (index) => {
//   console.log('index:', index, contentEls)
//   detailRef.value.scrollTo({
//     top: contentEls[index].offsetTop - 44,
//     behavior: 'smooth'
//   })
// }
//方法二
const contentEls = ref({})
const names = computed(() => {
  return Object.keys(contentEls.value)
})
const getContentRef = (el) => {
  if (!el) return
  const name = el.$el.getAttribute('name')
  contentEls.value[name] = el.$el
}

let isClick = false
let currentDistance = -1
const tabItemClick = (index) => {
  const key = Object.keys(contentEls.value)[index]
  const el = contentEls.value[key]
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - 44
  }
  isClick = true
  currentDistance = distance
  detailRef.value.scrollTo({
    top: distance,
    behavior: 'smooth'
  })
}

// 页面滚动, 滚动时匹配对应的tabControll的index
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return

  // 1.获取所有的区域的offsetTops
  const els = Object.values(contentEls.value)
  const values = els.map((el) => el.offsetTop)

  // 2.根据newValue去匹配想要索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  // console.log(index)
  tabControlRef.value?.setCurrentIndex(index)
})

function backClick() {
  router.back()
}
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  box-sizing: border-box;
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
