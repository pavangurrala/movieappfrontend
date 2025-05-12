import React from "react";
import PageTemplate from "../components/templateTvShowPage";
import ReviewForm from "../components/tvreviewform";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { TvDetailsProps } from "../types/interfaces";

const WriteTVReviewPage: React.FC = () => {
    const location = useLocation()
    const { tvshowId } = location.state;
    const { data: tvshow, error, isLoading, isError } = useQuery<TvDetailsProps, Error>(
        ["tvshow", tvshowId],
        () => getTvShow(tvshowId)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {tvshow ? (
                    <PageTemplate tvshow={tvshow}>
                        <ReviewForm {...tvshow} />
                    </PageTemplate>
            ) : (
                <p>Waiting for movie review details</p>
            )}
        </>
    );
};

export default WriteTVReviewPage;
