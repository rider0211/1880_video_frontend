import { Card, CardContent } from "@mui/material";
import { getAllExitEmail, getExitEmailByID, deleteExitEmail } from "redux/actions/exitEmail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import SendExitModalComponent from "./components/sendExitModalComponent";

import ComplexProjectCard from "pages/sendExitEmailProgram/components/complexProjectCardComponent";
// Vision UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { FaRegFilePdf } from "react-icons/fa6";
// @mui material components
import Grid from "@mui/material/Grid";
// Project page components
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Modal } from 'react-responsive-modal';
import PlaceholderCard from "./components/placeholderCard";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import breakpoints from "assets/theme/base/breakpoints";
import { dateFormat } from "utils/common";

function SendExitEmailProgram() {

  const { values } = breakpoints;
  const dispatch = useDispatch();

  // ComplexProjectCard dropdown menu state
  const [slackBotMenu, setSlackBotMenu] = useState(null);
  const [selectExitEmailID, setSelectExitEmailID] = useState(-1);
  const [exitEmailModal, setExitEmailModal] = useState(false);

  const userdata = useSelector((state) => state.auth.userData);
  const sendExitEmailData = useSelector((state) => state.exitEmailReducer.exitEmailData);

  const access_token = userdata.access;
  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event, id) => {
    setSelectExitEmailID(id)
    dispatch(getExitEmailByID(access_token, id));
    setSlackBotMenu(event.currentTarget);
  }
  const closeSlackBotMenu = () => {
    setSlackBotMenu(null);
  }

  const updateExitEmailItemModal = () => {
    closeSlackBotMenu();
    toogleExitEmailModal();
  }
  const deleteExitEmailItemModal = () => {
    closeSlackBotMenu();
    dispatch(deleteExitEmail(access_token, { id: selectExitEmailID }))
    initSelectExitEmailID()
  }
  const initSelectExitEmailID = () => setSelectExitEmailID(-1);

  const toogleExitEmailModal = () => {
    if (exitEmailModal) {
      initSelectExitEmailID()
    }
    setExitEmailModal(!exitEmailModal);
  }
  useEffect(() => {
    dispatch(getAllExitEmail(access_token));
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
      <MenuItem onClick={updateExitEmailItemModal}>Update</MenuItem>
      <MenuItem onClick={deleteExitEmailItemModal}>Delete</MenuItem>
    </Menu>
  };
  const renderExitEmailProgram = () => {
    return sendExitEmailData.map((item, key) => {
      const camera_data = item.camera;
      const customer_data = item.customer_data;
      return (
        <Grid item xs={12} md={6} lg={4} key={key}>
          <ComplexProjectCard
            icon={<FaRegFilePdf color="white" size="33px" />}
            title={camera_data.camera_name}
            color={'info'}
            description={item.text}
            dateTime={dateFormat(item.date)}
            members={item.members}
            wait_for_seconds={item.wait_for_sec}
            customer_name={customer_data.username}
            from_email={item.from_email}
            dropdown={{
              action: (e) => openSlackBotMenu(e, item.id),
              menu: renderMenu(slackBotMenu, closeSlackBotMenu),
            }}
          />
        </Grid>
      )
    })
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                Exit Email Program
              </VuiTypography>
            </VuiBox>
          </Grid>
        </Grid>
        <VuiBox mb={1}>
          <Grid container spacing={3}>
            {renderExitEmailProgram()}
            <Grid item xs={12} md={6} lg={4}>
              <PlaceholderCard title={{ variant: "h5", text: "New Exit Email Data" }} onClickFunc={toogleExitEmailModal} />
            </Grid>
          </Grid>
          <Modal open={exitEmailModal} center styles={{ modal: { background: '#171a42', minWidth: '30%', marginTop: 100, maxWidth: '20%' }, closeButton: { display: 'none' } }} onClose={() => toogleExitEmailModal()}>
            <Card sx={{ minHeight: "490px" }}>
              <CardContent sx={{ padding: 0 }}>
                <SendExitModalComponent customer_id={userdata.user_id} toogleModal={toogleExitEmailModal} status={selectExitEmailID} />
              </CardContent>
            </Card>
          </Modal>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SendExitEmailProgram;
