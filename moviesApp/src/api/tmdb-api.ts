export const getMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
      return response.json();
    })
      .catch((error) => {
        throw error
      });
  };
  
  export const getMovie = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get movie data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getTvShow = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get tv show data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getTvGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  
  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

  export const getTvShowImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

  export const getMovieReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };
  export const getTvShowReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };
  export const getUpcomingMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response)=>{
        if(!response.ok){
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
      });
      
  };

  export const getPopularMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response)=>{
        if(!response.ok){
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
      });
      
  };
  export const getPopularTvSeries = () => {
    return fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response)=>{
        if(!response.ok){
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
      });
      
  };
  export const getSimilarMovies = async (id: string, page: number = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) throw new Error(`Failed to fetch similar movies.`);
    return response.json();
  };
  export const getSimilarTvShows = async (id: string, page: number = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1${page}`
    );
    if (!response.ok) throw new Error(`Failed to fetch similar movies.`);
    return response.json();
  };
  export const getSimilarTvSeries = async (id: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error(`Failed to fetch similar TV series.`);
    return response.json();
  };
  export const getPopularMovieStars = (page:number =1) => {
    return fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&page=${page}`
    ).then((response)=>{
        if(!response.ok){
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
      });
  };

  export const getActorDetails = async(id:number) =>{
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error(`Failed to fetch actor details movies.`);
    return response.json();
  }

  export const getActorCredits = async(id:number) =>{
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    );
    console.log(response)
    if (!response.ok) throw new Error(`Failed to fetch actor details movies.`);
    return response.json();
  }

