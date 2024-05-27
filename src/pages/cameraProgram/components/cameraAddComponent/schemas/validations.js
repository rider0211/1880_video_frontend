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

import * as Yup from "yup";

import checkout from "pages/cameraProgram/components/cameraAddComponent/schemas/form";

const {
  formField: {
    camera_name,
    camera_ip,
    camera_port,
    camera_user_name,
    password,
  }
} = checkout;

export default [
  Yup.object().shape({
    [camera_name.name]: Yup.string().required(camera_name.errorMsg),
    [camera_ip.name]: Yup.string().required(camera_ip.errorMsg),
    [camera_port.name]: Yup.string().required(camera_port.errorMsg),
    [camera_user_name.name]: Yup.string().required(camera_user_name.errorMsg),
    [password.name]: Yup.string().required(password.errorMsg),
  })
];
