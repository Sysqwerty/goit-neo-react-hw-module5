import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import NotFound from 'pages/NotFoundPage/NotFoundPage';
import css from './App.module.css';
import { Toaster } from 'react-hot-toast';
import Loader from 'components/Loader/Loader';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('components/MovieReviews/MovieReviews'));

const App = () => {
  return (
    <div className={css.container}>
      <Navigation />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster />
    </div>
  );
};

export default App;
