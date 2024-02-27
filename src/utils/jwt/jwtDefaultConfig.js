export default {
  //** Auth Endpoints

  loginEndpoint: `${process.env.REACT_APP_BASE_API_URL}/auth/login`,
  forgotPasswordEndpoint: `${process.env.REACT_APP_BASE_API_URL}/auth/forgot_password`,
  resetForgotPasswordEndpoint: `${process.env.REACT_APP_BASE_API_URL}/auth/reset_forgot_password`,
  registerEndpoint: `${process.env.REACT_APP_BASE_API_URL}/auth/register`,
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: `${process.env.REACT_APP_BASE_API_URL}/auth/logout`,
  resetPasswordEndpoint: `${process.env.REACT_APP_BASE_API_URL}/auth/reset/`,

  //** Header Endpoints

  headerAddEndpoint: `${process.env.REACT_APP_BASE_API_URL}/admin/header/add`,
  headerGetEndpoint: `${process.env.REACT_APP_BASE_API_URL}/admin/header`,
  headerDeleteEndpoint: `${process.env.REACT_APP_BASE_API_URL}/admin/header/delete`,

  //** Footer Endpoints

  footerAddEndpoint: `${process.env.REACT_APP_BASE_API_URL}/admin/footer/add`,
  footerGetEndpoint: `${process.env.REACT_APP_BASE_API_URL}/admin/footer`,
  footerDeleteEndpoint: `${process.env.REACT_APP_BASE_API_URL}/admin/footer/delete`,
  

  getCustomersEndpoint: `${process.env.REACT_APP_BASE_API_URL}/auth/users/range`,
  customerDeleteEndpoint: `${process.env.REACT_APP_BASE_API_URL}/auth/delete`,



  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageUserIDKeyName: 'user_id',
  storageRefreshTokenKeyName: 'refreshToken'
}
