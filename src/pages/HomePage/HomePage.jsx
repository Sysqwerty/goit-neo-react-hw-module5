import { lazy, useEffect } from 'react';
import { useState } from 'react';
import { getTrendingMoviesByDay } from 'utils/movies-api';
import { errorToast } from 'utils/toasts';
import Loader from 'components/Loader/Loader';

const MovieList = lazy(() => import('components/MovieList/MovieList'));

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await getTrendingMoviesByDay();
        setMovies(data);
      } catch (error) {
        errorToast('Error getting movies. Try again!');
        return;
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} basePath="movies" />}
    </main>
  );
};

export default HomePage;
