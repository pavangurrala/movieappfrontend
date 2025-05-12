import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
//import { getMovieReviews } from "../../api/tmdb-api";
 import { getReviewsForTVshow } from "../../util";

import { TvDetailsProps, TvShowReview } from "../../types/interfaces"; // Import the MovieT type from the appropriate location

const styles = {
    table: {
        minWidth: 550,
    },
};

const TVShowReviews: React.FC<TvDetailsProps> = (tvshow) => { 
    const [reviews, setReviews] = useState<TvShowReview[]>([]);

    useEffect(() => {
       setReviews(getReviewsForTVshow(tvshow.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tvshow.id]);

    return (
        <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="reviews table">
                <TableHead>
                    <TableRow>
                        <TableCell >Author</TableCell>
                        <TableCell align="center">Excerpt</TableCell>
                        <TableCell align="right">More</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No reviews yet. Be the first to write one!
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((r) => (
              <TableRow key={r.tvShowId}>
                <TableCell>{r.author}</TableCell>
                <TableCell>{r.content.slice(0, 400)}...</TableCell>
                <TableCell>
                  <Link to={`/reviews/${r.tvShowId}`} state={{ review: r, tvshow }}>
                    Full Review
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TVShowReviews;
