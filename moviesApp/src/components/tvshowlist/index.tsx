import React from "react";
import TVShow from "../tvcard";
import Grid from "@mui/material/Grid";
import { BaseTVListProps } from "../../types/interfaces";

const TvShowList: React.FC<BaseTVListProps> = ({tvshows, action}) => {
  let movieCards = tvshows.map((t) => (
    <Grid key={t.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TVShow key={t.id} tvshow={t} action={action}/>
    </Grid>
  ));
  return movieCards;
}

  export default TvShowList;