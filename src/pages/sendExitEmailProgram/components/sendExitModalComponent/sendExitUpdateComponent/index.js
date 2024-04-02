import { Grid } from "@mui/material";
import NumberFormField from "../../formFieldComponents/numberFormField";
import PropTypes from "prop-types";
import SelectFormField from "../../formFieldComponents/selectFormField";
import TextFormField from "../../formFieldComponents/textFormField";
import { useSelector } from 'react-redux';

function SendExitUpdateComponent({ formData }) {

    const { formField, values, errors, touched } = formData;
    const cameraData = useSelector((state) => state.cameraReducer.cameraData);
    const {
        camera_id,
        wait_for_sec,
        text,
        from_email } = formField;

    const {
        camera_id: camera_id_V,
        wait_for_sec: wait_for_sec_V,
        text: text_V,
        from_email: from_email_V,
    } = values;

    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <SelectFormField
                    label={camera_id.label}
                    name={camera_id.name}
                    type={camera_id.type}
                    value={camera_id_V}
                    placeholder={camera_id.placeholder}
                    error={errors.camera_id && touched.camera_id}
                    success={camera_id_V.length > 0 && !errors.camera_id}
                    cameradata={cameraData}
                />
                <NumberFormField
                    label={wait_for_sec.label}
                    name={wait_for_sec.name}
                    type={wait_for_sec.type}
                    value={wait_for_sec_V}
                    placeholder={wait_for_sec.placeholder}
                    error={errors.wait_for_sec && touched.wait_for_sec}
                    success={wait_for_sec_V.length > 0 && !errors.wait_for_sec}
                />
                <TextFormField
                    label={text.label}
                    name={text.name}
                    type={text.type}
                    value={text_V}
                    placeholder={text.placeholder}
                    error={errors.text && touched.text}
                    success={text_V.length > 0 && !errors.text}
                />
                <TextFormField
                    label={from_email.label}
                    name={from_email.name}
                    type={from_email.type}
                    value={from_email_V}
                    placeholder={from_email.placeholder}
                    error={errors.from_email && touched.from_email}
                    success={from_email_V.length > 0 && !errors.from_email}
                />
            </Grid>
        </Grid>
    );
}

// typechecking props for Address
SendExitUpdateComponent.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default SendExitUpdateComponent;
