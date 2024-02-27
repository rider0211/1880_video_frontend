import { useDispatch, useSelector } from 'react-redux';

import VuiDropzone from "components/VuiDropzone";
import { addFooter } from 'redux/actions/footerVideo';
import { handleLogout } from 'redux/actions/login';

const FileDropZone = () => {

  const dispatch = useDispatch();

  const userdata = useSelector((state) => state.auth.userData);
  return (
        <VuiDropzone options={{ 
          addRemoveLinks: true,
          autoProcessQueue : true,
          url : `${process.env.REACT_APP_BASE_API_URL}/admin/footer/add`,
          init: function() {
            this.on("sending", function(file, xhr, formData) {
              formData.append("user", userdata.user_id);
              formData.append("video_path", file)
            });
            this.on("complete", function({file, xhr, meta}){
              try {
                if(xhr.status === 401){
                  dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Session Terminated'});
                  dispatch(handleLogout());
                }else{
                  const returnData = JSON.parse(xhr.response).data;
                  dispatch(addFooter(returnData));
                }
              } catch (error) {
                dispatch({type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: 'Error Occured in server'});
              }
            })
          },
          headers : {
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + userdata.access,
          },
          complete: function(file){
            this.removeFile(file);
          }
        }} />
  );
};

export default FileDropZone;
