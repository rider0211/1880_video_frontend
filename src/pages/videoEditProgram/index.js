
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VuiBox from "components/VuiBox";
import ClientsList from "./components/ClientsList";
import VideoEditorComponent from "./components/VideoEditorComponent";

function VideoEditProgram() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox pt={6}>
        <ClientsList />
      </VuiBox>
      <VideoEditorComponent />
      <Footer />
    </DashboardLayout>
  );
}

export default VideoEditProgram;
