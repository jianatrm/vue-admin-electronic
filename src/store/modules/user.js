import {getInfo, login, logout} from '@/api/user'
import {getMenuPermission} from '@/api/role'
import {getToken, removeToken, setToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  limit:false,
  roles: [],
  admin:false,
  verified:false,
  user:{}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLE_TYPE_LIST: (state, admin) => {
      state.admin = admin
  },
  SET_LIMIT: (state, limit) => {
    state.limit = limit
  },
  SET_USER: (state, user) => {
    state.user = user
  },

  SET_VERIFIED :(state, verified) => {
    state.verified = verified
  },


}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password},false).then(response => {
        commit('SET_TOKEN', response.result.value)
        setToken(response.result.value)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      debugger
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE_TYPE_LIST',false)
        commit('SET_USER',{})
        commit('SET_ROLES',[])
        commit('SET_AVATAR','')
        commit('SET_VERIFIED', false)
        commit('SET_ROLE_TYPE_LIST', false)
        commit('SET_LIMIT', false)
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_VERIFIED', false)
      removeToken()
      resolve()
    })
  },
  verified({ commit }) {
    return new Promise(resolve => {
      commit('SET_VERIFIED', true)
      resolve()
    })
  }
}

export function menuAndRoles(routes, roles) {
  routes.forEach(route => {
    let role = roles.filter(item => item.permissionId===tmp.meta.id );
    route.meta.role =role[0].roleNames
    if (route.children) {
     menuAndRoles(route.children, roles)
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

