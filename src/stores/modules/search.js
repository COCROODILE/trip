import { defineStore } from "pinia"
import { getSearchConditions, getSearchHouse } from '@/service'

const useSearch = defineStore('search', {
  state: () => ({
    searchConditions: [],
    searchHouse: []
  }),
  actions:{
    async fetchSearchConditionsData(){
      const res = await getSearchConditions()
      // console.log(res);
      this.searchConditions = res.data.data.data.allConditions
    },

    async fetchSearchHouseData(){
      const res = await getSearchHouse()
      // console.log(res);
      this.searchHouse = res.data.data.data
    }
  }
})

export default useSearch