import axios from 'axios'
import { getBlobFromLocalForage } from 'utils/common'
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
  getCustomerByID(token, param) {
    return axios.get(`${this.jwtConfig.getCustomerByIDEndpoint}/${param}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  updateCustomer(token, ...args){
    return axios.post(this.jwtConfig.customerUpdateEndpoint, ...args, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
  
  async addClient(token, args){
    let formData = new FormData();
    for (let arg in args) {
      if(arg === 'front_1_file'){
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([front_1_file]) => {
          try {
            formData.append('front_1_file', front_1_file, 'front_1_file.png');
          } catch (error) {
              console.log(error);
          }
        })
      }else if(arg === 'front_2_file'){
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([front_2_file]) => {
          formData.append('front_2_file', front_2_file, 'front_2_file.png');
        })
      }else if(arg === 'left_file'){
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([left_file]) => {
          formData.append('left_file', left_file, 'left_file.png');
        })
      }else if(arg === 'right_file'){
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([right_file]) => {
          formData.append('right_file', right_file, 'right_file.png');
        })
      }else{
        await formData.append(arg, args[arg]);
      }
    }
    return axios.post(this.jwtConfig.addClientEndPoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }
  getClientByCustomerID(token, params) {
    return axios.get(`${this.jwtConfig.getClientByCustomerIDEndPoint}?customer_id=${params.customer_id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
  async addChild(token, args){
    let formData = new FormData();
    for (let arg in args) {
      if(arg === 'front_1_file'){
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([front_1_file]) => {
          try {
            formData.append('front_1_file', front_1_file, 'front_1_file.png');
          } catch (error) {
              console.log(error);
          }
        })
      }else if(arg === 'front_2_file'){
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([front_2_file]) => {
          formData.append('front_2_file', front_2_file, 'front_2_file.png');
        })
      }else if(arg === 'left_file'){
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([left_file]) => {
          formData.append('left_file', left_file, 'left_file.png');
        })
      }else if(arg === 'right_file'){
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([right_file]) => {
          formData.append('right_file', right_file, 'right_file.png');
        })
      }else{
        await formData.append(arg, args[arg]);
      }
    }
    return axios.post(this.jwtConfig.addChildEndPoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  deleteClient(id, token){
    return axios.post(this.jwtConfig.clientDeleteEndpoint, { client_id : id}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }
  
  getClientByClientID(token, params) {
    return axios.get(`${this.jwtConfig.getClientByClientIDEndPoint}${params.client_id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  updateClientByClientID(token, params){
    return axios.post(this.jwtConfig.updateClientEndpoint, params, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
}
