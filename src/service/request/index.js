import axios from 'axios'

import {
  BASE_URL,
  TIMEOUT
} from './config'

import useMain from '@/stores/modules/main'
const mainStore = useMain()

class myRequest {
  constructor(baseURL, timeout = 3000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // 拦截器
    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      return config
    }, err => {
      return err
    })

    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false
      return res
    }, err => {
      mainStore.isLoading = false
      return err
    })
  }



  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  get(config) {
    return this.request({
      ...config,
      method: 'GET'
    })
  }

  post(config) {
    return this.request({
      ...config,
      method: 'POST'
    })
  }
}


export default new myRequest(BASE_URL, TIMEOUT)