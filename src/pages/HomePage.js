import React, { useEffect } from 'react';
import { bringMovies, urlGenerator } from '../utls/fetchData';
import { SearchContext } from '../context/SearchContext';

import { LoaderAnimation } from '../components/LoaderAnimation';
import SearchBar from '../components/SearchBar';
import MovieArticle from '../components/MovieArticle';

const HomePage = () => {

  const [ movies, setMovies ] = React.useState([])
  const [ moviesToShow, setMoviesToShow ] = React.useState([])
  const { searchText, setSearchText } = React.useContext(SearchContext)

  useEffect(()=> {
    if (searchText === '') {
      bringMovies(
        urlGenerator('/discover/movie', '&sort_by=popularity.desc&language=es'),
        )
        .then(data => {
          setMoviesToShow(data.results)
          return setMovies(data)
        })
    }
      
  }, [])

  console.log('MOVIES TO SHOW E HOME',moviesToShow)

  return (
  <>
    <SearchBar 
    setMovies={setMovies}
    setMoviesToShow={setMoviesToShow} 
    movies={movies} 
    moviesToShow={moviesToShow} 
    /> 

  <section className='movies-list'>
    {
      
      moviesToShow.none ?
        <article className='movie-not-found'>
          <h3 className='movie-not-found__title'>{moviesToShow.none}</h3>
          <p htmlFor='#search-input' className='movie-not-found__text'>Prueba con otro título o puntuación</p>
        </article>
      : moviesToShow ?
      moviesToShow.map((movie, i) => {
        return (
          <MovieArticle movie={movie} key={i} />
        )
      }) : <LoaderAnimation />
    }

  </section>
  </>
  )
}

export default HomePage