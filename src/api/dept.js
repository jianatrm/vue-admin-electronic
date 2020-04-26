import request from '@/utils/request'

export function querydept(data,loading =true) {
  return request({
    url: '/electronic/dept/queryDept',
    method: 'post',
    loading:loading,
    data:data,
  })
}

export function updatedept(data,loading =true) {
  return request({
    url: '/electronic/dept/updateDept',
    method: 'post',
    loading:loading,
    data:data,
  })
}
export function adddept(data,loading =true) {
  return request({
    url: '/electronic/dept/addDept',
    method: 'post',
    loading:loading,
    data:data,
  })
}

export function queryDeptElectronicDoc(data,loading =true) {
  return request({
    url: '/electronic/deptElectronicDoc/queryDeptElectronicDoc',
    method: 'post',
    loading:loading,
    data:data,
  })
}
