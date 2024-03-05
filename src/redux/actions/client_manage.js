import { action_type } from 'redux/action_type';
import { handleLogout } from './login';
import useJwt from 'utils/jwt/useJwt';

export const addClient = (token, param) => async (dispatch) => {
    try {
        useJwt
        .addClient(token, param)
        .then(res => {
          console.log(res);
          if(res.data.status){
            const data = res.data.data;
            dispatch({type: action_type.ADD_CLIENT, clientData: data});
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: 'Register Successed'});
          }
        })
        .catch(err => {
            console.log(err)
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Session Terminated'});
            if(err.response.status === 401){
              dispatch(handleLogout());
            }
      })
    } catch (error) {
        console.log(error)
        dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
    }
};
