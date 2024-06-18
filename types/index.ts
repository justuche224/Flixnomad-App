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
