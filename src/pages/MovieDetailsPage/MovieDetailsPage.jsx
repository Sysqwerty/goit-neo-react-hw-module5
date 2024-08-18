import { Suspense, useEffect, useState } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import BackLink from 'components/BackLink/BackLink';
import { getMovieDetails } from 'utils/movies-api';
import css from './MovieDetailsPage.module.css';
import Loader from 'components/Loader/Loader';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, [movieId]);

  return (
    <main>
      <BackLink to={location.state ?? '/movies'}>Go back</BackLink>
      {movieDetails && (
        <div className={css.container}>
          {movieDetails && (
            <div className={css.movieCard}>
              <div className={css.poster}>
                <img
                  src={
                    movieDetails.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`
                      : 'https://via.placeholder.com/300'
                  }
                  alt={movieDetails.title}
                />
              </div>
              <div className={css.movieInfo}>
                <h1 className={css.title}>
                  {movieDetails.title}{' '}
                  {movieDetails.release_date &&
                    `(
                  ${new Date(movieDetails.release_date).getFullYear()})`}
                </h1>
                <p>
                  <strong>User Score:</strong> {movieDetails.vote_average}
                </p>
                {movieDetails.overview && (
                  <div className={css.overview}>
                    <h3>Overview</h3>
                    <p>{movieDetails.overview}</p>
                  </div>
                )}
                {movieDetails?.genres?.length > 0 && (
                  <div className={css.genres}>
                    <h3>Genres</h3>

                    <div className={css.genresList}>
                      {movieDetails.genres.map(genre => (
                        <span key={genre.id} className={css.genre}>
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <hr />
          <div className={css.additionalInfo}>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to="cast" state={location.state ?? '/movies'}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to="reviews" state={location.state ?? '/movies'}>
                  Reviews
                </Link>
              </li>
            </ul>
            <hr />

            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieDetailsPage;
