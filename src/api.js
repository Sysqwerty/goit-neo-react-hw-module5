import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/';

axios.defaults.headers.common[
  'Authorization'
] = `Client-ID iftjBKOhq7CNeYdSNRmsD75uDoZcNem6e-f2CUvlgx8`;

export async function fetchSearch({ query, page = 1 }) {
  const response = await axios.get(`${BASE_URL}search/photos`, {
    params: {
      query,
      page,
    },
  });

  return response.data.results;
}
