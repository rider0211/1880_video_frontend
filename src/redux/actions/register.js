import { alert_error_from_server, alert_register_success } from './warningMsgFunc';

import { action_type } from 'redux/action_type';
import useJwt from 'utils/jwt/useJwt';

export const register = (param) => async (dispatch) => {
  try {
    useJwt
      .register(param)
      .then(res => {
        if (res.status) {
          dispatch(alert_register_success());
        } else {
          dispatch(alert_error_from_server());
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(alert_error_from_server());
      })
  } catch (error) {
    console.log(error);
    dispatch(alert_error_from_server());
  }
};
