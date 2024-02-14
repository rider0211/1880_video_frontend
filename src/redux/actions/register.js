import useJwt from 'utils/jwt/useJwt';

export const register = (param) => async (dispatch) => {
    try {
        useJwt
        .register(param)
        .then(res => {
            console.log(res);
        //   if (res.data.ResponseCode === 0) {
            // const data = res.data.ResponseResult
            // dispatch(handleLogin(data))
        //   } else {
        //   }
        })
        .catch(err => {
        //   setSnackBarMsg(err.message);
        //   setSnackBarOpen(true);
        console.log(err);
      })
        // dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
        // You might want to save the token here
    } catch (error) {
        console.log(error);
        // dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
};
