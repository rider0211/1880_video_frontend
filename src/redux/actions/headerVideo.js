import { action_type } from 'redux/action_type';
import { handleLogout } from './login';
import useJwt from 'utils/jwt/useJwt';

export const getHeaders = (token) => async (dispatch) => {
    try {
        useJwt
        .getHeaders(token)
        .then(res => {
          if (res.status) {
            dispatch({type: action_type.FETCH_VIDEO, header_video: res.data.data});
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

export const addHeader = (data) => async (dispatch) => {
    dispatch({type: action_type.ADD_NEW_VIDEO, header_video: data});
    dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: 'Uploading Completed'});
};


export const removeHeader = (id, token) => async (dispatch) => {
    try {
        useJwt
        .deleteHeaders(id, token)
        .then(res => {
          if (res.data.status) {
            dispatch({type: action_type.DELETE_NEW_VIDEO, header_video: id});
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: 'Delete Successfully'});
          }
        })
        .catch(err => {
            console.log(err);
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Session Terminated'});
            if(err.response.status === 401){
              dispatch(handleLogout());
            }
      })
    } catch (error) {
        dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
    }
};