import { action_type } from "redux/action_type";

// ==============================|| COMBINE REDUCER ||============================== //
// **  Initial State
const initialState = {
    clientData: [],
  }
  
const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case action_type.FETCH_CLIENT:
            return {...state, clientData: action.clientData}

        case action_type.FETCH_CLIENT_BY_ID:
            return {...state, clientData: action.clientData}

        case action_type.ADD_CLIENT:
            let aClient = [...state.clientData];
            aClient.push(action.clientData);
            return { ...state, clientData: aClient }
        default:
            return state
    }
}


export default customerReducer;
