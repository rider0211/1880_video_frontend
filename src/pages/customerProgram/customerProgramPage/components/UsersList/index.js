import { AiOutlinePlus } from "react-icons/ai";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import VuiAvatar from "components/VuiAvatar";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import { useNavigate } from 'react-router-dom';
import userData from "./userData";

function UsersList() {

  const navigate = useNavigate();
  
  const { borderWidth } = borders;
  const handleAddbutton = () => {
    return navigate('/customerManagement/add');
  }
  const renderStories = userData.map(({ image, name, color }) => (
    <Grid key={name} item xs={4} sm={3} md={2} lg={1} sx={{ flex: "0 0 100%" }}>
      <VuiBox
        borderRadius="50%"
        width="3.625rem"
        height="3.625rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        mx="auto"
        border={`${borderWidth[1]} solid ${colors[color].main}`}
        sx={{ cursor: "pointer" }}
      >
        <VuiAvatar src={image} alt={name} />
      </VuiBox>
      <VuiBox mt={0.75} textAlign="center" lineHeight={1}>
        <VuiTypography fontSize={12} color="text" fontWeight="regular">
          {name}
        </VuiTypography>
      </VuiBox>
    </Grid>
  ));

  return (
    <Card
      sx={({ breakpoints }) => ({
        [breakpoints.down("lg")]: {
          overflowX: "scroll",
        },
      })}
    >
      <VuiBox width="100%">
        <Grid container justifyContent="space-between" wrap="nowrap">
          <Grid item xs={4} sm={3} md={2} lg={1} sx={{ flex: "0 0 100%" }}>
            <VuiBox
              bgColor="info"
              borderRadius="50%"
              width="3.625rem"
              height="3.625rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mx="auto"
              sx={{ cursor: "pointer" }}
              onClick= {handleAddbutton}
            >
              <AiOutlinePlus color="white" size="24px" />
            </VuiBox>
            <VuiBox mt={0.75} textAlign="center" lineHeight={1}>
              <VuiTypography fontSize={12} color="text" fontWeight="regular">
                Add Customer
              </VuiTypography>
            </VuiBox>
          </Grid>
          {renderStories}
        </Grid>
      </VuiBox>
    </Card>
  );
}

export default UsersList;
