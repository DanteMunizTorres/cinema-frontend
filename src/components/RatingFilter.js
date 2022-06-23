import React, { useEffect } from 'react';
import { bringMovies, urlGenerator } from '../utls/fetchData';

function RatingFilter ({setMoviesToShow, movies}) {

  console.log('filter movie array', movies);

  const [ rateValue, setRateValue ] = React.useState('')

  const filter = () => {
    const moviesFiltered = movies.filter(movie => movie.vote_average >= rateValue)
      .sort((movieA, movieB) => movieB.vote_average - movieA.vote_average)

    console.log('moviesfiltered------------', moviesFiltered);
    return setMoviesToShow( moviesFiltered)
  }

  useEffect(()=> {
    if(rateValue){
      filter()

    }
  }, [rateValue])

/*   function search(value){
    
    console.log('rating clasification done');
    bringMovies(
    urlGenerator('/discover/movie', `&sort_by=vote_average.desc&vote_average.gte=${value - 2}&vote_average.lte=${value}`),
    setMovies
    );
  }

  useEffect(()=> {
    search(rateValue)
  }, [rateValue]) */

  function changeRateValue(event){
    setRateValue(event.target.value)
  }

  return (
    <form className='clasification-filter'>
      <h3>Filtrar por puntaje</h3>
      <div className='stars-container'>
        <input type='radio' name='rate' id='rate-1' value={2} onChange={changeRateValue} />
        <label htmlFor='rate-1' className='rate-label'></label>
        <input type='radio' name='rate' id='rate-2' value={4} onChange={changeRateValue} />
        <label htmlFor='rate-2' className='rate-label'></label>
        <input type='radio' name='rate' id='rate-3' value={6} onChange={changeRateValue} />
        <label htmlFor='rate-3' className='rate-label'></label>
        <input type='radio' name='rate' id='rate-4' value={8} onChange={changeRateValue} />
        <label htmlFor='rate-4' className='rate-label'></label>
        <input type='radio' name='rate' id='rate-5' value={10} onChange={changeRateValue} />
        <label htmlFor='rate-5' className='rate-label'></label>
      </div>
    
    </form>
  )
}

export default RatingFilter