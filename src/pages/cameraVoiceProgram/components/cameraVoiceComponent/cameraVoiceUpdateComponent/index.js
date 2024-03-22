import { Grid } from "@mui/material";
import NumberFormField from "pages/cameraVoiceProgram/components/formFieldComponents/numberFormField";
import OptionFormField from "pages/cameraVoiceProgram/components/formFieldComponents/optionFormField";
import PropTypes from "prop-types";
import SelectFormField from "pages/cameraVoiceProgram/components/formFieldComponents/selectFormField";
import TextFormField from "pages/cameraVoiceProgram/components/formFieldComponents/textFormField";
import { useSelector } from 'react-redux';

function UpdateCameraVoiceComponent({ formData }) {

    const { formField, values, errors, touched } = formData;
    const cameraData = useSelector((state) => state.cameraReducer.cameraData);
    const {
        camera_id,
        wait_for_sec,
        enter_or_exit_code,
        text, } = formField;

    const {
        camera_id: camera_id_V,
        wait_for_sec: wait_for_sec_V,
        enter_or_exit_code: enter_or_exit_code_V,
        text: text_V,
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
                <OptionFormField
                    label={enter_or_exit_code.label}
                    name={enter_or_exit_code.name}
                    type={enter_or_exit_code.type}
                    value={enter_or_exit_code_V}
                    placeholder={enter_or_exit_code.placeholder}
                    error={errors.enter_or_exit_code && touched.enter_or_exit_code}
                    success={enter_or_exit_code_V.length > 0 && !errors.enter_or_exit_code}
                />
            </Grid>
        </Grid>
    );
}

// typechecking props for Address
UpdateCameraVoiceComponent.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UpdateCameraVoiceComponent;
