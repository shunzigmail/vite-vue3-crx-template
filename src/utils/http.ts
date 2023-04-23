import { extend } from 'umi-request'
const http = extend({
  prefix: location.origin,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'zh-CN,zh;q=0.9'
  }
})
http.interceptors.request.use((url, options) => {
  return { url, options }
})

http.interceptors.response.use((response) => {
  return response
})

export default http
