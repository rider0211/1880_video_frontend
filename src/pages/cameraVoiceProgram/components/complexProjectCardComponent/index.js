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
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import VuiAvatar from "components/VuiAvatar";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Custom styles for ComplexProjectCard
function ComplexProjectCard({ color, icon, title, dateTime, description, members, dropdown, wait_for_seconds, customer_name }) {
  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <VuiAvatar
        key={memberKey}
        src={member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  return (
    <Card sx={{ minHeight: "100%" }}>
      <VuiBox>
        <VuiBox display="flex" alignItems="center">
          <VuiAvatar alt={title} size="xl" variant="rounded" bgColor={color} sx={{ p: 1 }}>
            {icon}
          </VuiAvatar>
          <VuiBox ml={2} lineHeight={0}>
            <VuiBox mb={1} lineHeight={0}>
              <VuiTypography
                variant="h5"
                color="white"
                textTransform="capitalize"
                fontWeight="medium"
              >
                {title}
              </VuiTypography>
            </VuiBox>
            <VuiBox display="flex">
              <VuiTypography
              variant="h6"
              color="white"
              >
                Customer Name : {customer_name}
              </VuiTypography>
            </VuiBox>
          </VuiBox>
          {dropdown && (
            <VuiTypography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon fontSize="default" sx={{ cursor: "pointer", color: "#fff" }}>
                more_vert
              </Icon>
            </VuiTypography>
          )}
          {dropdown.menu}
        </VuiBox>
        <VuiBox my={2} lineHeight={1}>
          <VuiTypography variant="button" fontWeight="regular" color="text">
            {description}
          </VuiTypography>
        </VuiBox>
        <Divider light />
        <VuiBox display="flex" justifyContent="space-between" alignItems="center">
          {wait_for_seconds ? (
            <VuiBox display="flex" flexDirection="column" lineHeight={0}>
              <VuiTypography variant="button" color="white" fontWeight="medium">
                {wait_for_seconds} s
              </VuiTypography>
              <VuiTypography variant="button" fontWeight="medium" color="text">
                Wait for seconds
              </VuiTypography>
            </VuiBox>
          ) : null}
          {dateTime ? (
            <VuiBox display="flex" flexDirection="column" lineHeight={0}>
              <VuiTypography variant="button" color="white" fontWeight="medium">
                {dateTime}
              </VuiTypography>
              <VuiTypography variant="button" fontWeight="medium" color="text">
                Created date
              </VuiTypography>
            </VuiBox>
          ) : null}
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
ComplexProjectCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

// Typechecking props for the ProfileInfoCard
ComplexProjectCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string,
  description: PropTypes.node.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default ComplexProjectCard;
