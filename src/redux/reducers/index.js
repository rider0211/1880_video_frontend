// reducer import

import cameraReducer from './camera';
import clientReducer from './client';
import customerReducer from './customers';
import footerVideoReducer from './footerVideo';
import headerVideoReducer from './headerVideo';
import selectReducer from './select';
import snackbar from './snackbar';
import useJwt from 'utils/jwt/useJwt';
import voiceReducer from './cameraVoice';
import webCamReducer from './webcam';
import coloringReducer from './coloring';
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
    snackbar: snackbar,
    headerVideos: headerVideoReducer,
    footerVideos: footerVideoReducer,
    customers: customerReducer,
    webCamReducer: webCamReducer,
    clientReducer: clientReducer,
    voiceReducer: voiceReducer,
    cameraReducer: cameraReducer,
    coloringReducer: coloringReducer,
};

export default reducer;
