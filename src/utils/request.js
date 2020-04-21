import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import vm from "../main";
// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8001', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000,
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    vm.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer '+ getToken()
    }
    return config
  },
  error => {
    vm.$loading().close()
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    vm.$loading().close()
    const res = response.data
    if (!res.success) {
      Message({
        message: res.message || '系统异常',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || '系统异常'))
    } else {
      return res
    }
  },
  error => {
    vm.$loading().close()
    if (error.response.status == 401) {
      MessageBox.confirm('您的认证已失效，可以取消停留在此页面上，或者再次登录', '确认退出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(error)
  }
)

export default service
