import React, { useRef } from 'react'
import { FiArrowUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const ref = useRef(null)

  let lastScroll = 0
  window.onscroll = () => {
    const st = window.scrollY
    if(st > lastScroll) {
      ref.current.classList.add("hide")
      ref.current.classList.remove("show")
    }
    else {
      if(window.pageYOffset > 400) {
        ref.current.classList.add("show")
        ref.current.classList.remove("hide")
      }
      else {
        ref.current.classList.add("hide")
        ref.current.classList.remove("show")
      }
    }
    lastScroll = st
  }

  return (
    <div className="bg-grey-dark text-light pt-3 mt-5">
      <div className="container">
        <div className="d-flex flex-row justify-content-center footerLinks">
          <Link className="link mx-3" to='/movieshub/movie'>Movie</Link>
          <Link className="link mx-3" to='/movieshub/tv'>TV Shows</Link>
          <Link className="link mx-3" to='/movieshub/people'>People</Link>
        </div>
      </div>
      <div className="mt-4 text-center">
        {new Date().getFullYear()} &copy; Ebenezer Ashong.
      </div>
      <div className="toTop btn px-3 btn-primary" ref={ref} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}><FiArrowUp /></div>
    </div>
  )
}

export default Footer;
