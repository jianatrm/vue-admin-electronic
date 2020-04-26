import request from '@/utils/request'

export function queryUserDoc(data,loading =true) {
  return request({
    url: '/electronic/statistics/queryUserDoc',
    method: 'post',
    loading,
    data
  })
}
export function queryDeptDoc(data,loading =true) {
  return request({
    url: '/electronic/statistics/queryDeptDoc',
    method: 'post',
    loading,
    data
  })
}
