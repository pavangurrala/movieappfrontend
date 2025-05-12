import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
//import {BaseTvProps} from "../../types/interfaces"
import { Link } from "react-router-dom";
interface TvShowReviewProps {
    id: number;
  }
const WriteTvShowReviewIcon:React.FC<TvShowReviewProps> = ({id}) => {
  return (
    <Link
    to={'/reviews/tvshowform'}
    state={{
        tvshowId: id,
      }}
  >
    <RateReviewIcon color="primary" fontSize="large" />
  </Link>
  );
};

export default  WriteTvShowReviewIcon;