// Example action creator for register
// src/redux/actions.js

import axios from 'axios';
import useJwt from 'utils/jwt/useJwt';

export const register = (param) => async (dispatch) => {
    // try {
    //     useJwt
    //     .register(param)
    //     .then(res => {
    //         console.log(res);
    //     //   if (res.data.ResponseCode === 0) {
    //         // const data = res.data.ResponseResult
    //         // dispatch(handleLogin(data))
    //     //   } else {
    //     //   }
    //     })
    //     .catch(err => {
    //     //   setSnackBarMsg(err.message);
    //     //   setSnackBarOpen(true);
    //     console.log(err);
    //   })
    //     // dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
    //     // You might want to save the token here
    // } catch (error) {
    //     console.log(error);
    //     // dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    // }
    axios.post("http://192.168.40.28:8000/api/v1/auth/register", param).then(res => console.log(res)).catch(err => console.log(err));
};
