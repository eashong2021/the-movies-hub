import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { retry } from './utils/CommonFunctions';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
const Navigation = lazy(() => retry(() => import('./components/Navigation')));
const Home = lazy(() => retry(() => import('./components/Home')));
const Movie = lazy(() => retry(() => import('./components/Movie')));
const Movies = lazy(() => retry(() => import('./components/Movies')));
const Tv = lazy(() => retry(() => import('./components/Tv')));
const Tvs = lazy(() => retry(() => import('./components/Tvs')));
const Person = lazy(() => retry(() => import('./components/Person')));
const People = lazy(() => retry(() => import('./components/People')));
const MovieList = lazy(() => retry(() => import('./components/MovieList')));
const Episode = lazy(() => retry(() => import('./components/Episode')));
const Footer = lazy(() => retry(() => import('./components/Footer')));

const PopularMovies = lazy(() => retry(() => import('./components/PopularMovies')));
const NowPlayingMovies = lazy(() => retry(() => import('./components/NowPlayingMovies')));
const UpcomingMovies = lazy(() => retry(() => import('./components/UpcomingMovies')));
const TopRatedMovies = lazy(() => retry(() => import('./components/TopRatedMovies')));
const PopularTvs = lazy(() => retry(() => import('./components/PopularTvs')));
const AiringTodayTvs = lazy(() => retry(() => import('./components/AiringTodayTvs')));

const App = () => {
  
  const pages = [
    {
      pageLink: '/movieshub/',
      view: Home,
      displayName: 'Home'
    },
    {
      pageLink: '/movieshub/movie',
      view: Movies,
      displayName: 'Movie'
    },
    {
      pageLink: '/movieshub/movie/:id',
      view: Movie,
      displayName: 'Movie'
    },
    {
      pageLink: '/movieshub/tv',
      view: Tvs,
      displayName: 'Tv'
    },
    {
      pageLink: '/movieshub/tv/:id',
      view: Tv,
      displayName: 'Tv'
    },
    {
      pageLink: '/movieshub/tv/:id/season/:number',
      view: Episode,
      displayName: 'Tv'
    },
    {
      pageLink: '/movieshub/people/:id',
      view: Person,
      displayName: 'Person'
    },
    {
      pageLink: '/movieshub/people',
      view: People,
      displayName: 'People'
    },
    {
      pageLink: '/movieshub/keyword/:id',
      view: MovieList,
      displayName: 'Movies'
    },
    {
      pageLink: '/movieshub/discover/tv',
      view: PopularMovies,
      displayName: 'Popular'
    }, 
    {
      pageLink: '/movie/now_playing',
      view: NowPlayingMovies,
      displayName: 'Now'
    },
    {
      pageLink: '/movie/upcoming',
      view: UpcomingMovies,
      displayName: 'Upcoming'
    },
    {
      pageLink: '/movie/top_rated',
      view: TopRatedMovies,
      displayName: 'Top Rated'
    },
    {
      pageLink: '/discover/tv',
      view: PopularTvs,
      displayName: 'Popular TV'
    },
    {
      pageLink: '/tv/on_the_air',
      view: AiringTodayTvs,
      displayName: 'Airing'
    }
  ];

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Navigation />
        <Switch>
          {pages.map((page, index) => {
            return (
              <Route
                exact
                path={page.pageLink}
                render={() => <page.view />}
                key={index}
              />
            );
          })}
          <Redirect to='movieshub/' />
        </Switch>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;

