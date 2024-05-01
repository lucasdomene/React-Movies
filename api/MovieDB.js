import axios from 'axios';
import { API_KEY } from '../constants/constants';

const baseUrl = 'https://api.themoviedb.org/3';

const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`;

async function apiCall(endpoint, params) {
  const options = {
    method: 'GET',
    url: endpoint,
    params,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function fetchTrendingMovies() {
  return apiCall(trendingMoviesEndpoint);
}

export async function fetchUpcomingMovies() {
  return apiCall(upcomingMoviesEndpoint);
}

export async function fetchTopRatedMovies() {
  return apiCall(topRatedMoviesEndpoint);
}
