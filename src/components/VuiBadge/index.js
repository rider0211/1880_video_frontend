/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================


* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
// Custom styles for the VuiBadge
import VuiBadgeRoot from "components/VuiBadge/VuiBadgeRoot";
import { forwardRef } from "react";

const VuiBadge = forwardRef(
  ({ color, variant, size, circular, indicator, border, container, children, ...rest }, ref) => (
    <VuiBadgeRoot
      {...rest}
      ownerState={{ color, variant, size, circular, indicator, border, container, children }}
      ref={ref}
      color="default"
    >
      {children}
    </VuiBadgeRoot>
  )
);

// Setting default values for the props of VuiBadge
VuiBadge.defaultProps = {
  color: "info",
  variant: "gradient",
  size: "sm",
  circular: false,
  indicator: false,
  border: false,
  children: false,
  container: false,
};

// Typechecking props of the VuiBadge
VuiBadge.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "text",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  variant: PropTypes.oneOf(["gradient", "contained"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  circular: PropTypes.bool,
  indicator: PropTypes.bool,
  border: PropTypes.bool,
  children: PropTypes.node,
  container: PropTypes.bool,
};

export default VuiBadge;
