import React from "react";
import PageTemplate from "../components/templateTvListPage";
import { useQuery } from "react-query";
import { getPopularTvSeries } from "../api/tmdb-api";
import { BaseTvProps } from "../types/interfaces";
import useFiltering from "../hooks/useFiltering";
import TvFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvFilterUI";
import Spinner from "../components/spinner";

import AddToFavouritesIconTv from '../components/cardIcons/addtoFavouritesTV'

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};
const sortOrderFiltering = {
  name: "sortOrder",
  value: "desc", // default sorting
  condition: () => true, // no filtering logic needed, we'll handle sorting separately
};

const PopularTvShowsPage: React.FC = () => {
  const { data: tvshows, isLoading, isError } = useQuery(["popularTvShows"], getPopularTvSeries);
 
  const { filterValues, setFilterValues, filterFunction} = useFiltering(
    [titleFiltering, genreFiltering, sortOrderFiltering]
  );
  
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) return <p>Error fetching popular tvshows.</p>;
  // const changeFilterValues = (type: string, value: string) => {
  //   const changedFilter = { name: type, value: value };
  //   const updatedFilterSet =
  //     type === "title"
  //       ? [changedFilter, filterValues[1]]
  //       : [filterValues[0], changedFilter];
  //   setFilterValues(updatedFilterSet);
  // };
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1], filterValues[2]]
        : type === "genre"
          ? [filterValues[0], changedFilter, filterValues[2]]
          : [filterValues[0], filterValues[1], changedFilter];
    setFilterValues(updatedFilterSet);
  };
  const tvShows = tvshows ? tvshows.results : [];
  const displayedTvShows = filterFunction(tvShows);
  const sortedTvShows = [...displayedTvShows].sort((a, b) => {
    const sortOrder = filterValues[2].value; // index 2 = sortOrder
    return sortOrder === "asc"
      ? a.popularity - b.popularity
      : b.popularity - a.popularity;
  });
  return (
    <>
    <PageTemplate
      title="Popular TV Shows"
      tvshows={sortedTvShows}
      action={(tvshow: BaseTvProps) => {
        return <AddToFavouritesIconTv {...tvshow} />
      }}
    />
    <TvFilterUI
    onFilterValuesChange={changeFilterValues}
            titleFilter={filterValues[0].value}
            genreFilter={filterValues[1].value}
            sortOrder={filterValues[2].value}
    />
    </>
    

  );
};
export default PopularTvShowsPage;