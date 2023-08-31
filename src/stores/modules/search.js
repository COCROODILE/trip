import { defineStore } from "pinia"
import { getSearchConditions } from '@/service'

const useSearch = defineStore('search', {
  state: () => ({
    searchConditions: []
  }),
  actions:{
    async fetchSearchConditionsData(){
      const res = await getSearchConditions()
      // console.log(res);
      this.searchConditions = res.data.data.data.allConditions
    }
  }
})

export default useSearch