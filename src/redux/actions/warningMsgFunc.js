import { action_type } from 'redux/action_type';
import warningMsg from 'utils/warningMsg';

export const alert_register_success = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: warningMsg.REGISTER_SUCCESS });
export const alert_delete_success = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: warningMsg.DELETE_SUCCESSED });
export const alert_update_success = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: warningMsg.UPDATED_SUCCESSED });
export const alert_upload_success = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: warningMsg.UPLOAD_SUCCESSED });
export const alert_login_success = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: warningMsg.LOGIN_PASSED });
export const alert_send_coloringpdf_success = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: warningMsg.SEND_COLORING_PDF });

export const alert_error_from_server = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.ERROR_OCCURED_FROM_SERVER });
export const alert_forbiden_error = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.FORBIDEN });
export const alert_session_terminated = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.SESSION_TERMINATED });
export const alert_error_from_client = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.ERROR_OCCURED_FROM_CLIENT });
export const alert_invalid_login_info = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.INVALID_LOGIN_INFO });
export const alert_invalid_faces = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.INVALID_FACES });
export const alert_client_not_selected = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.CLIENT_NOT_SELECTED });
export const alert_now_allowed = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.CLIENT_NOT_ALLOWED });

export const alert_proxy_not_working = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.PROXY_NOT_EXISTS });
export const alert_duplicate_camera = () => async (dispatch) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: warningMsg.DUPLICATED_CAMERA });

