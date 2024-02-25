<template>
  <div class="rules-area">
    <house-section header-text="预订须知"> </house-section>
  </div>
</template>

<script setup>
import HouseSection from '@/components/house-section/index.vue'

defineProps({
  rules: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped></style>
