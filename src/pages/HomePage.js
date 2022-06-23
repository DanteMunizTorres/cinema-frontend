import React, { useEffect } from 'react';
import { bringMovies, urlGenerator } from '../utls/fetchData';

import { LoaderAnimation } from '../components/LoaderAnimation';
import SearchBar from '../components/SearchBar';

const HomePage = () => {

  const [ movies, setMovies ] = React.useState([])
  const [ moviesToShow, setMoviesToShow ] = React.useState([])

  useEffect(()=> {
    bringMovies(
      urlGenerator('/discover/movie', '&sort_by=popularity.desc'),
      )
      .then(data => {
        setMoviesToShow(data.results)
        return setMovies(data)
      })
      
  }, [])


  
  console.log('MOVIES TO SHOW-------------------------------------',moviesToShow);

  return (
  <>
  <h1>Home Page</h1>

  {
    movies ?
    <SearchBar 
    setMovies={setMovies}
    setMoviesToShow={setMoviesToShow} 
    movies={movies} 
    moviesToShow={moviesToShow} 
    /> : <LoaderAnimation />
  }
  
  {
    moviesToShow ?
    moviesToShow.map((movie, i) => {
      return (
        <article key={i}>
          <h3>{movie.title}</h3>
          <p>{movie.vote_average}</p>
        </article>
      )
    }) : <LoaderAnimation />
  }
  
  </>
  )
}

export default HomePage