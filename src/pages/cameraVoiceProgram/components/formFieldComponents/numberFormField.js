import { ErrorMessage, Field } from "formik";
import PropTypes, { number } from "prop-types";

import VuiBox from "components/VuiBox";
import VuiInput from "components/VuiInput";
import VuiTypography from "components/VuiTypography";

function NumberFormField({ label, name, ...rest }) {
  return (
    <VuiBox mb={1.5}>
      <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <VuiTypography
          component="label"
          variant="caption"
          color="white"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </VuiTypography>
      </VuiBox>
      <Field {...rest} name={name} as={VuiInput} type={'number'}/>
      <VuiBox mt={0.75}>
        <VuiTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

// typechecking props for FormField
NumberFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default NumberFormField;
