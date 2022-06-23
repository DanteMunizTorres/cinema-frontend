
import React from 'react';

import { imgUrlGenerator } from '../utls/fetchData';

const MovieDetail = ({movie}) => {



  return (
    <article className='movie-article'>
      <div className='movie-article__hover-view'>
        <h3>{movie.title}</h3>
        <p>{movie.vote_average}</p>
      </div> 
      <div className='img-container'>
        <img src={imgUrlGenerator(300, movie.poster_path)} alt='movie poster' />
      </div>

    </article>
)}

export default MovieDetail