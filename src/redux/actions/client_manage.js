import { alert_error_from_server, alert_forbiden_error, alert_register_success, alert_session_terminated } from './warningMsgFunc';

import { action_type } from 'redux/action_type';
import { handleLogout } from './login';
import useJwt from 'utils/jwt/useJwt';

export const addClient = (token, param) => async (dispatch) => {
  try {
    useJwt
      .addClient(token, param)
      .then(res => {
        console.log(res);
        if (res.data.status) {
          const data = res.data.data;
          dispatch({ type: action_type.ADD_CLIENT, clientData: data });
          dispatch({ type: action_type.RESET_CLIENT_PHOTO });
          dispatch(alert_register_success());
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(alert_session_terminated());
          dispatch(handleLogout());
        }else if(err.response.status === 403){
          dispatch(alert_forbiden_error());
        }else{
          dispatch(alert_error_from_server());
        }
      })
  } catch (error) {
    console.log(error)
    dispatch(alert_error_from_server());
  }
};

export const getClientByCustomerID = (token, param) => async (dispatch) => {
  try {
    useJwt
      .getClientByCustomerID(token, param)
      .then(res => {
        if (res.data.status)
          dispatch({ type: action_type.FETCH_CLIENT_BY_ID, clientData: res.data.data });
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(alert_session_terminated());
          dispatch(handleLogout());
        }else if(err.response.status === 403){
          dispatch(alert_forbiden_error());
        } else {
          dispatch(alert_error_from_server());
        }
      })
  } catch (error) {
    dispatch(alert_error_from_server());
  }
};

export const addChild = (token, param) => async (dispatch) => {
  try {
    useJwt
      .addChild(token, param)
      .then(res => {
        if (res.data.status) {
          dispatch({ type: action_type.RESET_CLIENT_PHOTO });
          dispatch(alert_register_success())
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(alert_session_terminated());
          dispatch(handleLogout());
        }else if(err.response.status === 403){
          dispatch(alert_forbiden_error());
        }else{
          dispatch(alert_error_from_server());
        }
      })
  } catch (error) {
    console.log(error)
    dispatch(alert_error_from_server());
  }
};

export const deleteClient = (id, token) => async (dispatch) => {
  try {
    useJwt
      .deleteClient(id, token)
      .then(res => {
        if (res.data.status) {
          dispatch({ type: action_type.DELETE_CLIENT, client_id: id });
          dispatch(alert_delete_success());
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          dispatch(alert_session_terminated());
          dispatch(handleLogout());
        }else if(err.response.status === 403){
          dispatch(alert_session_terminated());
        }else{
          dispatch(alert_error_from_server());
        }
      })
  } catch (error) {
    dispatch(alert_error_from_server());
  }
};

export const getClientByClientID = (token, param) => async (dispatch) => {
  try {
    useJwt
      .getClientByClientID(token, param)
      .then(res => {
        if (res.data.status)
          dispatch({ type: action_type.SELECTED_CLIEND_DATA, clientData: res.data.data });
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(alert_session_terminated());
          dispatch(handleLogout());
        }else if(err.response.status === 403){
          dispatch(alert_forbiden_error());
        } else {
          dispatch(alert_error_from_server());
        }
      })
  } catch (error) {
    dispatch(alert_error_from_server());
  }
};