import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";

function ActionComponent(user) {
  return (
    <VuiBox>
        <VuiButton
            component="button"
            variant="gradient"
            color="dark"
            sx={({ breakpoints }) => ({
            [breakpoints.up("md")]: {
                minWidth: "120px",
            },
            [breakpoints.only("lg")]: {
                minWidth: "auto",
            },
            })}
            size= "small"
        >
            Edit
        </VuiButton>
        <VuiButton
            component="button"
            variant="gradient"
            color="error"
            sx={({ breakpoints }) => ({
            [breakpoints.up("md")]: {
                minWidth: "80px",
            },
            [breakpoints.only("lg")]: {
                minWidth: "auto",
            },
            })}
            size= "small"
        >
            Delete
        </VuiButton>

    </VuiBox>
  );
}

ActionComponent.propTypes= {
    user: PropTypes.number.isRequired
}
export default ActionComponent;
