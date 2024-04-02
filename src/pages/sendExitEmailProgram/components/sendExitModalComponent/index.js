import { Form, Formik } from "formik";
import { addExitEmail, updateExitEmail } from "redux/actions/exitEmail";
import { useDispatch, useSelector } from "react-redux";

import SendExitAddComponent from "./sendExitAddComponent";
import SendExitUpdateComponent from "./sendExitUpdateComponent";

import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import add_form from "./sendExitAddComponent/schemas/form";
import add_initialValues from "./sendExitAddComponent/schemas/initialValues";
import add_validations from "./sendExitAddComponent/schemas/validations";
import { getAllCamera } from "redux/actions/camera";
import update_form from "./sendExitUpdateComponent/schemas/form";
import update_initialValues from "./sendExitUpdateComponent/schemas/initialValues";
import update_validations from "./sendExitUpdateComponent/schemas/validations";
import { useEffect } from "react";

function SendExitModalComponent({ customer_id, toogleModal, status }) {
    const { formId, formField } = status === -1 ? add_form : update_form;
    const dispatch = useDispatch();
    const selectedExitEmailData = useSelector((state) => state.exitEmailReducer.selectedExitEmailData);
    const userdata = useSelector((state) => state.auth.userData);

    const token = userdata.access;

    const handleSubmit = async (values, actions) => {
        const access_token = userdata.access;
        if (status === -1) {
            dispatch(addExitEmail(access_token, values))
        } else {
            values.id = selectedExitEmailData.id;
            dispatch(updateExitEmail(access_token, values))
        }
        toogleModal();
    };

    useEffect(() => {
        dispatch(getAllCamera(token))
    }, [])

    if (status !== -1) {
        if (selectedExitEmailData) {
            update_initialValues.camera_id = selectedExitEmailData.camera.id
            update_initialValues.wait_for_sec = selectedExitEmailData.wait_for_sec
            update_initialValues.enter_or_exit_code = selectedExitEmailData.enter_or_exit_code
            update_initialValues.text = selectedExitEmailData.text
            update_initialValues.from_email = selectedExitEmailData.from_email
        }
    }
    return (
        <>
            <Formik
                initialValues={status === -1 ? add_initialValues : update_initialValues}
                validationSchema={status === -1 ? add_validations[0] : update_validations[0]}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, isSubmitting }) => (
                    <Form id={formId} autoComplete="off">
                        {status === -1 ? <SendExitAddComponent formData={{ values, touched, formField, errors }} /> : <SendExitUpdateComponent formData={{ values, touched, formField, errors }} />}
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
        </>
    );

}
SendExitModalComponent.propTypes = {
    customer_id: PropTypes.number,
    toogleModal: PropTypes.func,
    status: PropTypes.number,
};
export default SendExitModalComponent