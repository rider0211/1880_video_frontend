import { Card, CardContent } from "@mui/material";
import { getAllColoringPage, getColoringPageByID } from "redux/actions/coloringPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ColoringModalComponent from "./components/coloringModalComponent";

import ComplexProjectCard from "pages/coloringProgram/components/complexProjectCardComponent";
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
import PlaceholderCard from "pages/coloringProgram/components/placeholderCard";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import breakpoints from "assets/theme/base/breakpoints";
import { dateFormat } from "utils/common";
import { deleteColoringPage } from "redux/actions/coloringPage";

function ColoringProgram() {

  const { values } = breakpoints;
  const dispatch = useDispatch();

  // ComplexProjectCard dropdown menu state
  const [slackBotMenu, setSlackBotMenu] = useState(null);
  const [selectColoringID, setSelectColoringID] = useState(-1);
  const [coloringModal, setcoloringModal] = useState(false);

  const userdata = useSelector((state) => state.auth.userData);

  const coloringPageData = useSelector((state) => state.coloringReducer.coloringData);

  const access_token = userdata.access;
  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event, id) => {
    setSelectColoringID(id)
    dispatch(getColoringPageByID(access_token, id));
    setSlackBotMenu(event.currentTarget);
  }
  const closeSlackBotMenu = () => {
    setSlackBotMenu(null);
  }

  const updateColoringItemModal = () => {
    closeSlackBotMenu();
    toogleColoringModal();
  }
  const deleteColoringItemModal = () => {
    closeSlackBotMenu();
    dispatch(deleteColoringPage(access_token, { id: selectColoringID }))
    initSelectColoringID()
  }
  const initSelectColoringID = () => setSelectColoringID(-1);

  const toogleColoringModal = () => {
    if (coloringModal) {
      initSelectColoringID()
    }
    setcoloringModal(!coloringModal);
  }
  useEffect(() => {
    dispatch(getAllColoringPage(access_token));
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
      <MenuItem onClick={updateColoringItemModal}>Update</MenuItem>
      <MenuItem onClick={deleteColoringItemModal}>Delete</MenuItem>
    </Menu>
  };
  const renderColoring = () => {
    return coloringPageData.map((item, key) => {
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
            pdf_src={process.env.REACT_APP_BASE_URL + item.coloringpage}
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
                Coloring Program
              </VuiTypography>
            </VuiBox>
          </Grid>
        </Grid>
        <VuiBox mb={1}>
          <Grid container spacing={3}>
            {renderColoring()}
            <Grid item xs={12} md={6} lg={4}>
              <PlaceholderCard title={{ variant: "h5", text: "New Coloring Data" }} onClickFunc={toogleColoringModal} />
            </Grid>
          </Grid>
          <Modal open={coloringModal} center styles={{ modal: { background: '#171a42', minWidth: '30%', marginTop: 100, maxWidth: '20%' }, closeButton: { display: 'none' } }} onClose={() => toogleColoringModal()}>
            <Card sx={{ minHeight: "490px" }}>
              <CardContent sx={{ padding: 0 }}>
                <ColoringModalComponent customer_id={userdata.user_id} toogleModal={toogleColoringModal} status={selectColoringID} />
              </CardContent>
            </Card>
          </Modal>
        </VuiBox>
      </VuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default ColoringProgram;
