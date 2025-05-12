import React, { useState, useCallback } from "react";
import { BaseMovieProps,BaseTvProps, Review, TvShowReview  } from "../types/interfaces";
interface MovieContextInterface {
    favourites: number[];
    favouritesTV: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    addToFavouritesTv:((tvshow: BaseTvProps)=> void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    removeFromTVFavourites: ((tvshow: BaseTvProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void); 
    addTvShowReview:((tvshow: BaseTvProps, review: TvShowReview)=>void);
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    favouritesTV:[],
    addToFavourites: () => {},
    addToFavouritesTv:()=>{},
    removeFromFavourites: () => {},
    removeFromTVFavourites: () => {},
    addReview: (movie, review) => { movie.id, review},
    addTvShowReview:(tvshow, review) =>{tvshow.id, review}
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [favouritesTV, setFavouritesTV] = useState<number[]>([]);
    const [, setMyReviews] = useState<Record<number, Review>>({});
    const [myTvReviews, setMyTvReviews] = useState<Record<number, TvShowReview>>({});
    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);
    const addToFavouritesTv = useCallback((tvshow:BaseTvProps) => {
        console.log(tvshow)
        setFavouritesTV((prevtVFavourites) => {
            if (!prevtVFavourites.includes(tvshow.id)) {
                return [...prevtVFavourites, tvshow.id];
            }
            return prevtVFavourites;
        });
    }, []);
    const addReview = (movie: BaseMovieProps, review: Review) => {
        setMyReviews((prevReviews: Record<number, Review>) => ({ ...prevReviews, [movie.id]: review }));
      };
    const addTvShowReview = async(tvshow:BaseTvProps, tvreview:TvShowReview)=>{
        // const idToken = localStorage.getItem("idToken");
        // if(!idToken){
        //     alert("User is not authenticated")
        // }
        const addedReview = 
            {...myTvReviews, [tvshow.id]: tvreview}
        
        setMyTvReviews(addedReview)
        localStorage.setItem("mytvReviews", JSON.stringify(addReview))
    }  
    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);
    const removeFromTVFavourites = useCallback((tvshow: BaseTvProps) => {
        setFavouritesTV((prevtVFavourites) => prevtVFavourites.filter((tId) => tId !== tvshow.id));
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                favouritesTV,
                addToFavourites,
                addToFavouritesTv,
                removeFromFavourites,
                removeFromTVFavourites,
                addReview,
                addTvShowReview
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
