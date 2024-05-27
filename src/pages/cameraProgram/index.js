
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import VuiBadgeDot from "components/VuiBadgeDot";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import breakpoints from "assets/theme/base/breakpoints";

import { getAllCamera, checkCameraStatus } from "redux/actions/camera";
import ActionComponent from "./components/tableComponent/action_component";
import { Modal } from 'react-responsive-modal';
import { Card, CardContent } from "@mui/material";
import CameraAddComponent from "./components/cameraAddComponent";
import CameraUpdateComponent from "./components/cameraUpdateComponent";
import Table from "./components/tableComponent";
import { action_type } from "redux/action_type";
const BadgeComponent = (flag) => {
  return flag.flag ?
    <VuiBox ml={-1.325}>
      <VuiBadgeDot size="xs" badgeContent="Yes" />
    </VuiBox> :
    <VuiBox ml={-1.325}>
      <VuiBadgeDot size="xs" color="error" badgeContent="No" />
    </VuiBox>
}

function CameraProgram() {
  const { values } = breakpoints;

  const dispatch = useDispatch();

  const camera_data = useSelector((state) => state.cameraReducer.cameraData);
  const camera_add_modal_status = useSelector((state) => state.cameraReducer.cameraAddModalStatus);
  const camera_update_modal_status = useSelector((state) => state.cameraReducer.cameraUpdateModalStatus);
  const selectForUpdateCamera = useSelector((state) => state.cameraReducer.selectForUpdateCamera);
  const userdata = useSelector((state) => state.auth.userData);
  const access_token = userdata.access;

  const toogleAddCameraModal = () => dispatch({ type: action_type.CAMERA_ADD_MODAL_STATUS, status: !camera_add_modal_status });

  const toogleCameraModal = (id) => {
    dispatch({ type: action_type.SELECT_FOR_UPDATE_CAMERA, status: id });
    dispatch({ type: action_type.CAMERA_UPDATE_MODAL_STATUS, status: !camera_update_modal_status });
  }
  const cameraTableData = {
    columns: [
      { name: "camera_name", align: "center" },
      { name: "camera_ip", align: "center" },
      { name: "camera_port", align: "center" },
      { name: "camera_user_name", align: "center" },
      { name: "password", align: "center" },
      { name: "status", align: "center" },
      { name: "id", align: "center" },
      { name: "action", align: "center" },
    ],
    rows: []
  };
  cameraTableData.rows = camera_data.map((item) => {
    dispatch(checkCameraStatus(access_token, item));
    return {
      camera_name: (item.camera_name),
      camera_ip: (item.camera_ip),
      camera_port: (item.camera_port),
      camera_user_name: (item.camera_user_name),
      password: (item.password),
      id: (item.id),
      action: (
        <ActionComponent camera_id={item.id} />
      ),
      status: (
        item.status
      ),
    }
  })
  useEffect(() => {
    const access_token = userdata.access;
    dispatch(getAllCamera(access_token))
  }, [])
  const { columns, rows } = cameraTableData;
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
          Camera Program
        </VuiTypography>
      </VuiBox>
      <VuiBox py={3}>
        <Modal open={camera_update_modal_status} center styles={{ modal: { background: '#171a42', minWidth: '30%', marginTop: 100, maxWidth: '20%' }, closeButton: { display: 'none' } }} onClose={() => toogleCameraModal(-1)}>
          <Card sx={{ minHeight: "490px" }}>
            <CardContent sx={{ padding: 0 }}>
              <CameraUpdateComponent camera_id={selectForUpdateCamera} />
            </CardContent>
          </Card>
        </Modal>
        <Modal open={camera_add_modal_status} center styles={{ modal: { background: '#171a42', minWidth: '30%', marginTop: 100, maxWidth: '20%' }, closeButton: { display: 'none' } }} onClose={toogleAddCameraModal}>
          <Card sx={{ minHeight: "490px" }}>
            <CardContent sx={{ padding: 0 }}>
              <CameraAddComponent toogleModal={toogleAddCameraModal} />
            </CardContent>
          </Card>
        </Modal>
        <Table columns={columns} rows={rows} />
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CameraProgram;