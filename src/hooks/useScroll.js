import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'

export default function useScroll(elRef) {
  let el = window

  const scrollHeight = ref(0)
  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const isReachBottom = ref(false)

  const handleScrollListener = () => {
    if (el === window) {
      scrollHeight.value = document.documentElement.scrollHeight
      scrollTop.value = document.documentElement.scrollTop
      clientHeight.value = document.documentElement.clientHeight
      isReachBottom.value =
        scrollHeight.value <= scrollTop.value + clientHeight.value
    } else {
      scrollHeight.value = el.scrollHeight
      scrollTop.value = el.scrollTop
      clientHeight.value = el.clientHeight
    }
  }

  onMounted(() => {
    if (elRef) {
      el = elRef.value
    }
    el.addEventListener('scroll', handleScrollListener)
  })
  onUnmounted(() => {
    el.removeEventListener('scroll', handleScrollListener)
  })

  onActivated(() => {
    el.addEventListener('scroll', handleScrollListener)
  })
  onDeactivated(() => {
    el.removeEventListener('scroll', handleScrollListener)
  })

  return {
    scrollHeight,
    scrollTop,
    clientHeight,
    isReachBottom
  }
}
