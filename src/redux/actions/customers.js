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

export const deleteCustomer = (id, token) => async (dispatch) => {
    try {
        useJwt
        .deleteCustomer(id, token)
        .then(res => {
          if (res.data.status) {
            dispatch({type: action_type.DELETE_CUSTOMER, customer_id: id});
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: 'Delete Successfully'});
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

export const getCustomerByID = (token, param) => async (dispatch) => {

    try {
        useJwt
        .getCustomerByID(token, param)
        .then(res => {
            const address = res.data.street;
            if(address){
                const addressArray = address.split("_");
                const street = addressArray[0];
                const city = addressArray[1];
                const state = addressArray[2];
                const country = addressArray[3];
                const zipcode = addressArray[4];
                res.data = {...res.data, street, city, state, country, zipcode}
                dispatch({type: action_type.FETCH_CUSTOMER_BY_ID, selectedCustomerData: res.data});
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

export const updateCustomer = (token, param) => async (dispatch) => {
    try {
        useJwt
        .updateCustomer(token, param)
        .then(res => {
            if (res.data.status == "success") {
                dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'success', snack_bar_text: 'Updated Successfully'});
                return true;
            } else {
                console.log(res)
                dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: res.data.msg});
                return false;
            }
        })
        .catch(err => {
            console.log(err);
            dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Session Terminated'});
            if(err.response.status === 401){
              dispatch(handleLogout());
            }
            return false;
      })
    } catch (error) {
        console.log(error);
        dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
        return false;
    }
};