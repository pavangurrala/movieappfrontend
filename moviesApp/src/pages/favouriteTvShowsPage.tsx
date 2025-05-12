import React, { useContext } from "react"
import PageTemplate from "../components/templateTvListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
//import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteTvShowReview from "../components/cardIcons/writeTvShowReview";
import RemoveFromTVFavourites from "../components/cardIcons/removefromTVFavourites";
const FavouriteTvShowPage: React.FC = () => {
  const { favouritesTV: tvShowIds } = useContext(MoviesContext);
  // Create an array of queries and run them in parallel.
  const favouriteTvShowQueries = useQueries(
    tvShowIds.map((tvshowId) => {
      return {
        queryKey: ["tvshow", tvshowId],
        queryFn: () => getTvShow(tvshowId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvShowQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allTvShowFavourites = favouriteTvShowQueries.map((q) => q.data);
  

  
  //const toDo = () => true;

  return (
    <>
      <PageTemplate
        title="Favourite TV Shows"
        tvshows={allTvShowFavourites}
        action={(tvshow) => {
          return (
            <>
              <RemoveFromTVFavourites {...tvshow} />
              <WriteTvShowReview id={tvshow.id} />
            </>
          );
        }}
      />
      
    </>
  );
};

export default FavouriteTvShowPage;
