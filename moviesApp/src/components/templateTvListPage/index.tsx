import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import TvShowList from "../tvshowlist";
import {TvListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const TVShowListPageTemplate: React.FC<TvListPageTemplateProps> = ({ tvshows, title, action })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
      <TvShowList action={action} tvshows={tvshows}></TvShowList>
      </Grid>
    </Grid>
  );
}
export default TVShowListPageTemplate;
