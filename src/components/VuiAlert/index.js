/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================


* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

// @mui material components
import Fade from "@mui/material/Fade";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import VuiAlertCloseIcon from "components/VuiAlert/VuiAlertCloseIcon";
// Custom styles for the VuiAlert
import VuiAlertRoot from "components/VuiAlert/VuiAlertRoot";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import { useState } from "react";

function VuiAlert({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <VuiAlertRoot ownerState={{ color }} {...rest}>
        <VuiBox display="flex" alignItems="center" color="white">
          {children}
        </VuiBox>
        {dismissible ? (
          <VuiAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</VuiAlertCloseIcon>
        ) : null}
      </VuiAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of VuiAlert
VuiAlert.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the VuiAlert
VuiAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default VuiAlert;
