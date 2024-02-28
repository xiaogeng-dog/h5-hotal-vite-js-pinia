<template>
  <div class="swiper">
    <van-swipe>
      <template v-for="(item, index) in swiperData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>

      <template #indicator="{ active }">
        <div class="indicator">
          <template v-for="(value, key, index) in picGroup" :key="index">
            <span
              class="item"
              :class="{
                active: key == swiperData[active]?.enumPictureCategory
              }"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span
                class="count"
                v-if="key == swiperData[active]?.enumPictureCategory"
              >
                {{ getTypeIndex(active) }} / {{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup name="swiper">
import { computed } from 'vue'

const props = defineProps({
  swiperData: {
    type: Array,
    default: () => []
  }
})

const picGroup = computed(() => {
  const picGroup = {}
  for (const item of props.swiperData) {
    let group = picGroup[item.enumPictureCategory]
    if (!group) {
      group = []
      picGroup[item.enumPictureCategory] = group
    }
    group.push(item)
  }
  return picGroup
})

const getName = (name) => {
  return name.replace('：', '')
}

const getTypeIndex = (active) => {
  const currentItem = props.swiperData[active]
  const index = picGroup.value[currentItem.enumPictureCategory].findIndex(
    (item) => item === currentItem
  )
  return index + 1
}
</script>

<style lang="less" scoped>
.swiper {
  .item {
    img {
      width: 100%;
    }
  }

  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    display: flex;
    align-items: center;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    border-radius: 4px;

    .item {
      &.active {
        background-color: #fff;
        color: #333;
        padding: 0 3px;
        border-radius: 8px;
      }
    }
  }
}
</style>
