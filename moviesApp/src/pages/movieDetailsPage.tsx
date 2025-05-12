import React,{useState} from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import SimilarPageTemplate from "../components/templateMovieListPage";
//import useMovie from "../hooks/useMovie";
import { getMovie, getSimilarMovies } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { MovieDetailsProps, BaseMovieProps } from "../types/interfaces";
import { Box, Pagination} from "@mui/material";
import AddToFavouritesIcon from '../components/cardIcons/addToFavoutires'
const movies_per_page = 6
const MovieDetailsPage: React.FC= () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    ()=> getMovie(id||"")
  );
  const { data: similarMovies, isLoading: isSimilarLoading } = useQuery<{ results: BaseMovieProps[]; total_pages:number }, Error>(
    ["similarMovies", id, page],
    () => getSimilarMovies(id || "", page),
    {keepPreviousData:true}
  );
  if (isLoading || isSimilarLoading) return <Spinner />;
  if (isError || !movie) return <p>Error fetching movie details.</p>;
  
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const totalPages = Math.ceil((similarMovies?.total_pages || 1));
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
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
            movies={similarMovies?.results.slice(0,movies_per_page) || []}
            action={(movie: BaseMovieProps) => {
              return <AddToFavouritesIcon {...movie} />
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

export default MovieDetailsPage;

