import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AddCameraVoiceComponent from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceAddComponent";
import PropTypes from "prop-types";
import UpdateCameraVoiceComponent from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import { addCameraVoice } from "redux/actions/camera_voice";
import add_form from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceAddComponent/schemas/form";
import add_initialValues from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceAddComponent/schemas/initialValues";
import add_validations from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceAddComponent/schemas/validations";
import { getAllCamera } from "redux/actions/camera";
import update_form from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent/schemas/form";
import update_initialValues from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent/schemas/initialValues";
import update_validations from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent/schemas/validations";
import { useEffect } from "react";

function CameraVoiceComponent({ customer_id, toogleModal, status }) {

    const { formId, formField } = status === -1 ? add_form : update_form;
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.auth.userData);
    const token = userdata.access;

    const handleSubmit = async (values, actions) => {
        const access_token = userdata.access;
        dispatch(addCameraVoice(access_token, values));
        toogleModal();
    };

    useEffect(() => {
        dispatch(getAllCamera(token))
    }, [])

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