
import React from 'react';

import { imgUrlGenerator } from '../utls/fetchData';

import { Link } from 'react-router-dom';

const MovieArticle = ({movie}) => {



  return (
    <Link to={`/article/${movie.id}`} className='link-movie-article'>
      <article className='movie-article'>
        <div className='movie-article__hover-view'>
          <h3 className='movie-article__title'>{movie.title}</h3>
        </div> 
        <div className='img-container'>
          <img src={imgUrlGenerator(300, movie.poster_path)} alt='movie poster' />
        </div>

      </article>
    </Link>
)}

export default MovieArticle