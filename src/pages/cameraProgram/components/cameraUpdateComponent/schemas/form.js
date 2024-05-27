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

export default {
  formId: "update-camera-form",
  formField: {
    camera_name: {
      name: "camera_name",
      label: "Camera Name",
      type: "text",
      placeholder: "eg. First Camera",
      errorMsg: "Camera Name is required.",
    },
    camera_ip: {
      name: "camera_ip",
      label: "Camera IP",
      type: "text",
      placeholder: "eg. 79.81.10.25",
      errorMsg: "Camera IP is required.",
    },
    camera_port: {
      name: "camera_port",
      label: "Camera Port",
      type: "text",
      placeholder: "eg. 80",
      errorMsg: "Camera Port is required.",
    },
    camera_user_name: {
      name: "camera_user_name",
      label: "Camera User Name",
      type: "text",
      placeholder: "eg. admin",
      errorMsg: "Camera User Name is required.",
    },
    password: {
      name: "password",
      label: "Camera Password",
      type: "text",
      placeholder: "eg. *********",
      errorMsg: "Camera Password is required.",
    },
  },
};
