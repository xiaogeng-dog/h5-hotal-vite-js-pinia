<template>
  <van-tabs class="category-list">
    <van-tab v-for="(item, index) in categories" :key="index">
      <template #title>
        <div class="category-item">
          <img class="icon" :src="item.pictureUrl" alt="" />
          <div class="title">{{ item.title }}</div>
        </div>
      </template>
    </van-tab>
  </van-tabs>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

// const active = ref()
</script>

<style lang="less" scoped>
.category-list {
  --van-tabs-line-height: 80px;
  --van-tabs-bottom-bar-height: 0;

  .category-item {
    text-align: center;

    .icon {
      width: 32px;
      height: 32px;
    }

    .title {
      font-size: 12px;
    }
  }
}
</style>
