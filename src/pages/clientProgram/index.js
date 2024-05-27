import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ActionComponent from "./components/tableComponent/action_component";
import AppBar from "@mui/material/AppBar";
import ChildAddComponent from "./components/childAddComponent";
import ClientAddComponent from "./components/clientAddComponent";
import ClientUpdateComponent from "./components/clientUpdateComponent";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { MdOutlineChildCare } from "react-icons/md";
import { Modal } from 'react-responsive-modal';
import PropTypes from 'prop-types';
import { RiParentFill } from "react-icons/ri";
import Tab from "@mui/material/Tab";
import Table from "./components/tableComponent";
import Tabs from "@mui/material/Tabs";
import VuiBadgeDot from "components/VuiBadgeDot";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { action_type } from "redux/action_type";
import breakpoints from "assets/theme/base/breakpoints";
import { dateFormat } from "utils/common";
import { getClientByCustomerID } from "redux/actions/client_manage";

const BadgeComponent = (flag) => {
  return flag.flag ?
    <VuiBox ml={-1.325}>
      <VuiBadgeDot size="xs" badgeContent="Yes" />
    </VuiBox> :
    <VuiBox ml={-1.325}>
      <VuiBadgeDot size="xs" color="error" badgeContent="No" />
    </VuiBox>
}

function ClientProgram() {

  const { values } = breakpoints;

  const dispatch = useDispatch();

  const client_data = useSelector((state) => state.clientReducer.clientData);
  const client_add_modal_status = useSelector((state) => state.clientReducer.clientAddModalStatus);
  const client_update_modal_status = useSelector((state) => state.clientReducer.clientUpdateModalStatus);
  const selectForUpdateClient = useSelector((state) => state.clientReducer.selectForUpdateClient);
  const userdata = useSelector((state) => state.auth.userData);

  const [tabValue, setTabValue] = useState(0);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const toogleAddClientModal = () => dispatch({ type: action_type.CLIENT_ADD_MODAL_STATUS, status: !client_add_modal_status });

  const toogleClientModal = (id) => {
    dispatch({ type: action_type.SELECT_FOR_UPDATE_CLIENT, status: id });
    dispatch({ type: action_type.CLIENT_UPDATE_MODAL_STATUS, status: !client_update_modal_status });
  }

  const clientTableData = {
    columns: [
      { name: "client_name", align: "center" },
      { name: "client_email", align: "center" },
      { name: "get_same_video", align: "center" },
      { name: "appears_in_others_video", align: "center" },
      { name: "voice_can_be_recorded", align: "center" },
      { name: "be_shown_potential", align: "center" },
      { name: "be_shown_public_business", align: "center" },
      { name: "be_shown_social_media", align: "center" },
      { name: "tour_status", align: "center" },
      { name: "paid_status", align: "center" },
      { name: "tour_status", align: "center" },
      { name: "date", align: "center" },
      { name: "id", align: "center" },
      { name: "action", align: "center" },
    ],
    rows: []
  };
  clientTableData.rows = client_data.map((item) => {
    return {
      client_name: (item.client_name),
      hasBorder: true,
      date: (dateFormat(item.date)),
      client_email: item.client_email,
      id: item.id,
      action: (
        <ActionComponent user={item.id} />
      ),
      get_same_video: (
        <BadgeComponent flag={item.get_same_video} />
      ),
      appears_in_others_video: (
        <BadgeComponent flag={item.appears_in_others_video} />
      ),
      voice_can_be_recorded: (
        <BadgeComponent flag={item.voice_can_be_recorded} />
      ),
      be_shown_potential: (
        <BadgeComponent flag={item.be_shown_potential} />
      ),
      be_shown_public_business: (
        <BadgeComponent flag={item.be_shown_public_business} />
      ),
      be_shown_social_media: (
        <BadgeComponent flag={item.be_shown_social_media} />
      ),
      tour_status: (
        <BadgeComponent flag={item.tour_status} />
      ),
      paid_status: (
        <BadgeComponent flag={item.paid_status} />
      ),
    }
  })


  useEffect(() => {
    const customer_id = { 'customer_id': userdata.user_id };
    const access_token = userdata.access;
    dispatch(getClientByCustomerID(access_token, customer_id))
  }, [])
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <VuiBox
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <VuiBox sx={{ p: 3 }}>
            {children}
          </VuiBox>
        )}
      </VuiBox>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const client_menu_item = () => {
    return <Grid item xs={12} md={6} lg={6.5} xl={6} xxl={4} sx={{ ml: "auto" }}>
      <AppBar>
        <Tabs
          value={tabValue}
          onChange={handleSetTabValue}
          variant='fullWidth'
          sx={{ padding: 1, background: "transparent", display: "flex", justifyContent: "space-between" }}
        >
          <Tab
            label="Client"
            icon={<RiParentFill size="16px" color="white" fontWeight="bold" />}
          />
          <Tab
            label="Child"
            icon={<MdOutlineChildCare size="16px" color="white" fontWeight="bold" />}
          />
        </Tabs>
      </AppBar>
    </Grid>
  }
  const { columns, rows } = clientTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox mb={3} p={1}>
        <VuiTypography
          variant={window.innerWidth < values.sm ? "h3" : "h2"}
          textTransform="capitalize"
          fontWeight="bold"
          color="white"
        >
          Client Program
        </VuiTypography>
      </VuiBox>
      <VuiBox py={3}>
        <Modal open={client_update_modal_status} center styles={{ modal: { background: '#171a42', minWidth: '30%', marginTop: 100, maxWidth: '20%' }, closeButton: { display: 'none' } }} onClose={() => toogleClientModal(-1)}>
          <Card sx={{ minHeight: "490px" }}>
            <CardContent sx={{ padding: 0 }}>
              <ClientUpdateComponent client_id={selectForUpdateClient} />
            </CardContent>
          </Card>
        </Modal>
        <Modal open={client_add_modal_status} center styles={{ modal: { background: '#171a42', minWidth: '30%', marginTop: 100, maxWidth: '20%' }, closeButton: { display: 'none' } }} onClose={toogleAddClientModal}>
          <Card sx={{ minHeight: "490px" }}>
            <CardHeader component={client_menu_item} />
            <Divider light sx={{ marginTop: 5 }} />
            <CardContent sx={{ padding: 0 }}>
              <TabPanel value={tabValue} index={0}>
                <ClientAddComponent toogleModal={toogleAddClientModal} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <ChildAddComponent toogleModal={toogleAddClientModal} />
              </TabPanel>
            </CardContent>
          </Card>
        </Modal>
        <Table columns={columns} rows={rows} />
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ClientProgram;