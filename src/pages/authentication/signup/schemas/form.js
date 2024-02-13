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
  formId: "new-user-form",
  formField: {
    firstName: {
      name: "firstName",
      label: "first name",
      type: "text",
      placeholder: "eg. Micheal",
      errorMsg: "First name is required.",
    },
    lastName: {
      name: "lastName",
      label: "last name",
      type: "text",
      placeholder: "eg. Prior",
      errorMsg: "Last name is required.",
    },
    phonenumber: {
      name: "phonenumber",
      label: "phonenumber",
      type: "text",
      placeholder: "eg. Creative Tim",
    },
    email: {
      name: "email",
      label: "email address",
      type: "email",
      placeholder: "eg. vision@dashboard.come",
      errorMsg: "Email address is required.",
      invalidMsg: "Your email address is invalid",
    },
    password: {
      name: "password",
      label: "password",
      type: "password",
      placeholder: "******",
      errorMsg: "Password is required.",
      invalidMsg: "Your password should be more than 6 characters.",
    },
    repeatPassword: {
      name: "repeatPassword",
      label: "repeat password",
      type: "password",
      placeholder: "******",
      errorMsg: "Password is required.",
      invalidMsg: "Your password doesn't match.",
    },
    address1: {
      name: "address1",
      label: "address 1",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "Address is required.",
    },
    country: {
      name: "country",
      label: "country",
      type: "text",
      placeholder: "eg. Canada",
      errorMsg: "Country is required.",
    },
    city: {
      name: "city",
      label: "city",
      type: "text",
      placeholder: "eg. Tokyo",
      errorMsg: "City is required.",
    },
    zip: {
      name: "zip",
      label: "zip",
      type: "number",
      placeholder: "7 letters",
      errorMsg: "Zip is required.",
      invalidMsg: "Zipcode is not valie (e.g. 70000).",
    },
    state: {
      name: "state",
      label: "state",
      type: "text",
      placeholder: "eg. Ontario",
      errorMsg: "State is required.",
      invalidMsg: "State is not valid",
    },
    contactname: {
      name: "contactname",
      label: "Contact Name",
      type: "text",
      placeholder: "Steven",
      errorMsg: "Contact Name is required.",
    },
    contactemail: {
      name: "contactemail",
      label: "Contact Email",
      type: "email",
      placeholder: "test@test.com",
      errorMsg: "Contact email is required.",
      invalidMsg: "Your email address is invalid",
    },
    contactphonenumber: {
      name: "contactphonenumber",
      label: "Contact Phone Number",
      type: "text",
      placeholder: "+123456789",
      errorMsg: "Contact phone number is required.",
    },
    publicEmail: {
      name: "publicEmail",
      label: "public email",
      type: "email",
      placeholder: "Use an address you don't use frequently",
    },
    bio: {
      name: "bio",
      label: "bio",
      placeholder: "Say a few words about who you are or what you're working on.",
    },
  },
};
