import FormField from 'pages/clientProgram/components/formField/index'
import { Grid } from "@mui/material";
import OptionFormField from 'pages/clientProgram/components/formField/option_form_field';
import PropTypes from "prop-types";
import RFIDFormField from 'pages/clientProgram/components/formField/rfid_form_field';

function ClientComponent({ formData }) {

    const { formField, values, errors, touched } = formData;

    const {
        client_name,
        client_email,
        get_same_video,
        appears_in_others_video,
        voice_can_be_recorded,
        be_shown_potential,
        be_shown_public_business,
        be_shown_social_media,
        paid_status,
    } = formField;

    const {
        client_name: client_name_V,
        client_email: client_email_V,
        get_same_video: get_same_video_V,
        appears_in_others_video: appears_in_others_video_V,
        voice_can_be_recorded: voice_can_be_recorded_V,
        be_shown_potential: be_shown_potential_V,
        be_shown_public_business: be_shown_public_business_V,
        be_shown_social_media: be_shown_social_media_V,
        paid_status: paid_status_V,
    } = values;

    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <FormField
                    label={client_name.label}
                    name={client_name.name}
                    type={client_name.type}
                    value={client_name_V}
                    placeholder={client_name.placeholder}
                    error={errors.client_name && touched.client_name}
                    success={client_name_V.length > 0 && !errors.client_name}
                />
                <FormField
                    label={client_email.label}
                    name={client_email.name}
                    type={client_email.type}
                    value={client_email_V}
                    placeholder={client_email.placeholder}
                    error={errors.client_email && touched.client_email}
                    success={client_email_V.length > 0 && !errors.client_email}
                />
                <OptionFormField
                    label={get_same_video.label}
                    name={get_same_video.name}
                    type={get_same_video.type}
                    value={get_same_video_V}
                    placeholder={get_same_video.placeholder}
                    error={errors.get_same_video && touched.get_same_video}
                    success={get_same_video_V.length > 0 && !errors.get_same_video}
                />
                <OptionFormField
                    label={appears_in_others_video.label}
                    name={appears_in_others_video.name}
                    type={appears_in_others_video.type}
                    value={appears_in_others_video_V}
                    placeholder={appears_in_others_video.placeholder}
                    error={errors.appears_in_others_video && touched.appears_in_others_video}
                    success={appears_in_others_video_V.length > 0 && !errors.appears_in_others_video}
                />
                <OptionFormField
                    label={voice_can_be_recorded.label}
                    name={voice_can_be_recorded.name}
                    type={voice_can_be_recorded.type}
                    value={voice_can_be_recorded_V}
                    placeholder={voice_can_be_recorded.placeholder}
                    error={errors.voice_can_be_recorded && touched.voice_can_be_recorded}
                    success={voice_can_be_recorded_V.length > 0 && !errors.voice_can_be_recorded}
                />
                <OptionFormField
                    label={be_shown_potential.label}
                    name={be_shown_potential.name}
                    type={be_shown_potential.type}
                    value={be_shown_potential_V}
                    placeholder={be_shown_potential.placeholder}
                    error={errors.be_shown_potential && touched.be_shown_potential}
                    success={be_shown_potential_V.length > 0 && !errors.be_shown_potential}
                />
                <OptionFormField
                    label={be_shown_public_business.label}
                    name={be_shown_public_business.name}
                    type={be_shown_public_business.type}
                    value={be_shown_public_business_V}
                    placeholder={be_shown_public_business.placeholder}
                    error={errors.be_shown_public_business && touched.be_shown_public_business}
                    success={be_shown_public_business_V.length > 0 && !errors.be_shown_public_business}
                />
                <OptionFormField
                    label={be_shown_social_media.label}
                    name={be_shown_social_media.name}
                    type={be_shown_social_media.type}
                    value={be_shown_social_media_V}
                    placeholder={be_shown_social_media.placeholder}
                    error={errors.be_shown_social_media && touched.be_shown_social_media}
                    success={be_shown_social_media_V.length > 0 && !errors.be_shown_social_media}
                />
                <OptionFormField
                    label={paid_status.label}
                    name={paid_status.name}
                    type={paid_status.type}
                    value={paid_status_V}
                    placeholder={paid_status.placeholder}
                    error={errors.paid_status && touched.paid_status}
                    success={paid_status_V.length > 0 && !errors.paid_status}
                />
            </Grid>
        </Grid>
    );
}

// typechecking props for Address
ClientComponent.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default ClientComponent;
