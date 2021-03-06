export const API_KEY = "8f07394f2db7deb9052774820e5b832a";
export const API = "https://api.themoviedb.org/3";
export const API_TRENDING_ALL = API + "/trending/all/day?api_key=" + API_KEY;
export const API_DISCOVER_MOVIE = API + "/discover/movie?api_key=" + API_KEY;
export const API_NOWPLAYING_MOVIE =
  API + "/movie/now_playing?api_key=" + API_KEY;
export const API_TOPRATED_MOVIE = API + "/movie/top_rated?api_key=" + API_KEY;
export const API_UPCOMING_MOVIE = API + "/movie/upcoming?api_key=" + API_KEY;
export const API_AIRINGTODAY_TV = API + "/tv/airing_today?api_key=" + API_KEY;
export const API_TOPRATED_TV = API + "/tv/top_rated?api_key=" + API_KEY;
export const API_ONTHEAIR_TV = API + "/tv/on_the_air?api_key=" + API_KEY;
export const API_DISCOVER_TV = API + "/discover/tv?api_key=" + API_KEY;
export const API_PEOPLE = API + "/person/popular?api_key=" + API_KEY;
export const API_MOVIE = API + "/movie/";
export const API_TV = API + "/tv/";
export const API_PERSON = API + "/person/";
export const API_KEYWORD = API + "/keyword/";
export const API_SEARCH =
  API + "/search/multi?api_key=" + API_KEY + "&language=en-US&query=";
export const POSTER_PATH = "https://image.tmdb.org/t/p/";
export const WIDTH_200 = "w200";
export const WIDTH_300 = "w300";
export const WIDTH_500 = "w500";
export const WIDTH_ORIGINAL = "original";

export const dataList = {
  trending: {
    name: "TRENDING",
    api: API_TRENDING_ALL,
    title: "title",
    to: {
      movie: "/movieshub/movie/",
      tv: "/movieshub/tv/",
    },
  },
  discoverMovies: {
    name: "POPULAR MOVIES",
    api: API_DISCOVER_MOVIE,
    title: "title",
    to: "/movieshub/movie/",
  },
  discoverTv: {
    name: "POPULAR TV SHOWS",
    api: API_DISCOVER_TV,
    title: "name",
    to: "/movieshub/tv/",
  },
  similarMovie: {
    name: "SIMILAR MOVIES",
    api: API_MOVIE,
    title: "name",
    to: "/movieshub/movie/",
  },
  similarTv: {
    name: "SIMILAR TVs",
    api: API_TV,
    title: "name",
    to: "/movieshub/tv/",
  },
  recommendationMovie: {
    name: "RECOMMANDED MOVIES",
    api: API_MOVIE,
    title: "name",
    to: {
      movie: "/movieshub/movie/",
      tv: "/movieshub/tv/",
    },
  },
  recommendationTv: {
    name: "RECOMMANDED TVs",
    api: API_TV,
    title: "name",
    to: {
      movie: "/movieshub/movie/",
      tv: "/movieshub/tv/",
    },
  },
  movieCredits: {
    name: "MOVIE CREDITS",
    api: API_MOVIE,
    title: "name",
    to: "/movieshub/movie/",
  },
  tvCredits: {
    name: "TV CREDITS",
    api: API_TV,
    title: "name",
    to: "/movieshub/tv/",
  },
  nowPlayingMovies: {
    name: "NOW PLAYING MOVIES",
    api: API_NOWPLAYING_MOVIE,
    title: "title",
    to: "/movieshub/movie/",
  },
  topRatedMovies: {
    name: "TOP RATED MOVIES",
    api: API_TOPRATED_MOVIE,
    title: "title",
    to: "/movieshub/movie/",
  },
  upcomingMovies: {
    name: "UPCOMING MOVIES",
    api: API_UPCOMING_MOVIE,
    title: "title",
    to: "/movieshub/movie/",
  },
  airingTodayTvs: {
    name: "AIRING TODAY TVs",
    api: API_AIRINGTODAY_TV,
    title: "title",
    to: "/movieshub/tv/",
  },
  topRatedTvs: {
    name: "TOP RATED TVs",
    api: API_TOPRATED_TV,
    title: "title",
    to: "/movieshub/tv/",
  },
  onTheAirTvs: {
    name: "ON THE AIR TVs",
    api: API_ONTHEAIR_TV,
    title: "title",
    to: "/movieshub/tv/",
  },
  people: {
    name: "POPULAR PEOPLE",
    api: API_PEOPLE,
    title: "title",
    to: "/movieshub/people/",
  },
};

export const count_runtime = (time) => {
  let runtime = 0,
    runtimehr,
    runtimemin;
  if (time > 0) {
    if (time > 60) {
      runtimehr = Math.trunc(time / 60);
      runtime += runtimehr + "hr ";
      runtimemin = time % 60;
      runtime += runtimemin + "m";
    } else {
      runtime = time + "m";
    }
  } else {
    runtime = null;
  }
  return runtime;
};

export const getDate = (datetime) => {
  const date = new Date(datetime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString("en-US", options);
};

export const getDateShort = (datetime) => {
  const date = new Date(datetime);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleString("en-US", options);
};

export const avg = (value) => {
  return value.toFixed(1);
};

export const currency = (value) => {
  return isNaN(value)
    ? null
    : "$ " +
        (Math.abs(Number(value)) >= 1.0e9
          ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B"
          : Math.abs(Number(value)) >= 1.0e6
          ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
          : Math.abs(Number(value)) >= 1.0e3
          ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + "K"
          : Math.abs(Number(value)));
};
