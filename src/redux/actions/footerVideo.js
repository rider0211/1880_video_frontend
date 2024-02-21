import { action_type } from 'redux/action_type';
import useJwt from 'utils/jwt/useJwt';

export const getFooters = (token) => async (dispatch) => {
    try {
        useJwt
        .getFooters(token)
        .then(res => {
          if (res.status) {
            dispatch({type: action_type.FETCH_FOOTER_VIDEO, footer_video: res.data.data});
          }
        })
        .catch(err => {
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
      })
    } catch (error) {
        dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
    }
};

export const addFooter = (data) => async (dispatch) => {
    dispatch({type: action_type.ADD_NEW_FOOTER_VIDEO, footer_video: data});
    dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: 'Uploading Completed'});
};


export const removeFooter = (id, token) => async (dispatch) => {
    try {
        useJwt
        .deleteFooters(id, token)
        .then(res => {
          if (res.data.status) {
            dispatch({type: action_type.DELETE_FOOTER_VIDEO, footer_video: id});
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: 'Delete Successfully'});
          }
        })
        .catch(err => {
            console.log(err);
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
      })
    } catch (error) {
        dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
    }
};