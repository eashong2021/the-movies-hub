import React, { useState, useEffect, lazy } from 'react'
import { useParams, useHistory } from 'react-router';
import ReadMoreReact from 'read-more-react';
import { API_MOVIE, API_KEY, POSTER_PATH, WIDTH_ORIGINAL, WIDTH_500, count_runtime, avg, currency } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { retry } from '../utils/CommonFunctions';
import axios from 'axios';
import frame1 from '../resources/Frame1.png'
import frame2 from '../resources/Frame2.png'
import { FiExternalLink, FiSlash } from 'react-icons/fi';
const RowList = lazy(() => retry(() => import('./RowList')));
const CastList = lazy(() => retry(() => import('./CastList')));
const Keyword = lazy(() => retry(() => import('./Keyword')));
const Review = lazy(() => retry(() => import('./Review')));
const ExternalId = lazy(() => retry(() => import('./Externalid')));
const Video = lazy(() => retry(() => import('./Video')));

const Movie = () => {

  let history = useHistory();
  const id = useParams().id;
  const [data, setData] = useState([]);

  const idealLength = 250;
  const maxLength = 300;


  useEffect(() => {
    const getData = async () => {
      axios.get(API_MOVIE + id + '?api_key=' + API_KEY + '&append_to_response=release_dates')
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [id]);

  return (
    <>
      {data.length !== 0 ? 
      <>
        <LazyLoadImage className="img-backdrop" src={POSTER_PATH + WIDTH_ORIGINAL + data.backdrop_path} effect="opacity" alt={data.title} onError={(e) => { e.target.onerror = null; e.target.src = frame2 }} />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-2">
              <LazyLoadImage className="img-poster rounded" src={POSTER_PATH + WIDTH_500 + data.poster_path} effect="opacity" alt={data.title} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
              {data.homepage ? <div className='hide-sm'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div> : null}
              <div className="bebasFont hide-md mt-3 mb-3 text-break">{data.title}</div>
              {data.homepage ? <div className='hide-md mt-3'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div> : null}
              <div className='hide-sm'>
                <div><ExternalId id={id} name='movie' /></div>
                <div>{data.status ? <><div className="text-bold">Status</div><div className='text-secondary'>{data.status}</div></> : null}</div>
                <div>{data.original_language ? <><div className="mt-4 text-bold">Language</div><div className='text-secondary'>{data.original_language}</div></> : null}</div>
                <div>{data['revenue']?.length > 0 ? <><div className="mt-4 text-bold">Revenue</div><div className='text-secondary'>{currency(data.revenue)}</div></> : null}</div>
                <div>{data['budget']?.length > 0 ? <><div className="mt-4 text-bold">Budget</div><div className='text-secondary'>{currency(data.budget)}</div></> : null}</div>
                <Keyword id={id} name='movie' />
              </div>
            </div>
            <div className="col-12 col-md-10 mt-3">
              <div className="bebasFont hide-sm text-break">{data.title}</div>
              <div>{data.release_dates ? data.release_dates['results'].map((dataCerti, index) => (
                dataCerti.iso_3166_1 === 'US' ?
                  <div className='text-secondary badge py-2' key={index}>
                    {dataCerti['release_dates'].map((dataC, index, row) => (
                      index + 1 === row.length ? dataC.certification ? dataC.certification : null : null
                    ))}
                  </div> : null
              )) : null}</div>
              <div className='text-secondary'>
                {data['genres'] ? data['genres'].map((dataGenre, index) => (
                  <span className="genre" key={index}>{dataGenre.name}</span>
                )) : null}
              </div>
              <div className='text-secondary'>{`${data.release_date}`.substring(0, 4)} &#8212; {count_runtime(data.runtime)}</div>
              <div>{data.vote_average ? avg(data.vote_average) : null} <span className="stars" style={{ '--rating': data.vote_average ? avg(data.vote_average) : null }}></span></div>
              <div className="mt-4 text-bold">{data.tagline ? '"' + data.tagline + '"' : null}</div>
              <div className='text-secondary'>
                {data.overview ?
                  <ReadMoreReact text={data.overview}
                    ideal={idealLength}
                    max={maxLength}
                    readMoreText="Read more" />
                  : null}
              </div>
              <div className='mt-4'>
                <a href={'https://pw.unblockit.tv/?s=' + data.imdb_id + '&t=y&m=m&w=q'} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>Watch online</a>
                <Video id={id} name='movie' />
              </div>
              <CastList id={id} name='movie' />
              <Review id={id} name='movie' />
            </div>
          </div>
          <RowList name='recommendationMovie' id={id} />
          <RowList name='similarMovie' id={id} />
          <div className='hide-md mt-5'>
            <h2 className='fw-bold'>More Info</h2>
            <div><ExternalId id={id} name='movie' /></div>
            <div>{data.status ? <><div className="text-bold">Status</div><div className='text-secondary'>{data.status}</div></> : null}</div>
            <div>{data.original_language ? <><div className="mt-4 text-bold">Language</div><div className='text-secondary'>{data.original_language}</div></> : null}</div>
            <div>{data['revenue']?.length > 0 ? <><div className="mt-4 text-bold">Revenue</div><div className='text-secondary'>{currency(data.revenue)}</div></> : null}</div>
            <div>{data['budget']?.length > 0 ? <><div className="mt-4 text-bold">Budget</div><div className='text-secondary'>{currency(data.budget)}</div></> : null}</div>
            <Keyword id={id} name='movie' />
          </div>
        </div>
      </>
        : 
        <div className='vh-100 d-flex justify-content-center align-items-center text-center'>
          <div>
            <div className='h1'><FiSlash /></div>
            <div className='mt-3 mb-5'>No movie found ...</div>
            <div className='aLink' onClick={history.goBack}>&#8592; Go Back</div>
          </div>
        </div>
      }
    </>
  )
}

export default Movie
