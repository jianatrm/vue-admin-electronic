import request from '@/utils/request'
var qs = require('qs');

export function login(data,loading =false) {
  return request({
    url: '/electronic/authentication/form',
    method: 'post',
    loading:loading,
    data:qs.stringify(data),
    auth: {
      username: 'jiana',
      password: 'jiana-secret'
    }
  })
}

export function getUserInfo(data,loading =false) {
  return request({
    url: '/electronic/user/userInfo',
    method: 'get',
    loading:loading,
  })
}

export function logout() {
  return request({
    url: '/electronic/logout',
    method: 'post',
  })
}


export function queryuser(data,loading =true) {
  return request({
    url: '/electronic/user/queryuser',
    method: 'post',
    loading:loading,
    data:data,
  })
}

export function updateuser(data,loading =true) {
  return request({
    url: '/electronic/user/updateuser',
    method: 'post',
    loading:loading,
    data:data,
  })
}
export function adduser(data,loading =true) {
  return request({
    url: '/electronic/user/adduser',
    method: 'post',
    loading:loading,
    data:data,
  })
}


export function restpassword(data,loading =true) {
  return request({
    url: '/electronic/user/restPassword',
    method: 'post',
    loading:loading,
    data:data,
  })
}

export function selectCountByMonth(data,loading =true) {
  return request({
    url: '/electronic/user/selectCountByMonth',
    method: 'get',
    loading:loading,
    params:data
  })
}
