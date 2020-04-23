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

export function getUserInfo(token) {
  return request({
    url: '/electronic/user/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/electronic/logout',
    method: 'post'
  })
}


export function queryuser(data) {
  return request({
    url: '/electronic/user/queryuser',
    method: 'post',
    data:data,
  })
}

export function updateuser(data) {
  return request({
    url: '/electronic/user/updateuser',
    method: 'post',
    data:data,
  })
}export function adduser(data) {
  return request({
    url: '/electronic/user/adduser',
    method: 'post',
    data:data,
  })
}

export function selectCountByMonth(data) {
  return request({
    url: '/electronic/user/selectCountByMonth',
    method: 'get',
    params:data
  })
}
