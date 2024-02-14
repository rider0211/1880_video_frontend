// reducer import

import selectReducer from './select';
import snackbar from './snackbar';
import useJwt from 'utils/jwt/useJwt';

const config = useJwt.jwtConfig;

// ==============================|| COMBINE REDUCER ||============================== //
// **  Initial State
const initialState = {
    userData: JSON.parse(localStorage.getItem('userData')) || {},
    [config.storageTokenKeyName]: localStorage.getItem(config.storageTokenKeyName) || null,
    [config.storageRefreshTokenKeyName]: localStorage.getItem(config.storageRefreshTokenKeyName) || null,
  }
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
        return {
            ...state,
            userData: action.data,
            [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName],
            [action.config.storageRefreshTokenKeyName]: action[action.config.storageRefreshTokenKeyName]
        }
        case 'LOGOUT':
            const obj = { ...action }
            delete obj.type
            return { ...state, userData: {}, ...obj }
        default:
        return state
    }
}

const reducer = {
    auth: authReducer,
    selected_user_type: selectReducer,
    snackbar: snackbar
};

export default reducer;
