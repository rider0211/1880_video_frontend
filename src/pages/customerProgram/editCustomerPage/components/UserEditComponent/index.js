// @material-ui core components
import Card from "@mui/material/Card";
// Settings page components
import FormField from "../FormFieldComponent"
import Grid from "@mui/material/Grid";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";
import { useNavigate } from "react-router-dom";
// Data
import userData from './data/selectData';
function UserEditComponent() {

  const navigate = useNavigate();

  const handleCancelChange = () =>{
    return navigate("/customerManagement")
  }
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <VuiBox mb="40px">
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Edit User Info
        </VuiTypography>
      </VuiBox>
      <VuiBox component="form">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="User Name" placeholder="Michael" value={userData.username}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="User Email" placeholder="Jackson" value={userData.email}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="User Phone Number" placeholder="Michael" value={userData.phone_number}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Country" placeholder="Michael" value={userData.country}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField label="Street" placeholder="Jackson" value={userData.street}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField label="City" placeholder="Michael" value={userData.city}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField label="State" placeholder="Jackson" value={userData.state}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Zip Code" placeholder="Jackson" value={userData.zipcode}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Contact Name" placeholder="Jackson" value={userData.contact_name}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Contact Email" placeholder="Jackson" value={userData.contact_email}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Contact Phone Number" placeholder="Jackson" value={userData.contact_phone_number}/>
          </Grid>
        </Grid>
        <VuiBox
          display="flex"
          justifyContent="end"
          alignItems={{ sm: "flex-start", md: "center" }}
          flexDirection={{ sm: "column", md: "row" }}
          p={1.4}
        >
          <VuiBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
            <VuiButton variant="outlined" color="white" size="small" onClick={handleCancelChange}>
              Cancel
            </VuiButton>
            <VuiBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
              <VuiButton variant="contained" color="error" sx={{ height: "100%" }} size="small">
                Save Change
              </VuiButton>
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default UserEditComponent;
