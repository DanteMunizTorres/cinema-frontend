import React, { useEffect } from "react";

import { bringMovies, urlGenerator } from "../utls/fetchData";

const SearchBar = ({ setMovies, setMoviesToShow, movies, moviesToShow }) => {
  const [searchText, setSearchText] = React.useState("");
  const [rateValue, setRateValue] = React.useState("");

  async function search(event) {
    event.preventDefault();
    const stars = document.querySelectorAll('.rate-input')
    stars.forEach(star => star.checked = false)
    console.log("submit search");
    if (!searchText) {
      const moviesDiscovered = await bringMovies(
        urlGenerator("/discover/movie", "&sort_by=popularity.desc"),
      )
      return setMovies(moviesDiscovered)
    } else {
      const searchedMovies = await bringMovies(
       urlGenerator("/search/movie", `&query=${searchText}`),
      )
      setMoviesToShow(searchedMovies.results)
      return setMovies(searchedMovies)
    }

  }
  
  const filter = () => {
    console.log('RATE VALUEEEEEEEEEEEEEE',rateValue, rateValue - 2);
    const moviesFiltered = movies.results
      .filter(movie => {
        return (movie.vote_average <= rateValue && movie.vote_average > (rateValue - 2))
      })
      .sort((movieA, movieB) => movieB.vote_average - movieA.vote_average);

    console.log("moviesfiltered------------", moviesFiltered);
    return setMoviesToShow(moviesFiltered);
  };

  useEffect(() => {
    if (rateValue) {
      filter();
    }
  }, [rateValue]);


  function changeRateValue(event) {
    if (rateValue === parseInt(event.target.value, 10)) {
      event.target.checked = false
      setRateValue('')
      return setMoviesToShow(movies.results)
    }
    setRateValue(parseInt(event.target.value, 10));
  }

  return (
    <>
      <form onSubmit={search}>
        <label>
          <p>¿Qué quieres mirar hoy?</p>
          <input
            type={"text"}
            placeholder={"Buscar..."}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
        <button>Search Icon</button>
      </form>

      <form className="clasification-filter">
        <h3>Filtrar por puntaje</h3>
        <div className="stars-container">
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-1"
            value={2}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-1" className="rate-label"></label>
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-2"
            value={4}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-2" className="rate-label"></label>
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-3"
            value={6}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-3" className="rate-label"></label>
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-4"
            value={8}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-4" className="rate-label"></label>
          <input
            className="rate-input"
            type="radio"
            name="rate"
            id="rate-5"
            value={10}
            onClick={changeRateValue}
          />
          <label htmlFor="rate-5" className="rate-label"></label>
        </div>
      </form>
    </>
  );
};
export default SearchBar;
