<template>
  <div v-if="loadingStore.isLoading" class="global-loading">
    <div class="loading-bg"></div>
    <div class="loading"></div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
// const showLoading = ref(true);

import { useLoadingStore } from '@/store/modules/loading.js'
const loadingStore = useLoadingStore()
</script>

<style scoped lang="less">
.global-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 104px;
  height: 104px;
  margin-left: -52px;
  margin-top: -52px;
  z-index: 2000;

  .loading-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(https://fe.tujiacdn.com/pwa/static/fevueui/images/loading/loading-bg.png);
    background-size: 104px 104px;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .loading {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 70px;
    height: 70px;
    background-image: url(@/assets/img/home/full-screen-loading.gif);
    background-size: 70px 70px;
    background-repeat: no-repeat;
    background-position: 50%;
  }
}
</style>
