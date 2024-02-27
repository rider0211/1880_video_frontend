import { action_type } from 'redux/action_type';
import { handleLogout } from './login';
import useJwt from 'utils/jwt/useJwt';

export const getCustomers = (token, param) => async (dispatch) => {

    try {
        useJwt
        .getCustomers(token, param)
        .then(res => {
          if (res.status) {
            dispatch({type: action_type.FETCH_CUSTOMERS, customerTempData: res.data});
          }
        })
        .catch(err => {
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Session Terminated'});
            if(err.response.status === 401){
              dispatch(handleLogout());
            }
      })
    } catch (error) {
        dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
    }
};
