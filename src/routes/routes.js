/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================


* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

/** 
  All of the routes for the Vision UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// React icons
import { IoCamera, IoFilmSharp, IoHome, IoPeopleSharp, IoVideocamSharp } from "react-icons/io5";
import { BsFilePdfFill } from "react-icons/bs";
import CameraVoiceProgram from 'pages/cameraVoiceProgram'
import ClientProgram from "pages/clientProgram";
import CustomerManagement from "pages/customerProgram/customerProgramPage";
import Default from "pages/dashboard";
import { FaPeopleGroup } from "react-icons/fa6";
import FooterVideo from "pages/footer";
import Header from "pages/header";
import { TbCameraCheck } from "react-icons/tb";
import WebCamCapture from 'pages/webCamCapture';
import ColoringProgram from 'pages/coloringProgram';

// Vision UI Dashboard PRO React layouts

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    route: "/dashboard",
    component: <Default />,
    noCollapse: true,
    access_type: false,
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Header Program",
    key: "header",
    icon: <IoVideocamSharp size="15px" color="inherit" />,
    route: "/header",
    component: <Header />,
    noCollapse: true,
    access_type: false,
  },
  {
    type: "collapse",
    name: "Footer Program",
    key: "footer",
    icon: <IoFilmSharp size="15px" color="inherit" />,
    route: "/footer",
    component: <FooterVideo />,
    noCollapse: true,
    access_type: false,
  },
  {
    type: "collapse",
    name: "Customer Program",
    key: "customerManagement",
    icon: <IoPeopleSharp size="15px" color="inherit" />,
    route: "/customerManagement",
    component: <CustomerManagement />,
    noCollapse: true,
    access_type: true,
  },
  // {
  //   type: "collapse",
  //   name: "WebCam Program",
  //   key: "webcamCaptureProgram",
  //   icon: <IoCamera size="15px" color="inherit" />,
  //   route: "/webcamCaptureProgram",
  //   component: <WebCamCapture />,
  //   noCollapse: true,
  //   access_type: false,
  // },
  {
    type: "collapse",
    name: "Client Program",
    key: "clientProgram",
    icon: <FaPeopleGroup size="15px" color="inherit" />,
    route: "/clientProgram",
    component: <ClientProgram />,
    noCollapse: true,
    access_type: false,
  },
  {
    type: "collapse",
    name: "Camera Voice Program",
    key: "cameraVoiceProgram",
    icon: <TbCameraCheck size="15px" color="inherit" />,
    route: "/cameraVoiceProgram",
    component: <CameraVoiceProgram />,
    noCollapse: true,
    access_type: false,
  },
  {
    type: "collapse",
    name: "Coloring Program",
    key: "coloringProgram",
    icon: <BsFilePdfFill size="15px" color="inherit" />,
    route: "/coloringProgram",
    component: <ColoringProgram />,
    noCollapse: true,
    access_type: false,
  },
  
];

export default routes;
