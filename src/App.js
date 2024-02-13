/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

// Plugins custom css
import "assets/theme/base/plugins.css";

// react-router components
import { Route, Switch, useLocation } from "react-router-dom";
// Vision UI Dashboard PRO React contexts
import { setMiniSidenav, setOpenConfigurator, useVisionUIController } from "context";
import { useEffect, useState } from "react";

import Configurator from "layouts/Configurator";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
// Vision UI Dashboard PRO React example components
import Sidenav from "layouts/Sidenav";
import SigninBasic from "pages/authentication/signin";
import SingupBasic from "pages/authentication/signup";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
// Vision UI Dashboard PRO React routes
import routes from "routes/routes";
// Vision UI Dashboard PRO React themes
import theme from "assets/theme";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={({ palette: { info } }) => ({ cursor: "pointer", backgroundColor: info.main })}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </VuiBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brandName="1880 town"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Switch>
        <Route exact path="/singin" component={SigninBasic} key="singin" />
        <Route exact path="/singup" component={SingupBasic} key="singup" />
        {getRoutes(routes)}
      </Switch>
    </ThemeProvider>
  );
}
