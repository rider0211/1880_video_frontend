// src/redux/store.js

import { applyMiddleware, combineReducers, createStore } from 'redux';

import authReducer from 'redux/reducers/AuthReducer';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
