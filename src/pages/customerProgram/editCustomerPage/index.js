import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "components/VuiBox";
import UserEditComponent from "./components/UserEditComponent";
import { useParams } from "react-router-dom";

function EditCustomerPage(){

    const user = useParams();
    console.log(user);
    return (
        <DashboardLayout>
            <DashboardNavbar/>
                <Grid container justifyContent={"center"} spacing={3} mt="2px">
                    <UserEditComponent />
                </Grid>
            <Footer/>
        </DashboardLayout>
    )
}

export default EditCustomerPage;