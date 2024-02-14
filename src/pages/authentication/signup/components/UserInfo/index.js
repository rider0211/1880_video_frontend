import { useDispatch, useSelector } from 'react-redux';

import FormField from "pages/authentication/signup/components/FormField";
// @mui material components
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
// prop-type is a library for typechecking of props
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiInput from "components/VuiInput";
import VuiTypography from "components/VuiTypography";
import { action_type } from 'redux/action_type';

// NewUser page components

function UserInfo({ formData }) {

  const dispatch = useDispatch();
  const { formField, values, errors, touched } = formData;
  const { username, phonenumber, email, password, confirm_password } = formField;
  const selected_user_type = useSelector((state) => state.selected_user_type.selected_user_type);
  const {
    username: usernameV,
    phonenumber: phonenumberV,
    email: emailV,
    password: passwordV,
    confirm_password: confirm_passwordV,
  } = values;

  const handleOnChange = (event) =>{
    dispatch({type: action_type.SELECTED_USER_TYPE, data: event.target.value});
  }
  
  return (
    <VuiBox>
      <VuiBox lineHeight={0} display="flex" flexDirection="column">
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          About me
        </VuiTypography>
        <VuiTypography variant="button" fontWeight="regular" color="text">
          Mandatory informations
        </VuiTypography>
      </VuiBox>
      <VuiBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label={username.label}
              name={username.name}
              type={username.type}
              value={usernameV}
              placeholder={username.placeholder}
              error={errors.username && touched.username}
              success={usernameV.length > 0 && !errors.username}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <VuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                User Type
              </VuiTypography>
            </VuiBox>
            <Select input={<VuiInput />} value={selected_user_type} onChange={handleOnChange}>
              <MenuItem value='1'>Customer</MenuItem>
              <MenuItem value='2'>Clerk</MenuItem>
              <MenuItem value='3'>client</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label={email.label}
              name={email.name}
              type={email.type}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={phonenumber.label}
              name={phonenumber.name}
              type={phonenumber.type}
              value={phonenumberV}
              placeholder={phonenumber.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label={password.label}
              name={password.name}
              type={password.type}
              value={passwordV}
              placeholder={password.placeholder}
              error={errors.password && touched.password}
              success={passwordV.length > 0 && !errors.password}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={confirm_password.label}
              name={confirm_password.name}
              type={confirm_password.type}
              value={confirm_passwordV}
              placeholder={confirm_password.placeholder}
              error={errors.confirm_password && touched.confirm_password}
              success={confirm_passwordV.length > 0 && !errors.confirm_password}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
        </Grid>
      </VuiBox>
    </VuiBox>
  );
}

// typechecking props for UserInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
