import {
  ref,
  onMounted,
  onUnmounted
} from "vue"

import { throttle } from "underscore"

// 考虑到如果其他页面也会有监听window的scroll事件
// 所以将监听window的scroll事件封装起来比较优雅
export default function useScroll() {
  const isReachBottom = ref(false)
  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)

  // 监听window创建的滚动
  // 当我们离开页面时，就要移除监听对window的监听
  const scrollListenerHandler = throttle(() => {
    // console.log(document.documentElement.scrollTop);
    scrollTop.value = document.documentElement.scrollTop; //页面滚动的距离
    clientHeight.value = document.documentElement.clientHeight; //视口呈现出的页面高度
    scrollHeight.value = document.documentElement.scrollHeight; //页面的总体高度
    if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
      // 将reachBottom作为一个回调函数返回出去 让外面处理
      // reachBottomCB && reachBottomCB()

      isReachBottom.value = true
    }
  }, 100)

  // 页面加载，对其进行监听
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler);
  })

  // 页面销毁时，也要销毁对window的监听
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, scrollTop, clientHeight, scrollHeight }
}