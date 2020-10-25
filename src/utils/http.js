import axios from 'axios'
// import { message } from 'iview'
import router from '../router'

const message = {
  error: () => {},
  warn: () => {},
  info: () => {}
}
/*
* 提示函数
* @param {String} content 提示的内容
* @param {Number} duration 提示窗口显示的时间，默认1500ms
* */
const tip = (content, duration = 2) => {
  message.error(content, duration)
}

/*
* 请求失败后的统一处理, 生产环境错误提示
* 处理4xx错误和5xx错误,
* @param {Number} status 状态码
* */

const errorHandlerProd = (error) => {
  const { status } = error.response
  switch (status) {
    case 404:
      // 调转路由到404 page
      // todo
      router.push('/404')
      break
    case 401:
      // todo 未登录
      break
    case 403:
      // todo 登录过期
      break
    default:
      if (status >= 500) {
        // 调转到5xx page
        // todo
        router.push('/500')
      }
  }
}

/*
* 请求失败后的统一处理, 开发环境错误提示
* @param {Number} status 状态码
* */

const errorHandlerDev = (error) => {
  const { status, statusText } = error.response
  console.log('http error', error)
  console.log('url', error.config.url)
  switch (status) {
    case 400:
      tip(`${status}: 参数错误!`)
      break
    case 401:
      tip(`${status}: 未登录!`)
      break
    case 403:
      tip(`${status}: 登录过期!`)
      break
    case 404:
      tip(`${status}: 请求的资源不存在!`)
      break
    default:
      if (status >= 500) {
        tip(`${status}: 服务器错误!`)
      } else {
        tip(`${status}: ${statusText}`)
      }
  }
}

// 设置全局的错误处理
let errorHandler = null
if (process.env.NODE_ENV === 'production') {
  errorHandler = errorHandlerProd
} else {
  errorHandler = errorHandlerDev
}

// 全局设置请求的基础路径和超时时间
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
axios.defaults.timeout = 12000
axios.defaults.headers['Content-Type'] = 'application/json'

/*
* 封装axios请求
* @param {String} url 路径
* @param {String} method 方法
* @param {Object} data 请求数据
* */
export default function http (url, method = 'GET', data = {}) {
  const methodUpper = method.toLowerCase()
  const options = {
    url,
    method: methodUpper
  }
  switch (methodUpper) {
    case 'get':
    case 'delete':
      options.params = data
      break
    case 'post':
    case 'put':
    case 'patch':
      options.data = data
      break
    default:
      break
  }
  return axios(options)
    .then(res => {
      const { status, data } = res
      if (status === 200) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
    .catch(error => {
      if (error.response) {
        errorHandler(error)
      } else {
        if (error.message.indexOf('timeout') > -1) {
          tip('请求超时，请重试！', 1)
        }
      }
    })
}
