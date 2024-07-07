import axios from "axios";
import { ApiMovie, ApiResponse, Data, Item, MoviesApiResponse } from "@/types";

//endpoints
const apiBaseUrl = "https://flixnomad-app-backend.vercel.app/api";

const moviesEndpoint = `${apiBaseUrl}/movies`;
const trendingMoviesEndpoint = `${apiBaseUrl}/movies/trending`;

// Generic API call function
const apiCall = async <T>(
  endpoint: string,
  params?: object
): Promise<ApiResponse<T>> => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  // console.log(options);

  try {
    const response = await axios.request<T>(options);
    // console.log(response.data);

    return { data: response.data };
  } catch (error) {
    console.error(error, `fetching ${endpoint}`);
    return { error: "Unable to fetch data!" };
  }
};

export const fetchTrendingMovies = () => {
  console.log(trendingMoviesEndpoint);

  return apiCall<ApiMovie[]>(trendingMoviesEndpoint);
};

export const fetchnewMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchMovies = (perPage: number) => {
  const params = { perPage };
  return apiCall<MoviesApiResponse>(moviesEndpoint, params);
};

export const fetSingleMovie = (movieId: string) => {
  return apiCall<ApiMovie>(`${apiBaseUrl}/movie/${movieId}`);
};

export const fetchMoviesWithPagination = (page: number, perPage: number) => {
  const params = { page, perPage, type: "movie" };
  return apiCall<MoviesApiResponse>(moviesEndpoint, params);
};

export const fetchSeriesWithPagination = (page: number, perPage: number) => {
  const params = { page, perPage, type: "series" };
  return apiCall<MoviesApiResponse>(moviesEndpoint, params);
};

export const fetchGenres = () => {
  return apiCall<{ genres: string[] }>(`${apiBaseUrl}/movies/genres`);
};

export const fetchGenre = (genre: string) => {
  const link = `${apiBaseUrl}/movies/genres/genre?genre=${genre}`;
  // console.log(link);
  return apiCall<MoviesApiResponse>(
    `${apiBaseUrl}/movies/genres/genre?genre=${genre}`
  );
};
