import axios from 'axios';
import { API_KEY } from '../constants/constants';

const baseUrl = 'https://api.themoviedb.org/3';

const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`;
const movieDetailsEndpoint = `${baseUrl}/movie/{movie_id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = `${baseUrl}/movie/{movie_id}/credits?api_key=${API_KEY}`;
const movieRecommendationsEndpoint = `${baseUrl}/movie/{movie_id}/recommendations?api_key=${API_KEY}`;
const personDetailsEndpoint = `${baseUrl}/person/{person_id}?api_key=${API_KEY}`;
const personMovieCreditsEndpoint = `${baseUrl}/person/{person_id}/movie_credits?api_key=${API_KEY}`;

async function request(endpoint, params) {
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
  return request(trendingMoviesEndpoint);
}

export async function fetchUpcomingMovies() {
  return request(upcomingMoviesEndpoint);
}

export async function fetchTopRatedMovies() {
  return request(topRatedMoviesEndpoint);
}

export async function fetchMovieDetails(id) {
  return request(movieDetailsEndpoint.replace('{movie_id}', id));
}

export async function fetchMovieCredits(id) {
  return request(movieCreditsEndpoint.replace('{movie_id}', id));
}

export async function fetchMovieRecommendations(id) {
  return request(movieRecommendationsEndpoint.replace('{movie_id}', id));
}

export async function fetchPersonDetails(id) {
  return request(personDetailsEndpoint.replace('{person_id}', id));
}

export async function fetchPersonMovieCredits(id) {
  return request(personMovieCreditsEndpoint.replace('{person_id}', id));
}

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
