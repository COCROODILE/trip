import { defineStore } from "pinia"
import { getSearchConditions, getSearchHouse, keywordSearchSuggest, getGuessULike } from '@/service'
import localCache from '@/utils/cache'

const CACHE_SEARCH_HISTORY = 'CACHE_SEARCH_HISTORY'

const useSearch = defineStore('search', {
  state: () => ({
    searchConditions: [],
    searchHouse: [],
    searchSuggest: [],
    searchHistorys: [],
    guessULike: []
  }),
  actions:{
    async fetchSearchConditionsData(){
      const res = await getSearchConditions()
      // console.log(res);
      this.searchConditions = res?.data?.data?.data?.allConditions
    },

    async fetchSearchHouseData(){
      const res = await getSearchHouse()
      // console.log(res);
      this.searchHouse = res?.data?.data?.data
    },

    async fecthSearchSuggestData(keyword){
      const res = await keywordSearchSuggest(keyword)
      // console.log(res);
      this.searchSuggest = res?.data?.data?.suggests || []
    },

    async fetchSearchGuessData(){
      const res = await getGuessULike()
      console.log(res);
      this.guessULike = res?.data?.data
    },

    // 添加关键词
    addSearchHistory(keyword){
      if(!this.searchHistorys.includes(keyword)){
        this.searchHistorys.push(keyword)
      }

      // 只缓存10个历史记录
      let length = this.searchHistorys.length
      if(length > 10) {
        //只取后面的10位记录
        this.searchHistorys = this.searchHistorys.slice(length - 10, length)
      }

      // 存入本地缓存
      localCache.setCache(CACHE_SEARCH_HISTORY, this.searchHistorys)
    },

    // 初始化
    initSearchHistory(){
      this.searchHistorys = localCache.getCache(CACHE_SEARCH_HISTORY) || []
    },

    // 清空关键词
    clearSearchHistory(){
      this.searchHistorys = []
      localCache.clearCache()
    }
  }
})

export default useSearch