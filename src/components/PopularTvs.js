import React, { lazy } from 'react';
import { retry } from '../utils/CommonFunctions';
const RowList = lazy(() => retry(() => import('./RowList')));
const Slick = lazy(() => retry(() => import('./Slick')));

const PopularTvs = () => {
  return (
    <>
      <Slick name='onTheAirTv' />
      <div className="container">
        <RowList name='discoverTv' />
      </div>
    </>
  )
}

export default PopularTvs
