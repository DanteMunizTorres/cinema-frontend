import React, { useEffect } from 'react';
import { bringMovies, urlGenerator } from '../utls/fetchData';

import { LoaderAnimation } from '../components/LoaderAnimation';
import SearchBar from '../components/SearchBar';
import MovieArticle from '../components/MovieArticle';

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


    <SearchBar 
    setMovies={setMovies}
    setMoviesToShow={setMoviesToShow} 
    movies={movies} 
    moviesToShow={moviesToShow} 
    /> 
  
  {
    moviesToShow ?
    moviesToShow.map((movie, i) => {
      return (
        <MovieArticle movie={movie} key={i} />
      )
    }) : <LoaderAnimation />
  }
  
  </>
  )
}

export default HomePage