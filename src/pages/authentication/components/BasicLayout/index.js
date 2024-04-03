/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================


* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

// Vision UI Dashboard PRO React example components

import Grid from "@mui/material/Grid";
import PageLayout from "examples/LayoutContainers/PageLayout";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Authentication layout components

// @mui material components


// prop-types is a library for typechecking of props

// Vision UI Dashboard PRO React components



// Vision UI Dashboard PRO React page layout routes

function BasicLayout({ title, description, image, children }) {
  return (
    <PageLayout>
      <VuiBox
        display={{ xs: "none", lg: "block" }}
        width={"calc(100% - 2rem)"}
        minHeight="60vh"
        borderRadius="lg"
        mx={2}
        my={2}
        pt={10}
        pb={14}
        sx={{
          backgroundImage: image && `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></VuiBox>
      <VuiBox
        mt={{ xs: 10, lg: -54, xl: -56, xxl: -65 }}
        px={{ xs: 0, lg: 1 }}
        width={{ xs: "100%", lg: "calc(100% - 2rem)" }}
        mx="auto"
      >
        <Grid
          container
          spacing={3}
          mb={{ xs: "30px", lg: "40px", xl: "60px" }}
          justifyContent="center"
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={10} lg={4}>
            <VuiBox mt={6} mb={1}>
              <VuiTypography variant="h1" color="white" fontWeight="bold" mb="20px">
                {title}
              </VuiTypography>
            </VuiBox>
            <VuiBox mb={2} px={{ md: "160px", lg: "0px", xl: "60px", xxl: "140px" }}>
              <VuiTypography variant="body2" color="white" fontWeight="regular">
                {description}
              </VuiTypography>
            </VuiBox>
          </Grid>
        </Grid>
        {children}
      </VuiBox>
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
