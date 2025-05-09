
import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "../src/pages/homePage"
import MoviePage from "../src/pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import AuthenticationPage from './pages/authPage'
import ConfirmSignUpPage from './pages/ConfirmSignUpForm'
import PopularMoviesPage from "./pages/popularMoviesPage";
import { AuthProvider } from "./contexts/authContext";
import PopularActorsPage from "./pages/popularActorsPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 360000,
        refetchInterval: 360000, 
        refetchOnWindowFocus: false
      },
    },
  });
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <SiteHeader/>
                <MoviesContextProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/authPage" element={<AuthenticationPage />} />
                    <Route path="/confirm-signup" element={<ConfirmSignUpPage />} />
                    <Route path="/movies/:id" element={<MoviePage />} />
                    <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                    <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                    <Route path="/movies/popular" element={<PopularMoviesPage />} />
                    <Route path="/person/popular" element={<PopularActorsPage />} />
                    <Route path="/reviews/:id" element={<MovieReviewPage/>} />
                    <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
                    <Route path="/actor/:id" element={<ActorDetailsPage/>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                </MoviesContextProvider>
          </AuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

