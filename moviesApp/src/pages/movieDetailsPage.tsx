import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import SimilarPageTemplate from "../components/templateMovieListPage";
//import useMovie from "../hooks/useMovie";
import { getMovie, getSimilarMovies } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { MovieDetailsProps, BaseMovieProps } from "../types/interfaces";
import { Box} from "@mui/material";
import AddToFavouritesIcon from '../components/cardIcons/addToFavoutires'
const MovieDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    ()=> getMovie(id||"")
  );
  const { data: similarMovies, isLoading: isSimilarLoading } = useQuery<{ results: BaseMovieProps[] }, Error>(
    ["similarMovies", id],
    () => getSimilarMovies(id || "")
  );
  if (isLoading || isSimilarLoading) return <Spinner />;
  if (isError || !movie) return <p>Error fetching movie details.</p>;

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  return (
    <>
      {movie? (
        <>
        <PageTemplate movie={movie}> 
          <MovieDetails {...movie} />
        </PageTemplate>
        <Box sx={{padding:3}}>
          <SimilarPageTemplate
            title="Similar Movies"
            movies={similarMovies?.results || []}
            action={(movie: BaseMovieProps) => {
              return <AddToFavouritesIcon {...movie} />
            }}
          />
        </Box>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieDetailsPage;

