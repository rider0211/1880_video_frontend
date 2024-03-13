import ComplexProjectCard from "examples/Cards/ProjectCards/ComplexProjectCard";
// Vision UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
// @mui material components
import Grid from "@mui/material/Grid";
// Project page components
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import breakpoints from "assets/theme/base/breakpoints";
import data from "./data";
import { useState } from "react";

function CameraVoiceProgram() {

  const { values } = breakpoints;

  // ComplexProjectCard dropdown menu state
  const [slackBotMenu, setSlackBotMenu] = useState(null);


  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event) => setSlackBotMenu(event.currentTarget);
  const closeSlackBotMenu = () => setSlackBotMenu(null);


  // Dropdown menu template for the ComplexProjectCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={close}>Action</MenuItem>
      <MenuItem onClick={close}>Another action</MenuItem>
      <MenuItem onClick={close}>Something else here</MenuItem>
    </Menu>
  );

  const renderCamera = () => {
    return data.map((item) => {
      return (
        <Grid item xs={12} md={6} lg={4}>
          <ComplexProjectCard
            icon={item.icon}
            title={item.title}
            color={item.color}
            description={item.description}
            dateTime={item.dateTime}
            members={item.members}
            dropdown={{
              action: openSlackBotMenu,
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
              <PlaceholderCard title={{ variant: "h5", text: "New Camera" }} />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CameraVoiceProgram;
