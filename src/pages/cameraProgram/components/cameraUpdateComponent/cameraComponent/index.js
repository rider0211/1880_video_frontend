import FormField from 'pages/cameraProgram/components/formField/index'
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

function CameraComponent({ formData }) {

    const { formField, values, errors, touched } = formData;

    const {
        camera_name,
        camera_ip,
        camera_port,
        camera_user_name,
        password,
    } = formField;

    const {
        camera_name: camera_name_V,
        camera_ip: camera_ip_V,
        camera_port: camera_port_V,
        camera_user_name: camera_user_name_V,
        password: password_V,
    } = values;

    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <FormField
                    label={camera_name.label}
                    name={camera_name.name}
                    type={camera_name.type}
                    value={camera_name_V}
                    placeholder={camera_name.placeholder}
                    error={errors.camera_name && touched.camera_name}
                    success={camera_name_V.length > 0 && !errors.camera_name}
                />
                <FormField
                    label={camera_ip.label}
                    name={camera_ip.name}
                    type={camera_ip.type}
                    value={camera_ip_V}
                    placeholder={camera_ip.placeholder}
                    error={errors.camera_ip && touched.camera_ip}
                    success={camera_ip_V.length > 0 && !errors.camera_ip}
                />
                <FormField
                    label={camera_port.label}
                    name={camera_port.name}
                    type={camera_port.type}
                    value={camera_port_V}
                    placeholder={camera_port.placeholder}
                    error={errors.camera_port && touched.camera_port}
                    success={camera_port_V.length > 0 && !errors.camera_port}
                />
                <FormField
                    label={camera_user_name.label}
                    name={camera_user_name.name}
                    type={camera_user_name.type}
                    value={camera_user_name_V}
                    placeholder={camera_user_name.placeholder}
                    error={errors.camera_user_name && touched.camera_user_name}
                    success={camera_user_name_V.length > 0 && !errors.camera_user_name}
                />
                <FormField
                    label={password.label}
                    name={password.name}
                    type={password.type}
                    value={password_V}
                    placeholder={password.placeholder}
                    error={errors.password && touched.password}
                    success={password_V.length > 0 && !errors.password}
                />
            </Grid>
        </Grid>
    );
}

// typechecking props for Address
CameraComponent.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default CameraComponent;
