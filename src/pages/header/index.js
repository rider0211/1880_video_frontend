import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Divider from "@mui/material/Divider";
import FileDropZone from "./components/FileDropZone";
import FileList from "./components/FileList";
// icons
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import breakpoints from "assets/theme/base/breakpoints";

// Data

function Header() {
  const { values } = breakpoints;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <VuiBox mb={3} p={1}>
              <VuiTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
                color="white"
              >
                Header Program
              </VuiTypography>
            </VuiBox>
          </Grid>
          <Grid container justifyContent={"center"} spacing={3} mt="2px">
            <Grid item xs={12} lg={6} xl={10}>
              <Card>
                <FileDropZone />
                <Divider light sx={{ margin: 1 }} />
                <FileList />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Header;
