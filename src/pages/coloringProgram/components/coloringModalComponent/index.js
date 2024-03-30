import { Form, Formik } from "formik";
import { addColoringPage, updateColoringPage } from "redux/actions/coloringPage";
import { useDispatch, useSelector } from "react-redux";

import AddColoringComponent from "./coloringAddComponent";
import UpdateColoringComponent from "./coloringUpdateComponent";

import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import add_form from "./coloringAddComponent/schemas/form";
import add_initialValues from "./coloringAddComponent/schemas/initialValues";
import add_validations from "./coloringAddComponent/schemas/validations";
import { getAllCamera } from "redux/actions/camera";
import update_form from "./coloringUpdateComponent/schemas/form";
import update_initialValues from "./coloringUpdateComponent/schemas/initialValues";
import update_validations from "./coloringUpdateComponent/schemas/validations";
import { useEffect } from "react";
import VuiDropzone from "components/VuiDropzone";

function ColoringModalComponent({ customer_id, toogleModal, status }) {
    const { formId, formField } = status === -1 ? add_form : update_form;
    const dispatch = useDispatch();
    const selectedColoringData = useSelector((state) => state.coloringReducer.selectedColoringData);
    const userdata = useSelector((state) => state.auth.userData);

    const token = userdata.access;

    let coloringPDF;

    const handleSubmit = async (values, actions) => {
        const access_token = userdata.access;
        if (status !== -1) {
            if (coloringPDF !== undefined) {
                values.coloringpage = coloringPDF;
            }
        } else {
            values.coloringpage = coloringPDF;
        }
        if (status === -1) {
            dispatch(addColoringPage(access_token, values))
        } else {
            values.id = selectedColoringData.id;
            dispatch(updateColoringPage(access_token, values))
        }
        toogleModal();
    };

    useEffect(() => {
        dispatch(getAllCamera(token))
    }, [])

    if (status !== -1) {
        if (selectedColoringData) {
            update_initialValues.camera_id = selectedColoringData.camera.id
            update_initialValues.wait_for_sec = selectedColoringData.wait_for_sec
            update_initialValues.enter_or_exit_code = selectedColoringData.enter_or_exit_code
            update_initialValues.text = selectedColoringData.text
        }
    }
    return (
        <>
            <VuiDropzone
                options={{
                    addRemoveLinks: true,
                    autoProcessQueue: false,
                    init: function () {
                        this.on('addedfile', (file) => {
                            if (this.files.length > 1) {
                                this.removeFile(this.files[0]);
                            }
                            coloringPDF = file;
                        })
                    }
                }}
            />
            <Formik
                initialValues={status === -1 ? add_initialValues : update_initialValues}
                validationSchema={status === -1 ? add_validations[0] : update_validations[0]}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, isSubmitting }) => (
                    <Form id={formId} autoComplete="off">
                        {status === -1 ? <AddColoringComponent formData={{ values, touched, formField, errors }} /> : <UpdateColoringComponent formData={{ values, touched, formField, errors }} />}
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
ColoringModalComponent.propTypes = {
    customer_id: PropTypes.number,
    toogleModal: PropTypes.func,
    status: PropTypes.number,
};
export default ColoringModalComponent