import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API_KEY, POSTER_PATH, WIDTH_500, avg, API_KEYWORD } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import frame1 from '../resources/Frame1.png'
import { FiSlash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const People = () => {
  const keyword_id = useParams().id;
  let history = useHistory();
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    const getData = async () => {
      axios.get(API_KEYWORD + keyword_id + '/movies?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data.results);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    const getKeyword = async () => {
      axios.get(API_KEYWORD + keyword_id + '?api_key=' + API_KEY)
        .then((data) => {
          setKeyword(data.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
    getKeyword();
  }, [keyword_id]);

  return (
    <div className="container">
      {data.length > 0 ?
        <div>
          <div className='mt-5 aLink' onClick={history.goBack}>&#8592; Back</div>
          <h2 className="mt-4 fw-bold">Movies with "{keyword.name}"</h2>
          <div className="row">
            {data.map((dataRow, index) => (
              <Link key={index} className="aLink col-6 col-sm-4 col-md-3 col-lg-2 mb-5" to={'/movieshub/movie/' + dataRow.id }>
                <div className="card" key={index}>
                  <div className="card-img-top rounded">
                    <LazyLoadImage className="img-fluid" src={POSTER_PATH + WIDTH_500 + dataRow.poster_path} effect="opacity" alt={dataRow.title ? dataRow.title : dataRow.name} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
                  </div>
                  <div className="card-body">
                    <div className="card-text">
                      <div className="text-muted">{dataRow.vote_average ? avg(dataRow.vote_average) : 'Unrated'} &#8212; {dataRow.release_date || dataRow.first_air_date ? (`${dataRow.release_date}`).substring(0, 4) !== 'unde' ? (`${dataRow.release_date}`).substring(0, 4) : (`${dataRow.first_air_date}}`).substring(0, 4) : null}</div>
                      <div>{dataRow.title ? dataRow.title : dataRow.name}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div> : 
        <div className='mt-5 mb-5 text-center'>
          <div className='h1'><FiSlash /></div>
          <div className='mt-3 mb-5'>No movies found with keyword "{keyword.name}"...</div>
          <div className='aLink' onClick={history.goBack}>&#8592; Go Back</div>
        </div>
        }
    </div>
  )
}

export default People
