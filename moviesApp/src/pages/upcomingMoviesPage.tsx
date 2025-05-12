import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavouritesIcon from '../components/cardIcons/addToFavoutires'
const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  useEffect(() => {
    getUpcomingMovies().then((data) => {
      setMovies(data.results); // :white_tick: Extract `results` from API response
    });
  }, []);
  return <PageTemplate title="Upcoming Movies" movies={movies} action={(movie: BaseMovieProps) => {
    return <AddToFavouritesIcon {...movie} />
  }} />;
};
export default UpcomingMoviesPage;
