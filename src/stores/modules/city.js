import { getCityAll } from '@/service'
import { defineStore } from 'pinia'

const useCity = defineStore('city', {
  state: () => ({
    allCities: {},
    currentCity:{
      cityName:'广州'
    }
  }),
  actions:{
    async fetchAllCitiesData(){
      const res = await getCityAll()
      this.allCities = res.data.data
      console.log('allCities', this.allCities);

    }
  }
})

export default useCity