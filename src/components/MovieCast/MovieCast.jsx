import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from 'utils/movies-api';
import { errorToast } from 'utils/toasts';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    const fetchMovieCredits = async () => {
      try {
        const data = await getMovieCredits(movieId);
        if (data.length === 0) {
          setNotFound(true);
          return;
        }
        setMovieCredits(data);
      } catch (err) {
        errorToast(
          err.response?.data?.status_message || 'Failed to load movie credits'
        );
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <div>
      {movieCredits?.length > 0 && (
        <ul className={css.castList}>
          {movieCredits.map(({ id, profile_path, name, character }) => (
            <li key={id} className={css.castItem}>
              <img
                className={css.castImage}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w92${profile_path}`
                    : 'https://via.placeholder.com/150'
                }
                alt={name}
              />
              <p className={css.castName}>{name}</p>
              {character && (
                <p className={css.castCharacter}>Character: {character}</p>
              )}
            </li>
          ))}
        </ul>
      )}
      {notFound && <p>We don&apos;t have list of cast for that movie.</p>}
    </div>
  );
};

export default MovieCast;
