import request from '@/utils/request'

export function querydoc(data) {
  return request({
    url: 'electronic/doc/queryElectronicDoc',
    method: 'post',
    data:data,
  })
}

export function updatedoc(data) {
  return request({
    url: 'electronic/doc/updateElectronicDoc',
    method: 'post',
    data:data,
  })
}export function adddoc(data) {
  return request({
    url: 'electronic/doc/addElectronicDoc',
    method: 'post',
    data:data,
  })
}
