import React, { lazy } from 'react';
import { retry } from '../utils/CommonFunctions';
const RowList = lazy(() => retry(() => import('./RowList')));
const TrailerList = lazy(() => retry(() => import('./TrailerList')));
const Slick = lazy(() => retry(() => import('./Slick')));

const Movies = () => {
  return (
    <>
      <Slick name='nowPlayingMovie' />
      <div className="container">
        <TrailerList name='movie' />
        <RowList name='nowPlayingMovie' />
        <RowList name='upcomingMovie' />
        <RowList name='discoverMovie' />
        <RowList name='topRatedMovie' />
      </div>
    </>
  )
}

export default Movies
