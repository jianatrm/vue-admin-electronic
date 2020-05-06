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
export function startWorkOrder(data,loading =true) {
  return request({
    url: '/electronic/workOrder/startWorkOrder',
    method: 'post',
    loading:loading,
    data:data,
  })
}
export function queryWorkOrder(data,loading =true) {
  return request({
    url: '/electronic/workOrder/queryWorkOrder',
    method: 'post',
    loading:loading,
    data:data,
  })
}
export function queryWorkOrderToMe(data,loading =true) {
  return request({
    url: '/electronic/workOrder/queryWorkOrderToMe',
    method: 'post',
    loading:loading,
    data:data,
  })
}
export function queryWorkOrderDetail(data,loading =true) {
  return request({
    url: '/electronic/workOrder/queryWorkOrderDetail',
    method: 'post',
    loading:loading,
    data:data,
  })
}

export function approveWorkOrder(data,loading =true) {
  return request({
    url: '/electronic/workOrder/approveWorkOrder',
    method: 'post',
    loading:loading,
    data:data,
  })
}
export function approverCarbonCopy(data,loading =true) {
  return request({
    url: '/electronic/workOrder/approverCarbonCopy',
    method: 'post',
    loading:loading,
    data:data,
  })
}
export function queryApproverCarbonCopy(data,loading =true) {
  return request({
    url: '/electronic/workOrder/queryApproverCarbonCopy',
    method: 'post',
    loading:loading,
    data:data,
  })
}
