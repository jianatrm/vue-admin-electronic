import request from '@/utils/request'

export function querydept(data) {
  return request({
    url: '/electronic/dept/queryDept',
    method: 'post',
    data:data,
  })
}

export function updatedept(data) {
  return request({
    url: '/electronic/dept/updateDept',
    method: 'post',
    data:data,
  })
}
export function adddept(data) {
  return request({
    url: '/electronic/dept/addDept',
    method: 'post',
    data:data,
  })
}

export function queryDeptElectronicDoc(data) {
  return request({
    url: '/electronic/deptElectronicDoc/queryDeptElectronicDoc',
    method: 'post',
    data:data,
  })
}
