/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

// formik components
import { Form, Formik } from "formik";

import Address from "pages/authentication/signup/components/Address";
import BasicLayout from "pages/authentication/components/BasicLayout";
import Card from "@mui/material/Card";
// Vision UI Dashboard PRO React example components
// @mui material components
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Profile from "pages/authentication/signup/components/Profile";
import Socials from "pages/authentication/signup/components/Socials";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
// NewUser page components
import UserInfo from "pages/authentication/signup/components/UserInfo";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";
import bgBasic from "assets/images/background-basic-auth.png";
import form from "pages/authentication/signup/schemas/form";
import initialValues from "pages/authentication/signup/schemas/initialValues";
import { useState } from "react";
// NewUser layout schemas for form and form feilds
import validations from "pages/authentication/signup/schemas/validations";

function getSteps() {
  return ["User Info", "Address", "Social", "Profile"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    case 1:
      return <Address formData={formData} />;
    case 2:
      return <Socials formData={formData} />;
    case 3:
      return <Profile formData={formData} />;
    default:
      return null;
  }
}

function NewUser() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    await sleep(1000);

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));

    actions.setSubmitting(false);
    actions.resetForm();

    setActiveStep(0);
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="create new account for free."
      image={bgBasic}
    >
      <VuiBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <VuiBox>
                      <VuiBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                        })}
                        <VuiBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <VuiBox />
                          ) : (
                            <VuiButton
                              variant="gradient"
                              sx={{ minWidth: "100px" }}
                              color="light"
                              onClick={handleBack}
                            >
                              prev
                            </VuiButton>
                          )}
                          <VuiButton
                            disabled={isSubmitting}
                            type="submit"
                            sx={{ minWidth: "100px" }}
                            color="info"
                          >
                            {isLastStep ? "send" : "next"}
                          </VuiButton>
                        </VuiBox>
                      </VuiBox>
                    </VuiBox>
                  </Card>
                </Form>
              )}
            </Formik>
            <VuiBox mt={3} textAlign="center">
              <VuiTypography variant="button" color="text" fontWeight="regular">
                Already have an account?{" "}
                <VuiTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="white"
                  fontWeight="medium"
                >
                  Sign in
                </VuiTypography>
              </VuiTypography>
            </VuiBox>
          </Grid>
        </Grid>
      </VuiBox>
    </BasicLayout>
  );
}

export default NewUser;
