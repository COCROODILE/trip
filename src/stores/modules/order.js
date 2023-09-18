import { getOrderList } from "@/service"
import { defineStore } from "pinia"

const useOrder = defineStore('order', {
  state: () => ({
    orderList: []
  }),
  actions:{
    async fecthOrderListData(type){
      const res = await getOrderList(type)
      // console.log(res);
      this.orderList = res.data.data.data.orders
    }
  }
})

export default useOrder