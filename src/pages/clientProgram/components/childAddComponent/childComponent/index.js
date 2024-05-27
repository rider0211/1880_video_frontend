import FormField from "pages/webCamCapture/components/formField";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import RFIDFormField from 'pages/clientProgram/components/formField/rfid_form_field';

function ChildComponent({ formData }) {

    const { formField, values, errors, touched } = formData;

    const { children_name } = formField;

    const {
        children_name: children_name_V,
        // rfid_tag: rfid_tag_V
    } = values;

    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <FormField
                    label={children_name.label}
                    name={children_name.name}
                    type={children_name.type}
                    value={children_name_V}
                    placeholder={children_name.placeholder}
                    error={errors.children_name && touched.children_name}
                    success={children_name_V.length > 0 && !errors.children_name}
                />
                {/* <RFIDFormField
                    label={rfid_tag.label}
                    name={rfid_tag.name}
                    type={rfid_tag.type}
                    value={rfid_tag_V}
                    placeholder={rfid_tag.placeholder}
                    error={errors.rfid_tag && touched.rfid_tag}
                    success={rfid_tag_V.length > 0 && !errors.rfid_tag}
                /> */}
            </Grid>
        </Grid>
    );
}

// typechecking props for Address
ChildComponent.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default ChildComponent;
