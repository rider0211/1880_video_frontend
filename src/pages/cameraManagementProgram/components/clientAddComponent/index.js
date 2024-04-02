import { Form, Formik } from "formik";
import { useDispatch, useSelector } from 'react-redux';

import ClientComponent from "./clientComponent";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import { action_type } from "redux/action_type";
import { addClient } from "redux/actions/client_manage";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";

function ClientAddComponent(props) {
    const { formId, formField } = form;
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.auth.userData);

    const handleSubmit = async (values, actions) => {
        values.customer_id = userdata.user_id;
        values.tour_status = false;
        values.paid_status = false;
        const access_token = userdata.access;
        dispatch(addClient(access_token, values));
        props.toogleModal();
    };

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
                            Register Client
                        </VuiButton>
                    </VuiBox>
                </Form>
            )}
        </Formik>
    );

}

export default ClientAddComponent