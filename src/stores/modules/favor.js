import { defineStore } from "pinia"
import { getFavorList, getHistoryList } from "@/service"

const useFavor = defineStore('favor', {
  state: () => ({
    favorList: [],
    historyList: []
  }),

  actions:{
    async fetchFavorListData(){
      const res = await getFavorList()
      // console.log(res);
      this.favorList = res.data.data.data
    },

    async fecthHistoryListData(){
      const res = await getHistoryList()
      console.log(res);
      this.historyList = res.data.data.data
    }
  }
})

export default useFavor