import { Form, Formik } from "formik";
import { addCameraVoice, updateCameraVoice } from "redux/actions/camera_voice";
import { useDispatch, useSelector } from "react-redux";

import AddCameraVoiceComponent from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceAddComponent";
import PropTypes from "prop-types";
import UpdateCameraVoiceComponent from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import add_form from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceAddComponent/schemas/form";
import add_initialValues from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceAddComponent/schemas/initialValues";
import add_validations from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceAddComponent/schemas/validations";
import { getAllCamera } from "redux/actions/camera";
import { getCameraVoiceByID } from "redux/actions/camera_voice";
import update_form from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent/schemas/form";
import update_initialValues from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent/schemas/initialValues";
import update_validations from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent/schemas/validations";
import { useEffect } from "react";

function CameraVoiceComponent({ customer_id, toogleModal, status }) {
    const { formId, formField } = status === -1 ? add_form : update_form;
    const dispatch = useDispatch();
    const selectedVoiceData = useSelector((state) => state.voiceReducer.selectedVoiceData);
    const userdata = useSelector((state) => state.auth.userData);

    const token = userdata.access;
    const handleSubmit = async (values, actions) => {
        const access_token = userdata.access;
        if (status === -1) {
            dispatch(addCameraVoice(access_token, values))
        } else {
            values.id = selectedVoiceData.id;
            dispatch(updateCameraVoice(access_token, values))
        }
        toogleModal();
    };

    useEffect(() => {
        dispatch(getAllCamera(token))
    }, [])
    if (status !== -1) {
        if (selectedVoiceData) {
            update_initialValues.camera_id = selectedVoiceData.camera_data.id
            update_initialValues.wait_for_sec = selectedVoiceData.wait_for_sec
            update_initialValues.enter_or_exit_code = selectedVoiceData.enter_or_exit_code
            update_initialValues.text = selectedVoiceData.text
        }
    }
    return (
        <Formik
            initialValues={status === -1 ? add_initialValues : update_initialValues}
            validationSchema={status === -1 ? add_validations[0] : update_validations[0]}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                    {status === -1 ? <AddCameraVoiceComponent formData={{ values, touched, formField, errors }} /> : <UpdateCameraVoiceComponent formData={{ values, touched, formField, errors }} />}
                    <VuiBox
                        display="flex"
                        justifyContent="center"
                        p={1.4}
                    >
                        <VuiButton
                            variant="contained"
                            color="error"
                            sx={{ width: '100%' }}
                            size="small"
                            disabled={isSubmitting}
                            type="submit"
                        >
                            Submit
                        </VuiButton>
                    </VuiBox>
                </Form>
            )}
        </Formik>
    );

}
CameraVoiceComponent.propTypes = {
    customer_id: PropTypes.number,
    toogleModal: PropTypes.func,
    status: PropTypes.number,
};
export default CameraVoiceComponent