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

import checkout from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent/schemas/form";

const {
  formField: { camera_id, wait_for_sec, text }
} = checkout;

export default [
  Yup.object().shape({
    [camera_id.name]: Yup.number().required(camera_id.errorMsg),
    [wait_for_sec.name]: Yup.number().required(wait_for_sec.errorMsg),
    [text.name]: Yup.string().required(text.errorMsg).required(text.errorMsg),
  })
];
