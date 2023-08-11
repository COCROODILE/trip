import { defineStore } from "pinia";
import { getHomeHotSuggest, getHomeCategories, getHomeHouseList } from '@/service'

const useHome = defineStore('home', {
  state:() => ({
    hotSuggest:[],
    categories: [],
    houseList: [],
    currentPage:1
  }),
  actions:{
    async fetchHotSuggestData(){
      const res = await getHomeHotSuggest()
      // console.log(res);
      this.hotSuggest = res.data.data
    },
    async fetchCategoriesData(){
      const res = await getHomeCategories()
      // console.log(res);
      this.categories = res.data.data
    },
    async fetchHouseListData(){
      const res = await getHomeHouseList(this.currentPage)
      // console.log(res);
      this.houseList.push(...res.data.data)
      this.currentPage++
    }
  }
})

export default useHome