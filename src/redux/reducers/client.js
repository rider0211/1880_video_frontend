import { action_type } from "redux/action_type";

// ==============================|| COMBINE REDUCER ||============================== //
// **  Initial State
const initialState = {
    clientData: [],
    selectClient: -1,
  }
  
const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case action_type.FETCH_CLIENT:
            return {...state, clientData: action.clientData}

        case action_type.FETCH_CLIENT_BY_ID:
            return {...state, clientData: action.clientData}

        case action_type.ADD_CLIENT:
            let aClient = [...state.clientData];
            aClient.push(action.clientData);
            return { ...state, clientData: aClient }
        
        case action_type.SET_SELECT_CLIENT:
            return {...state, selectClient: action.client_id}
        default:
            return state
    }
}


export default clientReducer;
