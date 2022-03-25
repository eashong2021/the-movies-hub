import React, { lazy } from 'react';
import { retry } from '../utils/CommonFunctions';
const RowList = lazy(() => retry(() => import('./RowList')));
const Slick = lazy(() => retry(() => import('./Slick')));

const NowPlayingMovies = () => {
  return (
    <>
      <Slick name='nowPlayingMovie' />
      <div className="container">
        <RowList name='nowPlayingMovie' />
      </div>
    </>
  )
}

export default NowPlayingMovies
