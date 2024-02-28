import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
import { throttle } from '@/utils/common'
export default function useReachBottom(callback) {
  const isReachBottom = ref(false)

  const handleScrollListener = throttle(() => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    if (scrollHeight <= Math.ceil(clientHeight + scrollTop)) {
      console.log('滚动到底部')
      isReachBottom.value = true
      callback()
    } else {
      isReachBottom.value = false
    }
  }, 100)

  onMounted(() => {
    window.addEventListener('scroll', handleScrollListener)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScrollListener)
  })
  onActivated(() => {
    window.addEventListener('scroll', handleScrollListener)
  })
  onDeactivated(() => {
    window.removeEventListener('scroll', handleScrollListener)
  })

  return isReachBottom
}
