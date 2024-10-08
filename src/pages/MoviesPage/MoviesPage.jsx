import { lazy, useEffect, useState } from 'react';
import { getMovieByTitle } from 'utils/movies-api';
import { useSearchParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { errorToast } from 'utils/toasts';

const MovieList = lazy(() => import('components/MovieList/MovieList'));
const SearchForm = lazy(() => import('components/SearchForm/SearchForm'));

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notFound, setNotFound] = useState(false);
  const query = searchParams.get('query') ?? '';

  const handleSearch = query => {
    const nextParams = query ? { query } : {};
    setSearchParams(nextParams);
  };

  useEffect(() => {
    setNotFound(false);
    if (!query) {
      return;
    }
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieByTitle(query);
        data.length === 0 ? setNotFound(true) : setNotFound(false);
        setMovies(data);
      } catch (err) {
        errorToast(
          err.response?.data?.status_message || 'Failed to load movies'
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <main>
      <SearchForm onSearchSubmit={handleSearch} />
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {notFound && <p>No movies found</p>}
    </main>
  );
};

export default MoviesPage;
