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
  formId: "new-client-form",
  formField: {
    client_name: {
      name: "client_name",
      label: "Cient Name",
      type: "text",
      placeholder: "eg. Steve Stence",
      errorMsg: "Full Name is required.",
    },
    client_email: {
      name: "client_email",
      label: "Client Email Address",
      type: "email",
      placeholder: "eg. vision@dashboard.com",
      errorMsg: "Email address is required.",
      invalidMsg: "Your email address is invalid",
    },
    // rfid_tag: {
    //   name: "rfid_tag",
    //   label: "Scan your RFID tag",
    //   type: "text",
    //   placeholder: "eg. 5246758151815",
    //   errorMsg: "Scan your RFID tag.",
    // },
    get_same_video: {
      name: "get_same_video",
      label: "Get Same Video",
      type: "boolean",
      placeholder: "eg. vision@dashboard.com",
      errorMsg: "Get Same Video is required.",
      invalidMsg: "Get Same Video Option is invalid",
    },
    appears_in_others_video: {
      name: "appears_in_others_video",
      label: "Appears In Others Video",
      type: "boolean",
      placeholder: "eg. vision@dashboard.com",
      errorMsg: "Appears In Others Video is required.",
      invalidMsg: "Appears In Others Video is invalid",
    },
    voice_can_be_recorded: {
      name: "voice_can_be_recorded",
      label: "Voice Can Be Recorded",
      type: "boolean",
      placeholder: "eg. vision@dashboard.com",
      errorMsg: "Voice Can Be Recorded is required.",
      invalidMsg: "Voice Can Be Recorded is invalid",
    },
    be_shown_potential: {
      name: "be_shown_potential",
      label: "Be Shown Potential",
      type: "boolean",
      placeholder: "eg. vision@dashboard.com",
      errorMsg: "Be Shown Potential is required.",
      invalidMsg: "Be Shown Potential is invalid",
    },
    be_shown_public_business: {
      name: "be_shown_public_business",
      label: "Be Shown Public Business",
      type: "boolean",
      placeholder: "eg. vision@dashboard.com",
      errorMsg: "Be Shown Public Business is required.",
      invalidMsg: "Be Shown Public Business is invalid",
    },
    be_shown_social_media: {
      name: "be_shown_social_media",
      label: "Be Shown Social Media",
      type: "boolean",
      placeholder: "eg. vision@dashboard.com",
      errorMsg: "Be Shown Social Media is required.",
      invalidMsg: "Be Shown Social Media is invalid",
    },
    paid_status: {
      name: "paid_status",
      label: "Paid Status",
      type: "boolean",
      placeholder: "eg. vision@dashboard.com",
      errorMsg: "Paid Status is required.",
      invalidMsg: "Paid Status is invalid",
    }
  },
};
