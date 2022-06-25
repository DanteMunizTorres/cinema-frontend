import React, {useEffect, useState} from 'react';
import  {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { urlGenerator, bringMovies, imgUrlGenerator } from './utls/fetchData';
import HomePage from './pages/HomePage';
import MovieDetail from './pages/MovieDetail';
import About from './pages/AboutPage';
import NavBar from './components/NavBar';
import Error404 from './pages/Error404';

function App() {

  const [imgUrlArray, setimgUrlArray] = React.useState([])

  const changeImg = (array) => {
    let index = 0
    return array[index]
  }

  let imgWidth = 300
  let intFrameWidth = window.innerWidth;
  function resizeListener() {
    return intFrameWidth = window.innerWidth;
  }
  window.addEventListener("resize", resizeListener);

  if ( intFrameWidth > 340 ) {
    imgWidth = 780
  } else if ( intFrameWidth > 780 ) {
    imgWidth = 1280
  }

  const moviesImgs = async (image_width) => {
    const movies = await bringMovies(
    urlGenerator('/trending/movie/week', '&sort_by=popularity.desc&language=es')
  )
    const moviesImg_path = await movies.results.map(movie => movie.backdrop_path)
    const moviesImgUrl = await moviesImg_path.map(img_path => {
      return imgUrlGenerator(image_width, img_path)
    })
    setimgUrlArray(moviesImgUrl)
  }
  useEffect(()=> {
    moviesImgs(imgWidth)
  }, [])
  
  return (
    <BrowserRouter>
      <header className='header' style={{backgroundImage: `url(${changeImg(imgUrlArray)})` }}>
        <h1 className='header__title'>Cinema Frontend</h1>
        <NavBar />
      </header>
      <main className="App">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/article/:id' element={<MovieDetail />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </main>
      <footer className='footer'>
        <NavBar />
        <nav>
          <ul className='header__nav-ul'>
            <li className='header__nav-li first-link-nav'>
              <Link to='/about' className='link-header-nav'>Prensa</Link>
            </li>
            <li className='header__nav-li'>
              <Link to='/about' className='link-header-nav'>Novedades</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </BrowserRouter>
  );
}

export default App;
