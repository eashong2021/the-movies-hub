import React, { lazy } from 'react';
import { retry } from '../utils/CommonFunctions';
const RowList = lazy(() => retry(() => import('./RowList')));
const Slick = lazy(() => retry(() => import('./Slick')));

const UpcomingMovies = () => {
  return (
    <>
      <Slick name='nowPlayingMovie' />
      <div className="container">
        <RowList name='upcomingMovie' />
      </div>
    </>
  )
}

export default UpcomingMovies
