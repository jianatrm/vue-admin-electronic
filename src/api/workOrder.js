import request from '@/utils/request'

export function querydept(data) {
  return request({
    url: 'electronic/dept/queryDept',
    method: 'post',
    data:data,
  })
}

export function updatedept(data) {
  return request({
    url: 'electronic/dept/updateDept',
    method: 'post',
    data:data,
  })
}
export function startWorkOrder(data) {
  return request({
    url: 'electronic/workOrder/startWorkOrder',
    method: 'post',
    data:data,
  })
}
export function queryWorkOrder(data) {
  return request({
    url: 'electronic/workOrder/queryWorkOrder',
    method: 'post',
    data:data,
  })
}
export function queryWorkOrderToMe(data) {
  return request({
    url: 'electronic/workOrder/queryWorkOrderToMe',
    method: 'post',
    data:data,
  })
}
export function queryWorkOrderDetail(data) {
  return request({
    url: 'electronic/workOrder/queryWorkOrderDetail',
    method: 'post',
    data:data,
  })
}

export function approveWorkOrder(data) {
  return request({
    url: 'electronic/workOrder/approveWorkOrder',
    method: 'post',
    data:data,
  })
}
