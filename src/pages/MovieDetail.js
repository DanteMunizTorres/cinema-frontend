
import React, {useEffect} from 'react';


import { useParams } from 'react-router-dom';
import { urlGenerator, bringMovies, imgUrlGenerator } from '../utls/fetchData';

import { LoaderAnimation } from '../components/LoaderAnimation';

const MovieDetail = () => {
  const [movie, setMovie] = React.useState({})
  const {id} = useParams()

  let imgWidth = 780
  let intFrameWidth = window.innerWidth;
  function resizeListener() {
    return intFrameWidth = window.innerWidth;
  }
  window.addEventListener("resize", resizeListener);

  if ( intFrameWidth > 780) {
    imgWidth = 1280
  }
  
  console.log('intFrameWidth ',intFrameWidth);
  useEffect(()=> {
    bringMovies(
      urlGenerator(`/movie/${id}`, '&language=es')
    ).then(data => setMovie(data))
  }, [])

  const imgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), #1D1F22), url(${imgUrlGenerator(imgWidth, movie.backdrop_path)})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  if (movie) {
    return (
      
      <section className='movie-detail'>

          <h3 className='movie-detail__title'>{movie.title}</h3>
          <div className='movie-detail__info-container' style={imgStyle}>
            {/* <img src={} alt='movie poster' /> */}
            <p className='movie-detail__info'>{movie.overview}</p>
          </div>

      </section>
    )
  } else {
    return <LoaderAnimation />
  }
}

export default MovieDetail