<template>
  <van-swipe class="swipe" :autoplay="5000" indicator-color="white">
    <template v-for="(item, index) in housePics" :key="index">
      <van-swipe-item class="swipe-item">
        <img :src="item.url" alt="" />
      </van-swipe-item>
    </template>
    <!-- <template #indicator="{ active, total }">
      <div class="indicator">
        <template v-for="(value, key, index) in picGroup">
          <span class="item" :class="{ active: key === housePics[active]?.enumPictureCategory }">
            {{ value[0].title }}
            {{ housePics[active]?.enumPictureCategory }}-{{key}}
          </span>
        </template>
      </div>
    </template> -->
  </van-swipe>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  housePics: {
    type: Array,
    default: () => []
  }
})

const picGroup = computed(() => {
  const picGroup = {}
  for (const item of props.housePics) {
    let group = picGroup[item.enumPictureCategory]
    if (!group) {
      group = []
      picGroup[item.enumPictureCategory] = group
    }
    group.push(item)
  }
  console.log(picGroup)
  return picGroup
})
console.log(picGroup)
</script>

<style lang="less" scoped>
.swipe {
  background-color: #fff;

  .swipe-item {
    img {
      height: 250px;
    }
  }

  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
