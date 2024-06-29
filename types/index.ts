import { TabBarIcon } from "@/components/navigation/TabBarIcon";
interface Genre {
  genre1: string;
  genre2: string;
  genre3: string;
}

interface DownloadLink {
  name: string;
  link: string;
}

interface Item {
  _id: string;
  image: string;
  name: string;
  details: string;
  downloadLink: DownloadLink[];
  trailer: string;
  genre: Genre;
  releaseDate: string;
  runtime: string;
  director: string;
  rated: string;
  type: string;
  quality?: string;
  createdAt: string;
}

interface NewMovie {
  id: string;
  image: string;
  name: string;
}

interface Data {
  items: Item[];
  itemCount: number;
}

export type { Item, Data, NewMovie };

export type ApiMovie = {
  __v: number;
  _id: string;
  createdAt: string;
  details: string;
  director: string;
  downloadLink: DownloadLink[];
  genre: string[];
  image: string;
  name: string;
  quality: string;
  rated: string;
  releaseDate: string;
  runtime: string;
  trailer: string;
  type: string;
  year: number;
};

type Pagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type MoviesApiResponse = {
  movies: ApiMovie[];
  pagination: Pagination;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
};
