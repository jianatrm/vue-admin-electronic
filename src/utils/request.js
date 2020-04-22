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
    if (config.url.indexOf("/authentication/form")==-1){
      vm.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }

    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer '+ getToken()
    }
    return config
  },
  error => {
    setTimeout(() => {
      vm.$loading().close()
    },1000)
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    setTimeout(() => {
      vm.$loading().close()
    },1000)
    const res = response.data
    if (!res.success) {
      Message({
        message: res.resultMessage || '系统异常',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.resultMessage || '系统异常'))
    } else {
      return res
    }
  },
  error => {
    setTimeout(() => {
      vm.$loading().close()
    },1000)
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
