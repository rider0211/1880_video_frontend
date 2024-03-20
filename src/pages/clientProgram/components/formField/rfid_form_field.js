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

// prop-type is a library for typechecking of props

import { ErrorMessage, Field } from "formik";

import CircularProgress from '@mui/material/CircularProgress';
import { FaSearchengin } from "react-icons/fa";
import { Grid } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiInput from "components/VuiInput";
import VuiTypography from "components/VuiTypography";
import { useState } from "react";

function RFIDFormField({ label, name, ...rest }) {
    const [loading, setLoading] = useState(false);
    const handleClick = () => setLoading(true);
    return (
        <VuiBox mb={1.5}>
            <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <VuiTypography
                    component="label"
                    variant="caption"
                    color="white"
                    fontWeight="bold"
                    textTransform="capitalize"
                >
                    {label}
                </VuiTypography>
            </VuiBox>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Field {...rest} name={name} as={VuiInput} />
                </Grid>
                <Grid item xs={4}>
                    <LoadingButton
                        color={'warning'}
                        onClick={handleClick}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<FaSearchengin />}
                        variant="contained"
                        sx={{
                            '$.Mui-disabled': {
                                color: 'white',
                                boxShadow: 'none',
                                backgroundColor: '#ed5a5aad'
                            },
                        }}
                        loadingIndicator={<CircularProgress color="white" size={16} />}
                    >
                        <span>Scan Tag</span>
                    </LoadingButton>
                </Grid>
            </Grid>
            <VuiBox mt={0.75}>
                <VuiTypography component="div" variant="caption" color="error">
                    <ErrorMessage name={name} />
                </VuiTypography>
            </VuiBox>
        </VuiBox>
    );
}

// typechecking props for RFIDFormField
RFIDFormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default RFIDFormField;
