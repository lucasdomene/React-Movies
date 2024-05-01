import axios from 'axios';
import { API_KEY } from '../constants/constants';

const baseUrl = 'https://api.themoviedb.org/3';

const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`;

export function image500(path) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/w500/${path}`;
}

export function image342(path) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/w342/${path}`;
}

export function image185(path) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/w185/${path}`;
}

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
