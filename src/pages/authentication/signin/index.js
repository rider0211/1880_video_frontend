import { Form, Formik } from "formik";

import GradientBorder from "examples/GradientBorder";
import { Link } from "react-router-dom";
import LoginInfo from "./components";
import LoginLayout from "pages/authentication/components/LoginLayout";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";
import bgBasic from "assets/images/background-basic-auth.png";
import borders from "assets/theme/base/borders";
import form from "pages/authentication/signin/schemas/form";
import initialValues from "./schemas/initialValues";
import { login } from "redux/actions/login";
import { useDispatch } from 'react-redux'
import validations from "pages/authentication/signin/schemas/validations";

function Basic() {
  const currentValidation = validations[0];
  const dispatch = useDispatch()

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const { formId, formField } = form;

  return (
    <LoginLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgBasic}
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.main,
          })}
        >
          <VuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="24px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            Login
          </VuiTypography>
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidation}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form id={formId} autoComplete="off">
                <LoginInfo formData={{ values, touched, formField, errors }} />
                <VuiBox mt={4} mb={1}>
                  <VuiButton
                    disabled={isSubmitting}
                    type="submit"
                    color="info"
                    fullWidth
                  >
                    SIGN IN
                  </VuiButton>
                </VuiBox>
              </Form>
            )}
          </Formik>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Don't have an account?{" "}
              <VuiTypography
                component={Link}
                to="/register"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign up
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </LoginLayout>
  );
}

export default Basic;
