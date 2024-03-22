import { ErrorMessage, Field } from "formik";

import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiSelect from "components/VuiSelect";
import VuiTypography from "components/VuiTypography";
import { useFormikContext } from "formik";

function SelectFormField({ label, name, cameradata, value, ...rest }) {

  const { setFieldValue } = useFormikContext();
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
      <Field name={name}>
        {({
          field: { name, value }, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <VuiSelect
            defaultValue={{ value: value, label: cameradata.map((item) => item.id === value ? item.camera_name : '') }}
            options={cameradata.map((entry) => ({ value: entry.id, label: entry.camera_name }))}
            onChange={(e) => { setFieldValue(name, e.value) }}
          />
        )}
      </Field>
      <VuiBox mt={0.75}>
        <VuiTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

// typechecking props for FormField
SelectFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cameradata: PropTypes.array,
};

export default SelectFormField;
