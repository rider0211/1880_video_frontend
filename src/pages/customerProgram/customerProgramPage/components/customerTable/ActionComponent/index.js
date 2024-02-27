import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import { useNavigate } from "react-router-dom";

function ActionComponent(user) {
    const navigate = useNavigate();

    const handleEditChange = () => {
        return navigate(`/customerManagement/edit/${user.user}`)
    }
    return (
    <VuiBox>
        <VuiButton
            component="button"
            variant="gradient"
            color="dark"
            sx={({ breakpoints }) => ({
            [breakpoints.up("md")]: {
                minWidth: "30px",
            },
            [breakpoints.only("lg")]: {
                minWidth: "auto",
            },
            })}
            size= "small"
            onClick= {handleEditChange}
        >
            Edit
        </VuiButton>
        <VuiButton
            component="button"
            variant="gradient"
            color="error"
            sx={({ breakpoints }) => ({
            [breakpoints.up("md")]: {
                minWidth: "30px",
            },
            [breakpoints.only("lg")]: {
                minWidth: "auto",
            },
            })}
            size= "small"
            onClick= {() => {
                console.log(user)
            }}
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
