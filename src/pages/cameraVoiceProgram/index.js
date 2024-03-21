import { Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CameraVoiceComponent from "./components/cameraVoiceComponent";
import ComplexProjectCard from "pages/cameraVoiceProgram/components/complexProjectCardComponent";
// Vision UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { GiCctvCamera } from "react-icons/gi";
// @mui material components
import Grid from "@mui/material/Grid";
// Project page components
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Modal } from 'react-responsive-modal';
import PlaceholderCard from "pages/cameraVoiceProgram/components/placeholderCard";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import breakpoints from "assets/theme/base/breakpoints";
import { dateFormat } from "utils/common";
import { getAllCameraVoice } from "redux/actions/camera_voice";

function CameraVoiceProgram() {

  const { values } = breakpoints;
  const dispatch = useDispatch();

  // ComplexProjectCard dropdown menu state
  const [slackBotMenu, setSlackBotMenu] = useState(null);
  const [selectVoiceID, setSelectVoiceID] = useState(-1);
  const [voiceCameraModal, setVoiceCameraModal] = useState(false);
  
  const userdata = useSelector((state) => state.auth.userData);
  const cameraVoiceData = useSelector((state) => state.voiceReducer.voiceData);
  const access_token = userdata.access;
  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event, id) => {
    setSelectVoiceID(id)
    setSlackBotMenu(event.currentTarget);
  }
  const closeSlackBotMenu = () => setSlackBotMenu(null);
  
  const updateCameraVoiceModal = () => {
    console.log(selectVoiceID);
  }
  const deleteCameraVoiceModal = () => {
    console.log(selectVoiceID);
  }
  const toogleCameraVoiceModal = () => setVoiceCameraModal(!voiceCameraModal);

  useEffect(() => {
      dispatch(getAllCameraVoice(access_token));
  }, [])
  // Dropdown menu template for the ComplexProjectCard
  const renderMenu = (state, close) => {
    return <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={updateCameraVoiceModal}>Update</MenuItem>
      <MenuItem onClick={deleteCameraVoiceModal}>Delete</MenuItem>
    </Menu>
  };
  const renderCamera = () => {
    return cameraVoiceData.map((item) => {
      const camera_data = item.camera_voice_data.camera_data;
      const customer_data = item.camera_voice_data.customer_data;
      return (
        <Grid item xs={12} md={6} lg={4}>
          <ComplexProjectCard
            icon={<GiCctvCamera color="white" size="33px" />}
            title={camera_data.camera_name}
            color={'info'}
            description={item.camera_voice_data.text}
            dateTime={dateFormat(item.camera_voice_data.date)}
            members={item.members}
            wait_for_seconds={item.camera_voice_data.wait_for_sec}
            customer_name={customer_data.username}
            dropdown={{
              action: (e) => openSlackBotMenu(e, item.camera_voice_data.id),
              menu: renderMenu(slackBotMenu, closeSlackBotMenu),
            }}
          />
        </Grid>
      )
    })
  }

  return (
    <DashboardLayout>
      <VuiBox mt="30px" mb="24px">
        <Grid container>
          <Grid item xs={12}>
            <VuiBox mb={3} p={1}>
              <VuiTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
                color="white"
              >
                Camera Voice Program
              </VuiTypography>
            </VuiBox>
          </Grid>
        </Grid>
        <VuiBox mb={1}>
          <Grid container spacing={3}>
            {renderCamera()}
            <Grid item xs={12} md={6} lg={4}>
              <PlaceholderCard title={{ variant: "h5", text: "New Camera" }} onClickFunc={toogleCameraVoiceModal}/>
            </Grid>
          </Grid>
          <Modal open={voiceCameraModal} center styles={{ modal: { background: '#171a42', minWidth: '30%', marginTop: 100, maxWidth: '20%' }, closeButton: { display: 'none' } }} onClose={() => toogleCameraVoiceModal()}>
            <Card sx={{ minHeight: "490px" }}>
              <CardContent sx={{ padding: 0 }}>
                <CameraVoiceComponent customer_id={userdata.user_id} toogleModal={toogleCameraVoiceModal} status={selectVoiceID}/>
              </CardContent>
            </Card>
          </Modal>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CameraVoiceProgram;
