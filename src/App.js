import  {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';

import HomePage from './pages/HomePage';
import MovieDetail from './pages/MovieDetail';
import About from './pages/AboutPage';
/* import ArticlesList from './pages/ArticlesListPage'; */
import NavBar from './components/NavBar';
import Error404 from './pages/Error404';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Cinema Frontend</h1>
        <NavBar />
      </header>
      <main className="App">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/article/:name' element={<MovieDetail />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;
