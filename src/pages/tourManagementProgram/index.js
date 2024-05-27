import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import breakpoints from "assets/theme/base/breakpoints";
import { Grid } from "@mui/material";
import CameraItem from './components/cameraItem/index';
import VuiButton from "components/VuiButton";
import { Card, CardContent, CardHeader, Typography, Divider } from '@mui/material';
import { sendColoringPDF } from "redux/actions/tour_management";
import { getAllCamera } from "redux/actions/camera";

function TourManagementProgram() {
  const { values } = breakpoints;

  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth.userData);
  const camera_data = useSelector((state) => state.cameraReducer.cameraData)

  const access_token = userdata.access;
  const cardHeader = (header) => {
    return <Typography alignSelf={'center'} color={"whitesmoke"}>{header}</Typography>
  }

  const send_coloring_pdf = (camera_id) => {
    const camera_info = { 'camera_id': camera_id }
    dispatch(sendColoringPDF(access_token, camera_info))
  }
  useEffect(() => {
    dispatch(getAllCamera(access_token))
  }, [])
  console.log(camera_data)
  const camera_view = () => {
    return camera_data == null ? <></> : camera_data.map((item, key) => {
      return (
        <Grid item xs={12} sm={6} lg={4} key={key} mt={8}>
          <Card>
            <CardHeader component={() => cardHeader(item.camera_name)} />
            <Divider light sx={{ marginTop: 5 }} />
            <CardContent>
              <CameraItem camera_data={item} id={key}></CameraItem>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={4}>
                    <VuiButton
                      variant="outlined"
                      size="small"
                      color={'info'}
                    >
                      Start Recording
                    </VuiButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <VuiButton
                      variant="outlined"
                      size="small"
                      color={'error'}
                    >
                      Stop Recording
                    </VuiButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <VuiButton
                      variant="outlined"
                      size="small"
                      color={'success'}
                      onClick={() => send_coloring_pdf(item.id)}
                    >
                      Coloring PDF
                    </VuiButton>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
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