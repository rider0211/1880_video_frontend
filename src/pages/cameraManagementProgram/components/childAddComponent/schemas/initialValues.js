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

import checkout from "pages/clientProgram/components/childAddComponent/schemas/form";

const {
  formField: {
    children_name, rfid_tag
  },
} = checkout;

export default {
  [children_name.name]: "",
  [rfid_tag.name]: "",
};