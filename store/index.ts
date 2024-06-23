import axios from "axios";
import { ApiResponse, Data, Item, MoviesApiResponse, NewMovie } from "@/types";

//endpoints
const apiBaseUrl = "https://flixnomad-app-backend-express.onrender.com/api";
const trendingMoviesEndpoint = `${apiBaseUrl}/movies`;

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

  try {
    const response = await axios.request<T>(options);
    return { data: response.data };
  } catch (error) {
    console.error(error, `fetching ${endpoint}`);
    return { error: "Unable to fetch data!" };
  }
};

export const fetchTrendingMovies = () => {
  return apiCall<MoviesApiResponse>(trendingMoviesEndpoint);
};

export const fetchnewMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const trendingMovies: Item[] = [
  {
    _id: "665419212241bbe57640cd11",
    image:
      "https://i.postimg.cc/kGB5wYy5/AAAABe-Fvoku-Ed1wt-QEi-I-wz-Cy-Q2-Nxq-Km7u-O9-QOB2r-Ux5-OADLq7t-SJBf-Lci-QUg-Wj6yy-Fx9-If-JOzxhx-Yp-Svwje-Rm-ZFIawc-VML80d-W.jpg",
    name: "Atlas 2024",
    details:
      " In a bleak-sounding future, an A.I. soldier has determined that the only way to end war is to end humanity.",
    downloadLink: [
      {
        name: "720p",
        link: "https://mega.nz/file/rbYzWKjC#ODC5WqnajTa0GgWExBONT3vVab7QUK3Qv8ljpGzqh74",
      },
    ],
    trailer: "https://youtu.be/Jokpt_LJpbw?si=DdKa9-ZUsi1bXQZV",
    genre: { genre1: "Action", genre2: "Adventure", genre3: "Sci-Fi" },
    releaseDate: "24 / 5 / 2024",
    runtime: "1h 58min",
    director: "Brad Peyton",
    rated: "PG-13",
    type: "movie",
    quality: "720p",
    createdAt: "2024-05-27T05:24:48.246Z",
  },
  {
    _id: "6643092949668488d3cb86cf",
    image:
      "https://i.postimg.cc/JhGD0C4Y/MV5-BY2-Qw-OGE2-NGQt-MWQw-Ni00-M2-Iz-LThl-NWIt-YWMz-NGQ5-YWNi-ZDA4-Xk-Ey-Xk-Fqc-Gde-QXVy-NTE1-Nj-Y5-Mg-V1.jpg",
    name: "Godzilla x Kong: The New Empire 2024",
    details:
      "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.",
    downloadLink: [
      {
        name: "720p",
        link: "https://mega.nz/file/MucigJ7a#2Co5EzBbCQQpPVpDVCQ7FJ1vrYsilMMYkoPwqNYHUm4",
      },
      {
        name: "1080p",
        link: "https://mega.nz/file/UjVUDaKA#IWFzIEji7wIYft540IWj97aDIi4bRIMbgRPlM4e3QVE",
      },
    ],
    trailer:
      "https://m.youtube.com/watch?v=lV1OOlGwExM&pp=ygUsZ29kemlsbGEgeCBrb25nIHRoZSBuZXcgZW1waXJlIDIwMjQgdHJhaWxlciA%3D",
    genre: { genre1: "Action", genre2: "Adventure", genre3: "Fantasy" },
    releaseDate: "4 / 4 / 2024 (Germany)",
    runtime: "1h 55min",
    director: "Adam Wingard",
    rated: "12",
    type: "movie",
    quality: "720p & 1080p",
    createdAt: "2024-05-14T06:48:08.412Z",
  },
  {
    _id: "6654365e300b7943e954371b",
    image:
      "https://i.postimg.cc/W1rBsgnz/MV5-BOTI5-Mj-Nj-MTMt-N2-Ni-NC00-Yj-Bl-LTgz-MWQt-MGRh-ZDZk-Ym-Y1-NGU2-Xk-Ey-Xk-Fqc-Gde-QXVy-NTgy-NTA4-Mj-M-V1.jpg",
    name: "Godzilla Minus One [2023]",
    details:
      "Post war Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.",
    downloadLink: [
      {
        name: "720p",
        link: "https://mega.nz/file/nWxnRTDB#of09iCPFmo_KKepFnOgH5MPzDxs0jtKfMferq7HR5bA",
      },
      {
        name: "480p",
        link: "https://mega.nz/file/aw9xnbSQ#rujn_lY2YcTppG1ycy7Lje7-h_no4hil_WB7RCI5e1I",
      },
    ],
    trailer: "https://youtu.be/VvSrHIX5a-0?si=SKNJJd9CEA9co_aY",
    genre: {
      genre1: "Sci-Fi",
      genre2: "Action",
      genre3: "Adventure",
    },
    releaseDate: "1 / 12 / 2023 (Germany)",
    runtime: "2h 4min",
    director: "Takashi Yamazaki",
    rated: "12",
    type: "movie",
    quality: "720p & 480p",
    createdAt: "2024-05-27T07:29:34.714Z",
  },
  {
    _id: "661bfe6c0ba225ab3c7520d6",
    image:
      "https://i.postimg.cc/JhS0cRDx/MV5-BN2-Ew-Nj-Fh-Mm-Et-ZDc4-YS00-OTUw-LTky-ODEt-Mz-Vi-Mzli-ZWIy-Mz-Yx-Xk-Ey-Xk-Fqc-Gde-QXVy-Mjkw-OTAy-MDU-V1.jpg",
    name: "Fallout 2024",
    details:
      "In a future, post-apocalyptic Los Angeles brought about by nuclear decimation, citizens must live in underground bunkers to protect themselves from radiation, mutants and bandits.",
    downloadLink: [
      {
        name: "Season 1",
        link: "https://mega.nz/folder/FC0jVK7I#efTlu3i3NHsskkcNiOM1fA",
      },
    ],
    trailer: "https://www.youtube.com/watch?v=V-mugKDQDlg",
    genre: {
      genre1: "Adventure",
      genre2: "Drama",
      genre3: "Sci-Fi",
    },
    releaseDate: "11 / 4 / 2024",
    runtime: "",
    director: "Geneva Robertson-Dworet Graham Wagner",
    rated: "16",
    type: "series",
    quality: "720p",
    createdAt: "2024-04-14T16:03:55.218Z",
  },
];

export const newMovies: Item[] = [
  {
    _id: "666aefa948d0d222debe7dc1",
    image:
      "https://i.postimg.cc/k5bwRgzB/MV5-BY2-U5-Ym-Q3-Yjgt-M2-I2-OC00-Ym-M5-LTky-M2-Mt-N2-I5-Zjg2-MDE0-ODkw-Xk-Ey-Xk-Fqc-Gde-QXVy-MDM2-NDM2-MQ-V1.jpg",
    name: "Bad Boys: Ride or Die 2024",
    details:
      "This Summer, the world's favorite Bad Boys are back with their iconic mix of edge-of-your seat action and outrageous comedy but this time with a twist: Miami's finest are now on the run.",
    downloadLink: [
      {
        name: "720p Cam-Rip",
        link: "https://mega.nz/file/OfBi2RSY#rodkyf7cUzBpcIewfBe_FPzvMQNt4tiQhsQ0q2v3yZM",
      },
    ],
    trailer: "https://youtu.be/hRFY_Fesa9Q?si=Bid9_oLH92bBBVKR",
    genre: { genre1: "Comedy", genre2: "Action", genre3: "Adventure" },
    releaseDate: "5 / 6 / 2024",
    runtime: "1h 55min",
    director: "Adil El Arbi Bilall Fallah",
    rated: "16",
    type: "movie",
    quality: "720p Cam-Rip",
    createdAt: "2024-06-13T13:10:01.721Z",
  },
  {
    _id: "6654365e300b7943e954371b",
    image:
      "https://i.postimg.cc/W1rBsgnz/MV5-BOTI5-Mj-Nj-MTMt-N2-Ni-NC00-Yj-Bl-LTgz-MWQt-MGRh-ZDZk-Ym-Y1-NGU2-Xk-Ey-Xk-Fqc-Gde-QXVy-NTgy-NTA4-Mj-M-V1.jpg",
    name: "Godzilla Minus One [2023]",
    details:
      "Post war Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.",
    downloadLink: [
      {
        name: "720p",
        link: "https://mega.nz/file/nWxnRTDB#of09iCPFmo_KKepFnOgH5MPzDxs0jtKfMferq7HR5bA",
      },
      {
        name: "480p",
        link: "https://mega.nz/file/aw9xnbSQ#rujn_lY2YcTppG1ycy7Lje7-h_no4hil_WB7RCI5e1I",
      },
    ],
    trailer: "https://youtu.be/VvSrHIX5a-0?si=SKNJJd9CEA9co_aY",
    genre: { genre1: "Sci-Fi", genre2: "Action", genre3: "Adventure" },
    releaseDate: "1 / 12 / 2023 (Germany)",
    runtime: "2h 4min",
    director: "Takashi Yamazaki",
    rated: "12",
    type: "movie",
    quality: "720p & 480p",
    createdAt: "2024-05-27T07:29:34.714Z",
  },
  {
    _id: "6654345a300b7943e954371a",
    image:
      "https://i.postimg.cc/PrMdXfcj/MV5-BYTJl-Njlk-ZTkt-Nj-Ew-OS00-Nz-I5-LTlk-NDAt-Zm-Ew-ZDFm-Ym-M2-Mj-U2-Xk-Ey-Xk-Fqc-Gde-QXVy-Njg2-Nj-Qw-MDQ-V1.jpg",
    name: "IT Chapter Two 2019",
    details:
      "Twenty-seven years after their first encounter with the terrifying Pennywise, the Losers Club have grown up and moved away, until a devastating phone call brings them back.",
    downloadLink: [
      {
        name: "480p",
        link: "https://mega.nz/file/p9sXBKTZ#FHUTycywyMmTAcfzr5EBRaNvniQGN1cdE4H2MUL4UyY",
      },
      {
        name: "720p",
        link: "https://mega.nz/folder/IoUi1LjK#0Qx70arRlkeAXlh5YP9G7Q",
      },
      {
        name: "1080p",
        link: "https://mega.nz/folder/IoUi1LjK#0Qx70arRlkeAXlh5YP9G7Q",
      },
      {
        name: "1440p",
        link: "https://mega.nz/folder/IoUi1LjK#0Qx70arRlkeAXlh5YP9G7Q",
      },
    ],
    trailer: "https://youtu.be/xhJ5P7Up3jA?si=5S_MmXCyOhp1dp2O",
    genre: { genre1: "Horror", genre2: "Drama", genre3: "Fantasy" },
    releaseDate: "5 / 9 / 2019",
    runtime: "2h 49min",
    director: " Andy Muschietti",
    rated: "16",
    type: "movie",
    quality: "480p & 720p & 1080p & 1440p",
    createdAt: "2024-05-27T07:20:57.347Z",
  },
];

export const allMovies: Data = {
  items: [
    {
      _id: "666aefa948d0d222debe7dc1",
      image:
        "https://i.postimg.cc/k5bwRgzB/MV5-BY2-U5-Ym-Q3-Yjgt-M2-I2-OC00-Ym-M5-LTky-M2-Mt-N2-I5-Zjg2-MDE0-ODkw-Xk-Ey-Xk-Fqc-Gde-QXVy-MDM2-NDM2-MQ-V1.jpg",
      name: "Bad Boys: Ride or Die 2024",
      details:
        "This Summer, the world's favorite Bad Boys are back with their iconic mix of edge-of-your seat action and outrageous comedy but this time with a twist: Miami's finest are now on the run.",
      downloadLink: [
        {
          name: "720p Cam-Rip",
          link: "https://mega.nz/file/OfBi2RSY#rodkyf7cUzBpcIewfBe_FPzvMQNt4tiQhsQ0q2v3yZM",
        },
      ],
      trailer: "https://youtu.be/hRFY_Fesa9Q?si=Bid9_oLH92bBBVKR",
      genre: { genre1: "Comedy", genre2: "Action", genre3: "Adventure" },
      releaseDate: "5 / 6 / 2024",
      runtime: "1h 55min",
      director: "Adil El Arbi Bilall Fallah",
      rated: "16",
      type: "movie",
      quality: "720p Cam-Rip",
      createdAt: "2024-06-13T13:10:01.721Z",
    },
    {
      _id: "6654365e300b7943e954371b",
      image:
        "https://i.postimg.cc/W1rBsgnz/MV5-BOTI5-Mj-Nj-MTMt-N2-Ni-NC00-Yj-Bl-LTgz-MWQt-MGRh-ZDZk-Ym-Y1-NGU2-Xk-Ey-Xk-Fqc-Gde-QXVy-NTgy-NTA4-Mj-M-V1.jpg",
      name: "Godzilla Minus One [2023]",
      details:
        "Post war Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.",
      downloadLink: [
        {
          name: "720p",
          link: "https://mega.nz/file/nWxnRTDB#of09iCPFmo_KKepFnOgH5MPzDxs0jtKfMferq7HR5bA",
        },
        {
          name: "480p",
          link: "https://mega.nz/file/aw9xnbSQ#rujn_lY2YcTppG1ycy7Lje7-h_no4hil_WB7RCI5e1I",
        },
      ],
      trailer: "https://youtu.be/VvSrHIX5a-0?si=SKNJJd9CEA9co_aY",
      genre: { genre1: "Sci-Fi", genre2: "Action", genre3: "Adventure" },
      releaseDate: "1 / 12 / 2023 (Germany)",
      runtime: "2h 4min",
      director: "Takashi Yamazaki",
      rated: "12",
      type: "movie",
      quality: "720p & 480p",
      createdAt: "2024-05-27T07:29:34.714Z",
    },
    {
      _id: "6654345a300b7943e954371a",
      image:
        "https://i.postimg.cc/PrMdXfcj/MV5-BYTJl-Njlk-ZTkt-Nj-Ew-OS00-Nz-I5-LTlk-NDAt-Zm-Ew-ZDFm-Ym-M2-Mj-U2-Xk-Ey-Xk-Fqc-Gde-QXVy-Njg2-Nj-Qw-MDQ-V1.jpg",
      name: "IT Chapter Two 2019",
      details:
        "Twenty-seven years after their first encounter with the terrifying Pennywise, the Losers Club have grown up and moved away, until a devastating phone call brings them back.",
      downloadLink: [
        {
          name: "480p",
          link: "https://mega.nz/file/p9sXBKTZ#FHUTycywyMmTAcfzr5EBRaNvniQGN1cdE4H2MUL4UyY",
        },
        {
          name: "720p",
          link: "https://mega.nz/folder/IoUi1LjK#0Qx70arRlkeAXlh5YP9G7Q",
        },
        {
          name: "1080p",
          link: "https://mega.nz/folder/IoUi1LjK#0Qx70arRlkeAXlh5YP9G7Q",
        },
        {
          name: "1440p",
          link: "https://mega.nz/folder/IoUi1LjK#0Qx70arRlkeAXlh5YP9G7Q",
        },
      ],
      trailer: "https://youtu.be/xhJ5P7Up3jA?si=5S_MmXCyOhp1dp2O",
      genre: { genre1: "Horror", genre2: "Drama", genre3: "Fantasy" },
      releaseDate: "5 / 9 / 2019",
      runtime: "2h 49min",
      director: " Andy Muschietti",
      rated: "16",
      type: "movie",
      quality: "480p & 720p & 1080p & 1440p",
      createdAt: "2024-05-27T07:20:57.347Z",
    },
    {
      _id: "66542fde72095a68cb121309",
      image:
        "https://i.postimg.cc/tJt12Cwq/MV5-BZDVk-Zm-I0-Yz-At-Nzdj-Yi00-Zjhh-LWE1-ODEt-MWMz-MWMz-NDA0-Nm-Q4-Xk-Ey-Xk-Fqc-Gde-QXVy-Nz-Yz-ODM3-Mzg-V1.jpg",
      name: "IT 2017",
      details:
        "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town",
      downloadLink: [
        {
          name: "720p",
          link: "https://mega.nz/file/3PAxkSiA#lkcjhejcHDOo8d1As1HCCvIsNyWRpr6ierUEjgWqjcI",
        },
      ],
      trailer: "https://youtu.be/FnCdOQsX5kc?si=yqUyFADMcv-Ak3HE",
      genre: { genre1: "Horror", genre2: "Fantasy", genre3: "" },
      releaseDate: "28 / 9 / 2017",
      runtime: "2h 15min",
      director: " Andy Muschietti",
      rated: "16",
      type: "movie",
      quality: "720p",
      createdAt: "2024-05-27T07:01:50.647Z",
    },
    {
      _id: "66542de272095a68cb121308",
      image:
        "https://i.postimg.cc/FHhj30Mf/MV5-BMj-Ax-Mz-Y3-Njcx-NF5-BMl5-Ban-Bn-Xk-Ft-ZTcw-NTI5-OTM0-Mw-V1.jpg",
      name: "Inception 2010",
      details:
        " A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the pro",
      downloadLink: [
        {
          name: "480p",
          link: "https://mega.nz/file/27IzHaQb#D9gm6Mn3_MaGHzXAiEOqadi3mUjE62Ll2sotPatftPQ",
        },
        {
          name: "720p",
          link: "https://mega.nz/file/DyYVHIgA#4x-qMf4wYGKi8luqIL2g4w8p2uQ0Dna_GbB-MqdOlk4",
        },
        {
          name: "1080p",
          link: "https://mega.nz/folder/gcVkmBJR#VnGPzEzUVaVpObXBPi7OGg",
        },
      ],
      trailer: "https://youtu.be/YoHD9XEInc0?si=Fbmm6wsXd49EKq6O",
      genre: { genre1: "Action", genre2: "Adventure", genre3: "Sci-Fi" },
      releaseDate: "29 / 7 / 2010",
      runtime: "2h 28min",
      director: "Christopher Nolan",
      rated: "12",
      type: "movie",
      quality: "480p & 720p & 1080p",
      createdAt: "2024-05-27T06:53:21.769Z",
    },
  ],
  itemCount: 81,
};
