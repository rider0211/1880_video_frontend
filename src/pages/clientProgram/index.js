import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VuiTypography from "components/VuiTypography";

function ClientProgram() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <VuiTypography>This is Client program</VuiTypography>
      <Footer />
    </DashboardLayout>
  );
}

export default ClientProgram;
