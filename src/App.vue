<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <tab-bar v-show="!hideTabBar"></tab-bar>
    <loading></loading>
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/index.vue'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import Loading from '@/components/loading/index.vue'
const route = useRoute()
const hideTabBar = ref(false)

// 监听路由路径的变化
watch(
  () => route.path,
  () => {
    // 是否隐藏底部的 tabbar
    console.log(route.meta)
    hideTabBar.value = !!route.meta.hideTabBar
  }
)
</script>

<style scoped></style>
