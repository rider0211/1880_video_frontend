import { alert_delete_success, alert_error_from_server, alert_forbiden_error, alert_register_success, alert_session_terminated, alert_update_success } from './warningMsgFunc';

import { action_type } from 'redux/action_type';
import { handleLogout } from './login';
import useJwt from 'utils/jwt/useJwt';

export const getAllCamera = (token) => async (dispatch) => {
  try {
    useJwt
      .getAllCamera(token)
      .then(res => {
        if (res.data.status)
          dispatch({ type: action_type.FETCH_ALL_CAMERA, cameraData: res.data.data });
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(alert_session_terminated());
          dispatch(handleLogout());
        } else if (err.response.status === 403) {
          dispatch(alert_forbiden_error());
        } else {
          dispatch(alert_error_from_server());
        }
      })
  } catch (error) {
    dispatch(alert_error_from_server());
  }
};
