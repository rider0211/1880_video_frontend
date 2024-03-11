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

import ActionComponent from "../components/action_component";
import VuiBadgeDot from "components/VuiBadgeDot";
// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import { dateFormat } from "utils/common";
// Images
import team2 from "assets/images/avatar3.png";

export default {
  columns: [
    { name: "client_name", align: "center" },
    { name: "client_email", align: "center" },
    { name: "get_same_video", align: "center" },
    { name: "appears_in_others_video", align: "center" },
    { name: "voice_can_be_recorded", align: "center" },
    { name: "be_shown_potential", align: "center" },
    { name: "be_shown_public_business", align: "center" },
    { name: "be_shown_social_media", align: "center" },
    { name: "date", align: "center" },
    { name: "id", align: "center" },
    {name: "action", align: "center"},
  ],

  rows: [
    {
      client_name: [team2, "Esthera Jackson"],
      hasBorder: true,
      get_same_video: (
        <VuiBox ml={-1.325}>
          <VuiBadgeDot size="xs" color="error" badgeContent="No" />
        </VuiBox>
      ),
      appears_in_others_video: (
        <VuiBox ml={-1.325}>
          <VuiBadgeDot size="xs" badgeContent="Yes" />
        </VuiBox>
      ),
      voice_can_be_recorded: (
        <VuiBox ml={-1.325}>
          <VuiBadgeDot size="xs" badgeContent="Yes" />
        </VuiBox>
      ),
      be_shown_potential: (
        <VuiBox ml={-1.325}>
          <VuiBadgeDot size="xs" badgeContent="Yes" />
        </VuiBox>
      ),
      be_shown_public_business: (
        <VuiBox ml={-1.325}>
          <VuiBadgeDot size="xs" badgeContent="Yes" />
        </VuiBox>
      ),
      be_shown_social_media: (
        <VuiBox ml={-1.325}>
          <VuiBadgeDot size="xs" badgeContent="Yes" />
        </VuiBox>
      ),
      date: (dateFormat('2024-03-06T12:57:41.622510Z')),
      client_email: "esthera@simmmple.com",
      id: 22,
      action: (
        <ActionComponent user={{user: 22}}/>
      )
    },
  ]
};
