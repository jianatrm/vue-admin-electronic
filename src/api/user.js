import request from '@/utils/request'
var qs = require('qs');

export function login(data) {
  return request({
    url: '/electronic/authentication/form',
    method: 'post',
    data:qs.stringify(data),
    auth: {
      username: 'jiana',
      password: 'jiana-secret'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/electronic/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/electronic/logout',
    method: 'post'
  })
}
