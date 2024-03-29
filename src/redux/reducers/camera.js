import { action_type } from "redux/action_type";

// ==============================|| COMBINE REDUCER ||============================== //
// **  Initial State
const initialState = {
    cameraData: [],
    selectedCameraData: [],
}

const cameraReducer = (state = initialState, action) => {
    switch (action.type) {
        case action_type.FETCH_ALL_CAMERA:
            return { ...state, cameraData: action.cameraData }

        case action_type.FETCH_CAMERA_BY_ID:
            return { ...state, selectedCameraData: action.cameraData }

        case action_type.ADD_CAMERA:
            let aCamera = [...state.cameraData];
            aCamera.push(action.cameraData);
            return { ...state, cameraData: aCamera }

        case action_type.DELETE_CAMERA:
            const camera_id = action.camera_data_id;
            let rCamera = [...state.cameraData];
            for (let i = 0; i < rCamera.length; i++) {
                const item = rCamera[i];
                if (item.id == camera_id) {
                    rCamera.splice(i, 1);
                    break
                }
            }
            return { ...state, cameraData: rCamera }

        case action_type.UPDATE_CAMERA:
            let allData = [...state.cameraData];
            for (let i = 0; i < allData.length; i++) {
                const cameraDataTmp = allData[i];
                if (cameraDataTmp.id == action.cameraData.id) {
                    allData[i] = action.cameraData;
                    break;
                }
            }
            return { ...state, cameraData: allData }

        default:
            return state
    }
}

export default cameraReducer;
