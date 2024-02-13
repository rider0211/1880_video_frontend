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

// NewUser page components
import FormField from "pages/authentication/signup/components/FormField";
// @mui material components
import Grid from "@mui/material/Grid";
// prop-type is a library for typechecking of props
import PropTypes from "prop-types";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function ContactInfo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { contactname, contactemail, contactphonenumber } = formField;
  const { contactname: contactnameV, contactemail: contactemailV, contactphonenumber: contactphonenumberV } = values;

  return (
    <VuiBox>
      <VuiTypography variant="lg" color="white" fontWeight="bold">
        Contact Info
      </VuiTypography>
      <VuiBox mt={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormField
              label={contactname.label}
              name={contactname.name}
              value={contactnameV}
              placeholder={contactname.placeholder}
              error={errors.contactname && touched.contactname}
              success={contactnameV.length > 0 && !errors.contactname}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label={contactemail.label}
              name={contactemail.name}
              value={contactemailV}
              placeholder={contactemail.placeholder}
              error={errors.contactemail && touched.contactemail}
              success={contactemailV.length > 0 && !errors.contactemail}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label={contactphonenumber.label}
              name={contactphonenumber.name}
              value={contactphonenumberV}
              placeholder={contactphonenumber.placeholder}
              error={errors.contactphonenumber && touched.contactphonenumber}
              success={contactphonenumberV.length > 0 && !errors.contactphonenumber}
            />
          </Grid>
        </Grid>
      </VuiBox>
    </VuiBox>
  );
}
// typechecking props for Socials
ContactInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default ContactInfo;
