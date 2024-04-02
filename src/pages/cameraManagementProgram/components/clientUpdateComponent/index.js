import { Form, Formik } from "formik";
import { useDispatch, useSelector } from 'react-redux';

import ClientComponent from "./clientComponent";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import { action_type } from "redux/action_type";
import form from "./schemas/form";
import { getClientByClientID } from "redux/actions/client_manage";
import initialValues from "./schemas/initialValues";
import { updateClientByClientID } from "redux/actions/client_manage";
import { useEffect } from "react";
import validations from "./schemas/validations";

function ClientUpdateComponent(props) {
    const { formId, formField } = form;
    const dispatch = useDispatch();

    const selected_client_data = useSelector((state) => state.clientReducer.selectedClientData);
    const client_update_modal_status = useSelector((state) => state.clientReducer.clientUpdateModalStatus);

    const userdata = useSelector((state) => state.auth.userData);

    const client_id = { 'client_id': props.client_id };
    const access_token = userdata.access;

    const toogleClientModal = (id) => {
        dispatch({ type: action_type.SELECT_FOR_UPDATE_CLIENT, status: id });
        dispatch({ type: action_type.CLIENT_UPDATE_MODAL_STATUS, status: !client_update_modal_status });
    }

    useEffect(() => {
        dispatch(getClientByClientID(access_token, client_id));
    }, [])

    const handleSubmit = async (values, actions) => {
        values.client_id = props.client_id;
        values.tour_status = selected_client_data.tour_status;
        values.paid_status = selected_client_data.paid_status;
        dispatch(updateClientByClientID(access_token, values));
        toogleClientModal(-1);
    };

    if (selected_client_data.length != 0) {
        initialValues.client_name = selected_client_data.client_name
        initialValues.client_email = selected_client_data.client_email
        initialValues.rfid_tag = selected_client_data.rfid_tag
        initialValues.get_same_video = selected_client_data.get_same_video
        initialValues.appears_in_others_video = selected_client_data.appears_in_others_video
        initialValues.voice_can_be_recorded = selected_client_data.voice_can_be_recorded
        initialValues.be_shown_potential = selected_client_data.be_shown_potential
        initialValues.be_shown_public_business = selected_client_data.be_shown_public_business
        initialValues.be_shown_social_media = selected_client_data.be_shown_social_media
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validations[0]}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                    <ClientComponent formData={{ values, touched, formField, errors }} />
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
                            Update Client
                        </VuiButton>
                    </VuiBox>
                </Form>
            )}
        </Formik>
    );

}

export default ClientUpdateComponent