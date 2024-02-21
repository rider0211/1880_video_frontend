import { action_type } from 'redux/action_type';
import useJwt from 'utils/jwt/useJwt';

const config = useJwt.jwtConfig

export const login = (param) => async (dispatch) => {
    try {
        useJwt
        .login(param)
        .then(res => {
            if (res.data.status) {
            const return_data = res.data.data;
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: 'Register completed successfully'});
            localStorage.setItem('userData', JSON.stringify(return_data))
            localStorage.setItem(config.storageUserIDKeyName, return_data.user_id)
            localStorage.setItem(config.storageTokenKeyName, return_data.access)
            localStorage.setItem(config.storageRefreshTokenKeyName, return_data.access)
            setTimeout(function(){
              dispatch({
                type: 'LOGIN',
                data: return_data,
                config,
                [config.storageTokenKeyName]: return_data.access,
                [config.storageRefreshTokenKeyName]: return_data.access
              })
            }, 100);
          } else {
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: res.data.data.msg});
          }
        })
        .catch(err => {
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
      })
    } catch (error) {
        dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
    }
};

export const handleLogout = () => async (dispatch) => {
    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageUserIDKeyName)
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)

    setTimeout(function(){
      dispatch({ type: action_type.LOGOUT, [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })
    }, 100);
}
