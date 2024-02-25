<template>
  <van-swipe class="swipe" :autoplay="5000" indicator-color="white">
    <template v-for="(item, index) in housePics" :key="index">
      <van-swipe-item class="swipe-item">
        <img :src="item.url" alt="" />
      </van-swipe-item>
    </template>
  </van-swipe>
</template>

<script setup>
defineProps({
  housePics: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="less" scoped>
.swipe {
  background-color: #fff;

  .swipe-item {
    img {
      height: 250px;
    }
  }
}
</style>
