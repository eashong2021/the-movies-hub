import React, { useState, useEffect } from 'react'
import { API_PERSON, API_KEY, POSTER_PATH, WIDTH_ORIGINAL } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox"

const Images = (props) => {

  const { id } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      axios.get(API_PERSON + id + '/images?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data.profiles)
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [id]);

  const options = {
    settings: {
      autoplaySpeed: 1500,
      transitionSpeed: 900,
      slideAnimationType: "slide"
    },
    buttons: {
      iconColor: "rgba(256, 256, 256, 1)",
      showDownloadButton: false,
      showThumbnailsButton: false,
      showAutoplayButton: false
    },
    caption: {
      showCaption: false
    },
    thumbnails: {
      showThumbnails: false
    }
  };

  return (
    <>
      {data.length > 0 ?
        <div>
          <h1 className="mt-5 fw-bold">GALLERY</h1>
          <div>
            <SimpleReactLightbox>
              <SRLWrapper options={options}>
                <div className='row'>
                  {data.map((dataRow, index) => (
                    <div key={index} className='col-6 col-sm-4 col-md-3 mb-4'>
                      <a href={POSTER_PATH + WIDTH_ORIGINAL + dataRow.file_path}>
                        <LazyLoadImage key={index} className="img-fluid" src={POSTER_PATH + WIDTH_ORIGINAL + dataRow.file_path} effect="opacity" alt={dataRow.file_path} onError={(e) => { e.target.onerror = null; e.target.src = "https://fakeimg.pl/200x300?text=MoviesHub&font=bebas&font_size=30" }} />
                      </a>
                    </div>
                  ))}
                </div>
              </SRLWrapper>
            </SimpleReactLightbox>
          </div>
        </div> : null}
    </>
  )
}

export default Images