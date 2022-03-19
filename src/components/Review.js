
import React, { useState, useEffect } from 'react';
import { API_MOVIE, API_KEY, API_TV, getDate, avg } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReadMoreReact from 'read-more-react';
import axios from 'axios';
import frame5 from '../resources/Frame5.png'

const Review = (props) => {

  const { id, name } = props;
  const [data, setData] = useState([]);

  const idealLength = 200;

  let api;
  switch (name) {
    case 'movie':
      api = API_MOVIE;
      break;

    case 'tv':
      api = API_TV;
      break;

    default:
      break;
  }

  useEffect(() => {
    const getData = async () => {
      axios.get(api + id + '/reviews?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data.results)
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [api, id]);

  return (
    <div>
      {data.length > 0 ?
        <>
          <h2 className="mt-5">REVIEWS</h2>
          <div>
            {data.map((dataRow, index) => (
              <div key={index}>
                <div className="row mb-5">
                  <div className="col-lg-1 col-md-2 col-12">
                    <LazyLoadImage key={index} className="rounded-circle" src={dataRow['author_details']['avatar_path'] ? dataRow['author_details']['avatar_path'].substring(1) : null} effect="opacity" alt={dataRow.author} onError={(e) => { e.target.onerror = null; e.target.src = frame5 }} />
                  </div>
                  <div className="col-lg-11 col-md-10 col-12 mt-3">
                    <h5 className="text-bold">A review by {dataRow.author}</h5>
                    <div className="text-secondary">{getDate(dataRow.created_at)}</div>
                    <div>{dataRow['author_details']['rating'] ? avg(dataRow['author_details']['rating']) : null} <span className="stars" style={{'--rating': dataRow['author_details']['rating'] ? avg(dataRow['author_details']['rating']) : null}}></span></div>
                    <div className="mt-3 text-preline text-muted">
                      <ReadMoreReact text={dataRow.content}
                        ideal={idealLength}
                        readMoreText="Read more" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </> : null}
    </div>
  )
}

export default Review
