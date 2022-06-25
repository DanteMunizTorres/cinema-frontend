import React, { useEffect } from "react";

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchContext } from "../context/SearchContext";

import { bringMovies, urlGenerator } from "../utls/fetchData";

const SearchBar = ({ setMovies, setMoviesToShow, movies, moviesToShow }) => {
  /* const [searchText, setSearchText] = React.useState(""); */
  const [rateValue, setRateValue] = React.useState("");
  const { searchText, setSearchText } = React.useContext(SearchContext)

  const noMovies = {none: 'No encontramos una pelicula con ese título'}

  async function search(event = undefined) {
    if(event) {
      event.preventDefault()
    }
    const stars = document.querySelectorAll('.rate-input')
    stars.forEach(star => star.checked = false)
    console.log("submit search");
    setRateValue('')
    setMovies([])
    setMoviesToShow(noMovies)
    if (searchText === '') {
      const moviesDiscovered = await bringMovies(
        urlGenerator("/discover/movie", "&sort_by=popularity.desc&language=es"),
      )
      if (moviesDiscovered.results.length < 1) {
        setMoviesToShow(noMovies)
        return setMovies(noMovies)
      }
      setMoviesToShow(moviesDiscovered.results)
      return setMovies(moviesDiscovered)
    } else {
      const searchedMovies = await bringMovies(
       urlGenerator("/search/movie", `&query=${searchText}&language=es`),
      )
      if (searchedMovies.results.length < 1) {

        return setMoviesToShow(noMovies)
      }

      setMoviesToShow(searchedMovies.results)
      return setMovies(searchedMovies)
    }

  }

  const filter = () => {
    let moviesFiltered = {none: 'No encontramos una pelicula con esa puntuación'}
    if(movies.results){
      moviesFiltered = movies.results
        .filter(movie => {
          return (movie.vote_average <= rateValue && movie.vote_average > (rateValue - 2))
        })
        .sort((movieA, movieB) => movieB.vote_average - movieA.vote_average);
    }
    console.log("moviesfiltered------------", moviesFiltered);
    if(moviesFiltered && moviesFiltered.length === 0) {
      return setMoviesToShow({none: 'No encontramos una pelicula con esa puntuación'})
    }
    return setMoviesToShow(moviesFiltered);
  };

  useEffect(() => {
    console.log('use effect rateVAlue**********************************', rateValue);
    if (rateValue) {
      filter();
    }
  }, [rateValue]);

  useEffect(() => {
    console.log('SEARCH*******************', searchText);
    search()
  }, []);


  function changeRateValue(event) {
    if (rateValue === parseInt(event.target.value, 10)) {
      event.target.checked = false
      setRateValue('')
      if (movies.results) {
        return setMoviesToShow(movies.results)
      } else {
        return setMoviesToShow(noMovies)
      }
    }
    setRateValue(parseInt(event.target.value, 10));
  }

  return (
    <section className="search-filter-container">
      <form onSubmit={search} className='search-bar' >
        <div className="search-bar__input-container">
          <label className="search-bar__input-grid">
            <h3 className="search-bar__subtitle" >¿Qué quieres mirar hoy?</h3>
            
            <input
              type={"text"}
              placeholder={"Buscar..."}
              onChange={(e) => setSearchText(e.target.value)}
              className='search-bar__input'
              id="search-input"
              value={searchText}
            />
            <button className="search-bar__button"><AiOutlineSearch /></button>
          </label>

        </div>
      </form>

      <form className="clasification-filter">
        <h3 className="filter-title">Filtrar por puntaje</h3>
        <div className="stars-container">
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-1"
            value={2}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-1" className="rate-label">{rateValue > 0? <AiFillStar />: <AiOutlineStar />}</label>
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-2"
            value={4}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-2" className="rate-label">{rateValue > 2? <AiFillStar />: <AiOutlineStar />}</label>
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-3"
            value={6}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-3" className="rate-label">{rateValue > 4? <AiFillStar />: <AiOutlineStar />}</label>
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-4"
            value={8}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-4" className="rate-label">{rateValue > 6? <AiFillStar />: <AiOutlineStar />}</label>
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-5"
            value={10}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-5" className="rate-label">{rateValue > 8? <AiFillStar />: <AiOutlineStar />}</label>
        </div>
      </form>
    </section>
  );
};
export default SearchBar;
