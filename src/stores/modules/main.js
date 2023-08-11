import { defineStore } from "pinia";

const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1)

// const nowDate = new Date();
// const newDate = nowDate.setDate(nowDate.getDate() + 1);

const useMain = defineStore('main', {
  state: () => ({
    startDate: startDate,
    endDate: endDate,

    isLoading: true
  }),

})

export default useMain