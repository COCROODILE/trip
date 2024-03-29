export function debounce(fn, delay = 500, immediate = false){
  // 先定义一个定时器，保存上一次的定时器
  let timer = null
  let isInvoke = false  // 判断immediate的状态 invoke：执行

  // 核心代码
  // 这里不要用箭头函数 否则没有this
  const _debounce = function(...args){
    // 取消上一次的定时器
    if(timer) clearTimeout(timer)

    // 判断是否需要立即执行
    if(immediate && !isInvoke){
      fn.apply(this, args)
      isInvoke = true
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      // 恢复原始状态
      isInvoke = false
      timer = null
    }, delay)
  }

  // 取消防抖
  _debounce.cancel = function(){
    clearTimeout(timer)
  }

  return _debounce
}