import React, { lazy } from 'react';
import { retry } from '../utils/CommonFunctions';
const RowList = lazy(() => retry(() => import('./RowList')));
const Slick = lazy(() => retry(() => import('./Slick')));

const Movies = () => {
  return (
    <>
      <Slick name='nowPlayingMovie' />
      <div className="container">
        <RowList name='discoverMovie' />
      </div>
    </>
  )
}

export default Movies
