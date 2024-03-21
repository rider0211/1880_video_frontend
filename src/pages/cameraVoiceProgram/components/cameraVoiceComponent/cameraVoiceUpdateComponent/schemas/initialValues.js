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

import checkout from "pages/cameraVoiceProgram/components/cameraVoiceComponent/cameraVoiceUpdateComponent/schemas/form";

const {
  formField: {
    camera_id,
    wait_for_sec,
    enter_or_exit_code,
    text,
  },
} = checkout;

export default {
  [camera_id.name]: 0,
  [wait_for_sec.name]: 0,
  [enter_or_exit_code.name]: true,
  [text.name]: "",
};
