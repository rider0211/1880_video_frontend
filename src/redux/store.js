import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducer,
})

export { store };
