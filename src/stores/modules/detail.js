import { defineStore } from "pinia";

import { getDetailInfos } from '@/service'

const useDetail = defineStore('detail', {
  state:() => ({
    detailInfos:{}
  }),
  actions:{
    async fetchDetailInfos(houseId){
      const res = await getDetailInfos(houseId)
      // console.log(res);
      this.detailInfos = res.data.data
    }
  }
})

export default useDetail