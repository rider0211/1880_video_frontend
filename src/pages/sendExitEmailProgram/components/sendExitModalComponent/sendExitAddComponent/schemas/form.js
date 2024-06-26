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
  formId: "new-exit-email-form",
  formField: {
    camera_id: {
      name: "camera_id",
      label: "Camera ID",
      type: "number",
      placeholder: "eg. Steve Stence",
      errorMsg: "You must select Camara.",
    },
    wait_for_sec: {
      name: "wait_for_sec",
      label: "Wait for Seconds",
      type: "number",
      placeholder: "eg. vision@dashboard.com",
      errorMsg: "You must input wait for seconds.",
    },
    text: {
      name: "text",
      label: "The text to be sent to clients",
      type: "text",
      placeholder: "eg. Hello everyone",
      errorMsg: "You need to input the text to be converted",
    },
    from_email: {
      name: "from_email",
      label: "This email is sender email",
      type: "text",
      placeholder: "eg. test@test.com",
      errorMsg: "You need to input the sender email",
      invalidMsg: "Invalid Email",
    },
  },
};
