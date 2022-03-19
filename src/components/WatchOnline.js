import React, { useState, useEffect } from 'react'
import { API_MOVIE, API_TV, API_KEY } from '../constant';
import axios from 'axios';

const WatchOnline = (props) => {

  const { id, name } = props;
  const [data, setData] = useState([]);

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
      axios.get(api + id + '/external_ids?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [api, id]);

  return (
    <>
      {data.imdb_id ? <a className='mt-4 mb-4 btn btn-primary' href={'https://pw.unblockit.tv/?s=' + data.imdb_id + '&t=y&m=m&w=q'} target='_blank' rel='noopener noreferrer'>Watch online</a>  : null}              
    </>
  )
}

export default WatchOnline
