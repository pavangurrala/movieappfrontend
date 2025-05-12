import truncate from "lodash/truncate";
import { Review, TvShowReview } from "./types/interfaces";
export const excerpt = (string: string) => {
    return truncate(string, {
        length: 400, // maximum 400 characters
        separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
    });
}

export function getReviewsForMovie(movieId: number): Review[] {
    const reviews = JSON.parse(localStorage.getItem("moviereview") || "[]");
    return reviews.filter((r: Review) => r.movieId === movieId);
  }

  export function getReviewsForTVshow(tvshowID: number): TvShowReview[] {
    const reviews = JSON.parse(localStorage.getItem("tvshowreview") || "[]");
    return reviews.filter((r: TvShowReview) => r.tvShowId === tvshowID);
  }

