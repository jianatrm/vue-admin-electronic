import request from '@/utils/request'

export function querydoc(data) {
  return request({
    url: 'electronic/doc/queryDoc',
    method: 'post',
    data:data,
  })
}

export function updatedoc(data) {
  return request({
    url: 'electronic/doc/updateDoc',
    method: 'post',
    data:data,
  })
}export function adddoc(data) {
  return request({
    url: 'electronic/doc/addDoc',
    method: 'post',
    data:data,
  })
}
