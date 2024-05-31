import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import breakpoints from "assets/theme/base/breakpoints";
import { Grid } from "@mui/material";
import CameraItem from './components/cameraItem/index';
import { getAllCamera } from "redux/actions/camera";

function TourManagementProgram() {
  const { values } = breakpoints;

  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth.userData);
  const camera_data = useSelector((state) => state.cameraReducer.cameraData)

  const access_token = userdata.access;

  useEffect(() => {
    dispatch(getAllCamera(access_token))
  }, [])


  const camera_view = () => {
    return camera_data == null ? <></> : camera_data.map((item, key) => {
      return (
        <CameraItem camera_data={item} id={key} key={key}></CameraItem>
      )
    })
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox mb={3} p={1}>
        <VuiTypography
          variant={window.innerWidth < values.sm ? "h3" : "h2"}
          textTransform="capitalize"
          fontWeight="bold"
          color="white"
        >
          Tour Management Program
        </VuiTypography>
        <Grid container spacing={3}>
          {camera_view()}
        </Grid>
      </VuiBox>

      <Footer />
    </DashboardLayout>
  );
}

export default TourManagementProgram;