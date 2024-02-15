import FormField from "pages/authentication/signup/components/FormField";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";

function LoginInfo({ formData }) {
    const { formField, values, errors, touched } = formData;
    const { email, password } = formField;
    const { email: emailV, password: passwordV } = values;

    return (
        <>
            <VuiBox mb={2}>
                <FormField
                    label={email.label}
                    name={email.name}
                    type={email.type}
                    value={emailV}
                    placeholder={email.placeholder}
                    error={errors.email && touched.email}
                    success={emailV.length > 0 && !errors.email}
                />
            </VuiBox>
            <VuiBox mb={2}>
                <FormField
                    label={password.label}
                    name={password.name}
                    type={password.type}
                    value={passwordV}
                    placeholder={password.placeholder}
                    error={errors.password && touched.password}
                    success={passwordV.length > 0 && !errors.password}
                />
            </VuiBox>
        </>
    );
}

// typechecking props for Address
LoginInfo.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default LoginInfo;
