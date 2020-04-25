const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  limit: state => state.user.limit,
  admin: state => state.user.admin,
  user: state => state.user.user,
}
export default getters
