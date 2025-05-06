import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "../src/pages/homePage"
import MoviePage from "../src/pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";

const App = () => {
  return (
    <BrowserRouter>
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/movies/favourites">Favourites</Link>
        </li>
    </ul>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

