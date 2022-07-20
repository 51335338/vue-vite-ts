import Axios from "axios";
import { ElMessage, ElLoading } from "element-plus";
import { resolve } from "path";

interface iOptions {
  loading?: boolean,
  error?: boolean
}

const baseUrl = ''

const Service = Axios.create({
  timeout: 10000, // 超时时间
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截
Service.interceptors.request.use(config => {
  /**
   * 根据你的项目实际情况来对 config 做处理
   * 这里对 config 不做任何处理，直接返回
   */
  
  return config
},
// 错误信息
error => {
  return Promise.reject(error)
})

// 相应拦截
Service.interceptors.response.use(response => {
  /**
   * 根据你的项目实际情况来对 response 和 error 做处理
   * 这里对 response 和 error 不做任何处理，直接返回
   */
  
  return response
},
// 错误返回
error => {
  return Promise.reject(error)
})

/**
 * 核心请求函数
 * @param params 请求参数
 * @param method 请求类型
 * @param options 请求配置，是否开启loading, 是否错误提示
 */

const request = 
  (
    url: string,
    method: string, 
    params: object, 
    options: iOptions = {loading:true,error:true}
  ) => {
  let loadingInstance:any
  // 开启loading
  if (options.loading) loadingInstance = ElLoading.service()
    
  Service({
    url,
    method,
    data: params
  })
  .then((res:any) => {
    // 此处作用很大，可以扩展很多功能。
    // 比如对接多个后台，数据结构不一致，可做接口适配器
    // 也可对返回日期/金额/数字等统一做集中处理

    resolve(res)
  })
  .catch((error:any) => ElMessage(error))
  .finally(() => loadingInstance && loadingInstance.close())
}

// 封装get方法

const get = (url:string, params:object, options:iOptions) => {
  return request(url, 'get', params, options)
}

const post = (url:string, params:object, options:iOptions) => {
  return request(url, 'post', params, options)
}

export {
  get,
  post
}