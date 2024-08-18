import { marked } from 'marked';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorToast } from 'utils/toasts';
import { getMovieReviews } from 'utils/movies-api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setMovieReviews(data);
      } catch (err) {
        errorToast(
          err.response?.data?.status_message || 'Failed to load movie reviews'
        );
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {movieReviews?.length > 0 ? (
        <ul className={css.reviewList}>
          {movieReviews.map(({ id, author, content }) => (
            <li key={id} className={css.reviewItem}>
              <h3 className={css.reviewAuthor}>Author: {author}.</h3>
              <p dangerouslySetInnerHTML={{ __html: marked(content) }}></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don&apos;t have any reviews for that movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
