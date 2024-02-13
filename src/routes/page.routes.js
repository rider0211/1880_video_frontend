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

/** 
  All of the routes for the page layout of Vision UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the DefaultNavbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `name` key is used for the name of the route on the DefaultNavbar.
  3. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  4. The `icon` key is used for the icon of the route on the DefaultNavbar, you have to add a node.
  5. The `collapse` key is used for making a collapsible item on the DefaultNavbar that contains other routes inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  6. The `route` key is used to store the route location which is used for the react router.
  7. The `href` key is used to store the external links location.
*/

// Vision UI Dashboard PRO React icons

import Default from "pages/dashboard";
import { IoDocument } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import SignupBasic from "pages/authentication/signup";
import SinginBasic from "pages/authentication/signin";

// Vision UI Dashboard PRO theme

const pageRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    route: "/dashboard",
    component: Default,
    noCollapse: true,
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentications",
    icon: <IoDocument size="15px" color="inherit" />,
    collapse: [
      {
        name: "Singin",
        key: "signin",
        route: "/singin",
        component: SinginBasic,
      },{
        name: "Singup",
        key: "signup",
        route: "/singup",
        component: SignupBasic,
      },
    ],
  },
];
export default pageRoutes;
