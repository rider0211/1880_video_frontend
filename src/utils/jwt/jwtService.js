import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  
  // eslint-disable-next-line
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getUserID() {
    return localStorage.getItem(this.jwtConfig.storageUserIDKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }

  forgotPassword(...args) {
    return axios.post(this.jwtConfig.forgotPasswordEndpoint, ...args)
  }

  resetForgotPassword(...args) {
    return axios.post(this.jwtConfig.resetForgotPasswordEndpoint, ...args)
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  resetPassword(...args) {
    return axios.post(this.jwtConfig.resetPasswordEndpoint, ...args)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }

  getAllUsers() {
    return axios.get(this.jwtConfig.getAllUsersEndpoint)
  }

  searchUsers(...args) {
    return axios.get(this.jwtConfig.searchUsersEndpoint, ...args)
  }

  getHeaders(token){
    return axios.get(this.jwtConfig.headerGetEndpoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  deleteHeaders(id, token){
    return axios.post(this.jwtConfig.headerDeleteEndpoint, { header_id : id}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  getFooters(token){
    return axios.get(this.jwtConfig.footerGetEndpoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  deleteFooters(id, token){
    return axios.post(this.jwtConfig.footerDeleteEndpoint, { footer_id : id}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }
  getCustomers(token, params) {
    return axios.get(`${this.jwtConfig.getCustomersEndpoint}?start_row_index=${params.start_row_index}&end_row_index=${params.end_row_index}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
  deleteCustomer(id, token){
    return axios.post(this.jwtConfig.customerDeleteEndpoint, { user_id : id}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }
}
