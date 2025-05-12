import React from "react";
import { TvShowReview } from "../../types/interfaces";

const MovieReview: React.FC<TvShowReview> =  (props) => {
  return (
    <>
      <p>Review By: {props.author} </p>
      <p>{props.content} </p>
    </>
  );
};
export default MovieReview