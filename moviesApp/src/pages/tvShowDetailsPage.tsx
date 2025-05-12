import React, {useState} from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import TVShowDetails from "../components/tvDetails";
import PageTemplate from "../components/templateTvShowPage";
import SimilarPageTemplate from "../components/templateTvListPage";
//import useMovie from "../hooks/useMovie";
import { getTvShow, getSimilarTvShows } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { TvDetailsProps, BaseTvProps } from "../types/interfaces";
import { Box, Pagination} from "@mui/material";
import AddToFavouritesIconTV from '../components/cardIcons/addtoFavouritesTV'
const tvshows_per_page = 6;
const TvShowDetailsPage: React.FC= () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data: tvshow, error, isLoading, isError } = useQuery<TvDetailsProps, Error>(
    ["tvshow", id],
    ()=> getTvShow(id||"")
  );
  const { data: similarTvShows, isLoading: isSimilarLoading } = useQuery<{ results: BaseTvProps[];total_pages:number }, Error>(
    ["similarMovies", id, page],
    () => getSimilarTvShows(id || "", page),
    {keepPreviousData:true}
  );
  if (isLoading || isSimilarLoading) return <Spinner />;
  if (isError || !tvshow) return <p>Error fetching tv show details.</p>;
  
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const totalPages = Math.ceil((similarTvShows?.total_pages || 1));
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <>
      {tvshow? (
        <>
        <PageTemplate tvshow={tvshow}> 
          <TVShowDetails {...tvshow} />
        </PageTemplate>
        <Box sx={{padding:3}}>
          <SimilarPageTemplate
            title="Similar Tv Shows"
            tvshows={similarTvShows?.results.slice(0,tvshows_per_page) || []}
            action={(tvshow: BaseTvProps) => {
              return <AddToFavouritesIconTV {...tvshow} />
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center" marginTop={3}>
            <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            />
        </Box>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default TvShowDetailsPage;

