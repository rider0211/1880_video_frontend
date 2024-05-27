import axios from 'axios'
import { getBlobFromLocalForage } from 'utils/common'
import jwtDefaultConfig from './jwtDefaultConfig'
import qs from 'qs';

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

  getHeaders(token) {
    return axios.get(this.jwtConfig.headerGetEndpoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  deleteHeaders(id, token) {
    return axios.post(this.jwtConfig.headerDeleteEndpoint, { header_id: id }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  getFooters(token) {
    return axios.get(this.jwtConfig.footerGetEndpoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  deleteFooters(id, token) {
    return axios.post(this.jwtConfig.footerDeleteEndpoint, { footer_id: id }, {
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
  deleteCustomer(id, token) {
    return axios.post(this.jwtConfig.customerDeleteEndpoint, { user_id: id }, {
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

  updateCustomer(token, ...args) {
    return axios.post(this.jwtConfig.customerUpdateEndpoint, ...args, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  async addClient(token, params) {
    return axios.post(this.jwtConfig.addClientEndPoint, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }
  getClientByCustomerID(token, params) {
    return axios.get(`${this.jwtConfig.getClientByCustomerIDEndPoint}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
  async addChild(token, args) {
    let formData = new FormData();
    for (let arg in args) {
      if (arg === 'front_1_file') {
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([front_1_file]) => {
          try {
            formData.append('front_1_file', front_1_file, 'front_1_file.png');
          } catch (error) {
            console.log(error);
          }
        })
      } else if (arg === 'front_2_file') {
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([front_2_file]) => {
          formData.append('front_2_file', front_2_file, 'front_2_file.png');
        })
      } else if (arg === 'left_file') {
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([left_file]) => {
          formData.append('left_file', left_file, 'left_file.png');
        })
      } else if (arg === 'right_file') {
        await Promise.all([
          getBlobFromLocalForage(args[arg].key)
        ]).then(([right_file]) => {
          formData.append('right_file', right_file, 'right_file.png');
        })
      } else {
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

  deleteClient(id, token) {
    return axios.post(this.jwtConfig.clientDeleteEndpoint, { client_id: id }, {
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

  updateClientByClientID(token, params) {
    return axios.post(this.jwtConfig.updateClientEndpoint, params, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  getAllCameraVoice(token) {
    return axios.get(this.jwtConfig.getAllCameraVoiceEndPoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  getCameraVoiceByID(token, id) {
    return axios.get(`${this.jwtConfig.getCameraVoiceByIDEndpoint}?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  getCameravoiceByCameraID(token, param) {
    return axios.get(`${this.jwtConfig.getCameravoiceByCameraIDEndpoint}?id=${param.id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  addCameraVoice(token, param) {
    return axios.post(this.jwtConfig.addCameraVoiceEndpoint, param, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  updateCameraVoice(token, param) {
    return axios.post(this.jwtConfig.updateCameraVoiceEndpoint, param, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  deleteCameraVoice(token, param) {
    return axios.post(this.jwtConfig.deleteCameraVoiceEndpoint, param, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  // Coloring page actions

  getAllColoringPage(token) {
    return axios.get(this.jwtConfig.getAllColoringPageEndPoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  getColoringPageByID(token, id) {
    return axios.get(`${this.jwtConfig.getColoringPageByIDEndpoint}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  addColoringPage(token, param) {
    return axios.post(this.jwtConfig.addColoringPageEndpoint, param, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  updateColoringPage(token, param) {
    return axios.post(this.jwtConfig.updateColoringPageEndpoint, param, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  deleteColoringPage(token, param) {
    return axios.post(this.jwtConfig.deleteColoringPageEndpoint, param, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }


  // Exit Email actions

  getAllExitEmail(token) {
    return axios.get(this.jwtConfig.getAllExitEmailEndPoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  getExitEmailByID(token, id) {
    return axios.get(`${this.jwtConfig.getExitEmailByIDEndpoint}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  addExitEmail(token, param) {
    return axios.post(this.jwtConfig.addExitEmailEndpoint, param, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  updateExitEmail(token, param) {
    return axios.post(this.jwtConfig.updateExitEmailEndpoint, param, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  deleteExitEmail(token, param) {
    return axios.post(this.jwtConfig.deleteExitEmailEndpoint, param, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }


  getAllCamera(token) {
    return axios.get(this.jwtConfig.getAllCameraEndPoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  getCameraByID(token, id) {
    return axios.get(`${this.jwtConfig.getCameraByIDEndpoint}?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  addCamera(token, params) {
    return axios.post(this.jwtConfig.addCameraEndPoint, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }


  deleteCamera(id, token) {
    return axios.post(this.jwtConfig.deleteCameraEndpoint, { id: id }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  updateCamera(token, params) {
    return axios.post(this.jwtConfig.updateCameraEndpoint, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
  }

  checkCameraStatus(token, param) {
    const params = {
      'camera_ip': param.camera_ip,
      'userName': param.camera_user_name,
      'password': param.password
    }

    return axios.post(this.jwtConfig.checkCameraStatusEndPoint, params, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }


  sendColoringPDF(token, param) {
    return axios.post(this.jwtConfig.sendColoringPDFEndPoint, param, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
}
