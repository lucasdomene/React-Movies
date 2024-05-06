import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

console.log(API_KEY);

const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = (page) =>
  `${baseUrl}/movie/upcoming?api_key=${API_KEY}&page=${page}`;
const topRatedMoviesEndpoint = (page) =>
  `${baseUrl}/movie/top_rated?api_key=${API_KEY}&page=${page}`;
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${API_KEY}`;

const movieDetailsEndpoint = (id) =>
  `${baseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = (id) =>
  `${baseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const movieRecommendationsEndpoint = (id) =>
  `${baseUrl}/movie/${id}/recommendations?api_key=${API_KEY}`;
const personDetailsEndpoint = (id) =>
  `${baseUrl}/person/${id}?api_key=${API_KEY}`;
const personMovieCreditsEndpoint = (id) =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

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

export async function fetchUpcomingMovies(page) {
  return request(upcomingMoviesEndpoint(page));
}

export async function fetchTopRatedMovies(page) {
  return request(topRatedMoviesEndpoint(page));
}

export async function fetchMovieDetails(id) {
  return request(movieDetailsEndpoint(id));
}

export async function fetchMovieCredits(id) {
  return request(movieCreditsEndpoint(id));
}

export async function fetchMovieRecommendations(id) {
  return request(movieRecommendationsEndpoint(id));
}

export async function searchMovies(query) {
  return request(searchMoviesEndpoint, query);
}

export async function fetchPersonDetails(id) {
  return request(personDetailsEndpoint(id));
}

export async function fetchPersonMovieCredits(id) {
  return request(personMovieCreditsEndpoint(id));
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
