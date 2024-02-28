import axios from 'axios'
import { useLoadingStore } from '@/store/modules/loading'
import { baseURL, TIMEOUT } from './config'
const loadingStore = useLoadingStore()
class Request {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      timeout: TIMEOUT
    })

    this.instance.interceptors.request.use(
      (config) => {
        loadingStore.changeLoading(true)
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        loadingStore.changeLoading(false)
        return res
      },
      (err) => {
        loadingStore.changeLoading(false)
        return err
      }
    )
  }

  request(config) {
    // loadingStore.changeLoading(true)
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          console.log('request err:', err)
          reject(err)
        })
        .finally(() => {
          // loadingStore.changeLoading(false)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }
}

export default new Request(baseURL)
