import { Container, Grid } from "@mui/material";

import MediaPlayer from "../MediaPlayer";

const FileList = () => {

  return (
    <Container style={{
      width: '100%', 
      height: window.innerHeight*0.43, 
      overflowX: 'auto',
      scrollbarWidth: 'thin',
    }}>
      <Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <MediaPlayer/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FileList;
