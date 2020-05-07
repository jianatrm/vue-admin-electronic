import request from '@/utils/request'

export function querydoc(data,loading =true) {
  return request({
    url: '/electronic/doc/queryElectronicDoc',
    method: 'post',
    loading,
    data:data,
  })
}

export function updatedoc(data,loading =true) {
  return request({
    url: '/electronic/doc/updateElectronicDoc',
    method: 'post',
    loading,
    data:data,
  })
}

export function adddoc(data,loading =true) {
  return request({
    url: '/electronic/doc/addElectronicDoc',
    method: 'post',
    loading,
    data:data,
  })
}
export function adddeptdoc(data,loading =true) {
  return request({
    url: '/electronic/doc/addDeptElectronicDoc',
    method: 'post',
    loading,
    data:data,
  })
}
export function deleteElectronicDoc(data,loading =true) {
  return request({
    url: '/electronic/doc/deleteElectronicDoc',
    method: 'post',
    loading,
    data:data,
  })
}
