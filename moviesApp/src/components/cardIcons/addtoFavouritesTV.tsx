import React, {MouseEvent, useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BaseTvProps} from "../../types/interfaces"

const AddToFavouritesIconTV: React.FC<BaseTvProps> = (tvshow) => {
  const context = useContext(MoviesContext);
  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(tvshow)
    context.addToFavouritesTv(tvshow);

  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIconTV;