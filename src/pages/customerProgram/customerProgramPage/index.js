import CustomerTable from "./components/customerTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// icons
import Footer from "examples/Footer";
import UsersList from "./components/UsersList";
import VuiBox from "components/VuiBox";

function CustomerManagement() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <VuiBox pt={6}>
          <UsersList />
        </VuiBox>
        <CustomerTable />
      <Footer />
    </DashboardLayout>
  );
}

export default CustomerManagement;
