import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Form, Formik } from "formik";

import GradientBorder from "examples/GradientBorder";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import LoginInfo from "./components";
import LoginLayout from "pages/authentication/components/LoginLayout";
import Stack from "@mui/material/Stack";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import VuiTypography from "components/VuiTypography";
import bgBasic from "assets/images/background-basic-auth.png";
import borders from "assets/theme/base/borders";
import form from "pages/authentication/signin/schemas/form";
import initialValues from "./schemas/initialValues";
import { login } from "redux/actions/login";
import rgba from "assets/theme/functions/rgba";
import { useDispatch } from 'react-redux'
import { useState } from "react";
import validations from "pages/authentication/signin/schemas/validations";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
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
            Register with
          </VuiTypography>
          <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderRadius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaFacebook}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderRadius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaApple}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderRadius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaGoogle}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
          </Stack>
          <VuiTypography
            color="text"
            fontWeight="bold"
            textAlign="center"
            mb="14px"
            sx={({ typography: { size } }) => ({ fontSize: size.lg })}
          >
            or
          </VuiTypography>
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidation}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form id={formId} autoComplete="off">
                <LoginInfo formData={{ values, touched, formField, errors }} />
                <VuiBox display="flex" alignItems="center">
                  <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
                  <VuiTypography
                    variant="caption"
                    color="white"
                    fontWeight="medium"
                    onClick={handleSetRememberMe}
                    sx={{ cursor: "pointer", userSelect: "none" }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;Remember me
                  </VuiTypography>
                </VuiBox>
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
