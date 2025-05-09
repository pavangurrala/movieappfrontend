export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?:number[]
  }

  export interface BaseMovieListProps {
    movies : BaseMovieProps[];
    action: (m: BaseMovieProps) => React.ReactNode;
  }

  export interface MovieDetailsProps extends BaseMovieProps{
    genres:{
        id:number;
        name: string;
    }[],
    productioncountries :{
        id:number;
        countryname: string
    }[]
  }

  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  
  export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
  }

  export type FilterOption = "title" | "genre";

  export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
  }

  export interface Review{
    id: string;
    content: string
    author: string
  }
  export interface GenreData {
    genres: {
      id: string;
      name: string
    }[];
  }
  
  export interface DiscoverMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovieProps[];
  }

  export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }

  export interface PopularMovieStars {
    adult: boolean,
    backdrop_path:string,
    genre_ids?:number[],
    id:number,
    media_type:string,
    original_language:string,
    original_title:string,
    overview:string,
    poster_path?:string,
    release_date:string,
    title:string,
    video:boolean,
    vote_average:number,
    vote_count:number
  }

  export interface Popularstars extends PopularMovieStars {
    name: string,
    popularity: number,
    profile_path: string
  }

  export interface ActorDetails{
    adult:boolean,
    also_known_as?:string[],
    biography:string,
    birthday:string,
    deathday:string,
    gender:number,
    homepage:string,
    id:number,
    imdb_id:string,
    known_for_department:string,
    name:string,
    place_of_birth:string,
    popularity:number,
    profile_path:string
  }
  export interface ActorImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  export interface Person{
    id: number;
    name: string;
    profile_path: string | null;
    popularity: number;
  }

  export interface MovieCredit{
    id:number;
    title:string;
    poster_path:string
  }

  

  

