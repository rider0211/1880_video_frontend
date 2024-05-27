/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/


import checkout from "pages/cameraProgram/components/cameraAddComponent/schemas/form";

const {
  formField: {
    camera_name,
    camera_ip,
    camera_port,
    camera_user_name,
    password,
  },
} = checkout;

export default {
  [camera_name.name]: "",
  [camera_ip.name]: "",
  [camera_port.name]: "",
  [camera_user_name.name]: "",
  [password.name]: "",
};
