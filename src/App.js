import "assets/theme/base/plugins.css";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { setMiniSidenav, setOpenConfigurator, useVisionUIController } from "context";
import { useEffect, useState } from "react";

import AddCustomerComponent from "pages/customerProgram/addCustomerPage"
import BasicSignin from "pages/authentication/signin";
import BasicSignup from "pages/authentication/signup";
import Configurator from "layouts/Configurator";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "pages/dashboard";
import EditCustomerComponent from "pages/customerProgram/editCustomerPage"
import Icon from "@mui/material/Icon";
import Sidenav from "layouts/Sidenav";
import { ThemeProvider } from "@mui/material/styles";
import VuiBox from "components/VuiBox";
import VuiSnackbar from "components/VuiSnackbar";
import { action_type } from "redux/action_type";
import pageRoutes from "routes/page.routes";
import routes from "routes/routes";
import theme from "assets/theme";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const default_dispatch = useDispatch();
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

        return <Route
          exact
          path={route.route}
          element={(auth.accessToken && auth.accessToken !== "" && role !== undefined) ? route.component : <BasicSignin />}
          key={route.key}
        ></Route>
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
  const auth = useSelector(state => state.auth);
  const snack_bar = useSelector(state => state.snackbar);
  const role = auth.userData?.user_type;
  const toggleSnackbar = () => default_dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: !snack_bar.snack_bar_open, snack_bar_text: '' });
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brandName="Travel Assistance"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        <Routes>
          <Route exact path="/" element={(auth.accessToken && auth.accessToken !== "" && role !== undefined) ? <Navigate to={role !== '4' ? "/dashboard" : "/tourtown"} replace /> : <BasicSignin />}></Route>
          <Route exact path="/login" element={(auth.accessToken && auth.accessToken !== "" && role !== undefined) ? <Navigate to={role !== '4' ? "/dashboard" : "/tourtown"} replace /> : <BasicSignin />}></Route>
          <Route exact path="/customerManagement/add" element={(auth.accessToken && auth.accessToken !== "" && role !== undefined) ? <AddCustomerComponent /> : <BasicSignin />}></Route>
          <Route exact path="/customerManagement/edit/:user_id" element={(auth.accessToken && auth.accessToken !== "" && role !== undefined) ? <EditCustomerComponent /> : <BasicSignin />}></Route>
          <Route path="/register" element={<BasicSignup />} />
          {getRoutes(routes)}
        </Routes>
        <VuiSnackbar
          color={snack_bar.snack_bar_type}
          icon="notifications"
          title="Travel Assistance Notification"
          content={snack_bar.snack_bar_text}
          dateTime=""
          open={snack_bar.snack_bar_open}
          close={toggleSnackbar}
        />
      </ThemeProvider>
  );
}
