// service统一出口
import Request from './request'

import localCache from '@/utils/cache'
import { getGlobalFileExport } from '@/utils/common'
const serviceModules = import.meta.glob('./**/*.ts', { eager: true })
const serviceGlobalFiles = getGlobalFileExport(serviceModules)

const { VITE_SERVICE_TIME_OUT, VITE_GLOB_API_URL_PREFIX } = import.meta.env
const stockRequest = new StockRequest({
  baseURL: VITE_GLOB_API_URL_PREFIX,
  timeout: VITE_SERVICE_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      // console.log(token)

      if (token) {
        config.headers!.Authorization = `${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export { Request }
export default serviceGlobalFiles
