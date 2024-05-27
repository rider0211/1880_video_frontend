import { alert_error_from_server, alert_forbiden_error, alert_session_terminated, alert_send_coloringpdf_success } from './warningMsgFunc';

import { action_type } from 'redux/action_type';
import { handleLogout } from './login';
import useJwt from 'utils/jwt/useJwt';


export const sendColoringPDF = (token, param) => async (dispatch) => {
    try {
        useJwt
            .sendColoringPDF(token, param)
            .then(res => {
                if (res.status) {
                    dispatch(alert_send_coloringpdf_success());
                }
            })
            .catch(err => {
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
