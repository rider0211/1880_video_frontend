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

import checkout from "pages/authentication/signup/schemas/form";

const {
  formField: {
    firstName,
    lastName,
    phonenumber,
    email,
    password,
    repeatPassword,
    address1,
    country,
    city,
    zip,
    state,
    contactname,
    contactemail,
    contactphonenumber,
  },
} = checkout;

export default {
  [firstName.name]: "",
  [lastName.name]: "",
  [phonenumber.name]: "",
  [email.name]: "",
  [password.name]: "",
  [repeatPassword.name]: "",
  [address1.name]: "",
  [country.name]: "",
  [city.name]: "",
  [zip.name]: "",
  [state.name]: "",
  [contactname.name]: "",
  [contactemail.name]: "",
  [contactphonenumber.name]: "",
};
