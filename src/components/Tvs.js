import React, { lazy } from 'react';
import { retry } from '../utils/CommonFunctions';
const RowList = lazy(() => retry(() => import('./RowList')));
const TrailerList = lazy(() => retry(() => import('./TrailerList')));
const Slick = lazy(() => retry(() => import('./Slick')));

const Movies = () => {
  return (
    <>
      <Slick name='onTheAirTv' />
      <div className="container">
        <TrailerList name='tv' />
        <RowList name='airingTodayTv' />
        <RowList name='onTheAirTv' />
        <RowList name='discoverTv' />
        <RowList name='topRatedTv' />
      </div>
    </>
  )
}

export default Movies
