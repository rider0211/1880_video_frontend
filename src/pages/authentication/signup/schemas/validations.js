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

import checkout from "pages/authentication/signup/schemas/form";

const {
  formField: { firstName, lastName, email, password, repeatPassword, address1, country, city, zip, state, contactname, contactemail, contactphonenumber },
} = checkout;

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(firstName.errorMsg),
    [lastName.name]: Yup.string().required(lastName.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [password.name]: Yup.string().required(password.errorMsg).min(6, password.invalidMsg),
    [password.name]: Yup.string().required(password.errorMsg).min(6, password.invalidMsg),
    [repeatPassword.name]: Yup.string()
      .required(repeatPassword.errorMsg)
      .oneOf([Yup.ref("password"), null], repeatPassword.invalidMsg),
  }),
  Yup.object().shape({
    [address1.name]: Yup.string().required(address1.errorMsg),
    [city.name]: Yup.string().required(city.errorMsg),
    [country.name]: Yup.string().required(country.errorMsg),
    [state.name]: Yup.string().required(state.errorMsg),
    [zip.name]: Yup.string().required(zip.errorMsg).min(6, zip.invalidMsg),
  }),
  Yup.object().shape({
    [contactname.name]: Yup.string().required(contactname.errorMsg),
    [contactemail.name]: Yup.string().required(contactemail.errorMsg).email(email.invalidMsg),
    [contactphonenumber.name]: Yup.string().required(contactphonenumber.errorMsg)
  }),
];
