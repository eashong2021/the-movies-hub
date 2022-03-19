import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { API_TV, API_KEY, POSTER_PATH, WIDTH_ORIGINAL, WIDTH_300, avg, WIDTH_500 } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReadMoreReact from 'read-more-react';
import axios from 'axios';
import frame1 from '../resources/Frame1.png'
import frame2 from '../resources/Frame2.png'
import frame3 from '../resources/Frame3.png'

const Episodes = () => {
  const id = useParams().id;
  const season = useParams().number;
  const [data, setData] = useState([]);

  const idealLength = 200;

  useEffect(() => {
    const getData = async () => {
      axios.get(API_TV + id + '/season/' + season + '?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [id, season]);

  return (
    <div>
      <LazyLoadImage className="img-backdrop" src={POSTER_PATH + WIDTH_ORIGINAL + data.poster_path} effect="opacity" alt={data.name} onError={(e) => {e.target.onerror = null; e.target.src = frame2}} />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2">
            <LazyLoadImage className="img-poster rounded" src={POSTER_PATH + WIDTH_300 + data.poster_path} effect="opacity" alt={data.name} onError={(e) => {e.target.onerror = null; e.target.src = frame1}} />
          </div>
          <div className="col-12 col-md-10 mt-3">
            <div className="bebasFont text-break">{data.name}</div>
            <div className="text-muted">{`${data.air_date}`.substring(0, 4)}</div>
            <div className="mt-3">{data.overview}</div>
            <div className="mt-5">
              {data.episodes ? Object.keys(data.episodes).map((dataRow, index) => (
                <div className="mt-5 card episodeWidth" key={index}>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <LazyLoadImage className="episodeImage rounded img-fluid" src={POSTER_PATH + WIDTH_500 + data['episodes'][dataRow].still_path} effect="opacity" alt={data['episodes'][dataRow].name} onError={(e) => {e.target.onerror = null; e.target.src = frame3}} />
                    </div>
                    <div className="card-body col-12 col-lg-6">
                      <div className="card-text">
                        <div className="text-muted">Episode {data['episodes'][dataRow].episode_number} &#8212; {(`${data['episodes'][dataRow].air_date}`).substring(0, 4) !== 'unde' ? (`${data['episodes'][dataRow].air_date}`).substring(0, 4) : (`${data['episodes'][dataRow].first_air_date}}`).substring(0, 4)}</div>
                        <div className="text-bold">{data['episodes'][dataRow].name ? data['episodes'][dataRow].name : data['episodes'][dataRow].episode_number}</div>
                        <div>{data['episodes'][dataRow].vote_average ? avg(data['episodes'][dataRow].vote_average) : 'Unrated'} / 10 <span className="stars" style={{'--rating': data['episodes'][dataRow].vote_average ? avg(data['episodes'][dataRow].vote_average) : 'Unrated'}}></span></div>
                        <div className="mt-3 text-muted">
                          <ReadMoreReact text={data['episodes'][dataRow].overview}
                          ideal={idealLength}
                          readMoreText="Read more" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Episodes
