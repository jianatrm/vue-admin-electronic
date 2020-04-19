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


export function queryuser(data) {
  return request({
    url: 'electronic/user/queryuser',
    method: 'post',
    data:data,
  })
}

export function updateuser(data) {
  return request({
    url: 'electronic/user/updateuser',
    method: 'post',
    data:data,
  })
}export function adduser(data) {
  return request({
    url: 'electronic/user/adduser',
    method: 'post',
    data:data,
  })
}
