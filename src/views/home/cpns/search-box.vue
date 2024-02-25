<template>
  <div class="serach-box">
    <div class="item location bottom-gray-line">
      <div class="city" @click="cityItemClick">
        {{ cityStore.currentCity.cityName }}
      </div>
      <div class="current">
        <span class="mine">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <div class="item date-range bottom-gray-line">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time"> 8月25日 </span>
        </div>
        <div class="stay">共一晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time"> 8月26日 </span>
        </div>
      </div>
    </div>
    <div class="item price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <div class="item keyword bottom-gray-line">关键字/位置/民宿名</div>
    <div class="item hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <span class="tag">{{ item.tagText.text }}</span>
      </template>
    </div>

    <div class="item search-btn">
      <div class="btn" @click="startSearch">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import useCityStore from '@/store/modules/city'
import { useRouter } from 'vue-router'
defineProps({
  hotSuggests: {
    type: Object,
    default: () => {}
  }
})
const router = useRouter()
const startSearch = () => {
  router.push({
    path: '/search',
    query: {
      address: '广州',
      cityId: 45,
      startDate: '07-23',
      endDate: '07-24'
    }
  })
}
const cityStore = useCityStore()
const cityItemClick = () => {
  router.push({
    path: '/city'
  })
}
</script>

<style lang="less" scoped>
.location {
  height: 44px;
  .city {
    flex: 1;
    font-size: 15px;
    padding: 0 10px 0 0;
    color: #333;
  }

  .current {
    display: flex;
    align-items: center;

    .mine {
      margin-right: 8px;
      font-size: 12px;
      color: #666;
    }
    img {
      width: 18px;
      height: 18px;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  height: 44px;
  .start {
    border-right: 1px solid f8f9f9;
  }
}

.keyword {
  height: 44px;
}

.hot-suggest {
  margin: 10px 0;

  .tag {
    font-size: 12px;
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
    color: #3f4954;
    background-color: #f1f3f5;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(
      --tjc-theme-linear-gradient,
      linear-gradient(90deg, #fa8c1d, #fcaf3f)
    );
  }
}

.item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>
