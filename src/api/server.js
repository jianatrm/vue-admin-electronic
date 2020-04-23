import request from '@/utils/request'

export function certificatesCount(data) {
  return request({
    url: '/electronic/sys/account/CertificatesCount',
    method: 'post',
    data
  })
}

