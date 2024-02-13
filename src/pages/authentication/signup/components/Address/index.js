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
import VuiInput from "components/VuiInput";
import VuiTypography from "components/VuiTypography";

function Address({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { address1, country, city, state, zip } = formField;
  const { address1: address1V, country: countryV, city: cityV, state: stateV, zip: zipV } = values;

  return (
    <VuiBox>
      <VuiTypography variant="lg" color="white" fontWeight="bold">
        Address
      </VuiTypography>
      <VuiBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <VuiBox mt={-1.625}>
                <FormField
                  label={country.label}
                  name={country.name}
                  value={countryV}
                  placeholder={country.placeholder}
                  error={errors.country && touched.country}
                  success={countryV.length > 0 && !errors.countryV}
                />
              </VuiBox>
          </Grid>
          <Grid item xs={12}>
            <FormField
              label={address1.label}
              name={address1.name}
              value={address1V}
              placeholder={address1.placeholder}
              error={errors.address1 && touched.address1}
              success={address1V.length > 0 && !errors.address1}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label={city.label}
              name={city.name}
              value={cityV}
              placeholder={city.placeholder}
              error={errors.city && touched.city}
              success={cityV.length > 0 && !errors.city}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormField
                label={state.label}
                name={state.name}
                value={stateV}
                placeholder={state.placeholder}
                error={errors.state && touched.state}
                success={stateV.length > 0 && !errors.state}
              />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormField
              label={zip.label}
              name={zip.name}
              value={zipV}
              placeholder={zip.placeholder}
              error={errors.zip && touched.zip}
              success={zipV.length > 0 && !errors.zip}
            />
          </Grid>
        </Grid>
      </VuiBox>
    </VuiBox>
  );
}

// typechecking props for Address
Address.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Address;
