<template>
  <div class="intro">
    <h2 class="title">{{ intro.title }}</h2>
    <div class="content">
      {{ intro.introduction }}
    </div>
  </div>
</template>

<script setup name="home">
defineProps({
  intro: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped>
.intro {
  padding: 16px 12px;

  .title {
    font-size: 14px;
    color: #000;
    font-weight: 700;
  }

  .content {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.5;
    color: #666;
  }
}
</style>
