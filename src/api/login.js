import request from '@/utils/http' // 引入封装好的axios请求

export function login (username, password) { // 登录接口
  return request('/user/verifyUserLogin', 'POST', { // 使用封装好的axios进行网络请求
    username,
    password
  })
}

export function getAllUserInfo () { // 登录接口
  return request('/user/getUserList', 'get')
}
