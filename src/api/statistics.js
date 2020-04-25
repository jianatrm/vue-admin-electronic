import request from '@/utils/request'

export function queryUserDoc(data) {
  return request({
    url: '/electronic/statistics/queryUserDoc',
    method: 'post',
    data
  })
}
export function queryDeptDoc(data) {
  return request({
    url: '/electronic/statistics/queryDeptDoc',
    method: 'post',
    data
  })
}
