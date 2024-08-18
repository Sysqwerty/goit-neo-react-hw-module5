import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2JhNjA2NGQ2MmUxMjIwMGRkN2U4NjRiOGEzOWEyYyIsIm5iZiI6MTcyMzgxOTQwNy43NjgyOTIsInN1YiI6IjY2YmY2NDM0ZDQ2NGIyYTA3MDk3YmY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qw-2Q6vot7g2699u_7N9COSCMuxyabjC9y93nsTdHTk';

export const getTrendingMoviesByDay = async () => {
  const { data } = await axios.get('/trending/movie/day');

  if (!data?.results) {
    throw new Error(data?.status_message || 'No results found');
  }

  return data.results;
};

export const getMovieDetails = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}`);
  return data;
};

export const getMovieByTitle = async title => {
  const { data } = await axios.get(`/search/movie`, {
    params: {
      query: title,
    },
  });
  return data.results;
};

export const getMovieCredits = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const getMovieReviews = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data.results;
};
