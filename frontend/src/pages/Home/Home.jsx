import logo from './logo.svg';
import pellicule from './pellicule.svg';
import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPopularMovies = () => {
  const [PopularMovies, setPopularMovies] = useState([]);
  const [PopularMoviesLoadingError, setPopularMoviesLoadingError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a`;

    axios
      .get(apiUrl)
      .then((response) => {
        setPopularMovies(response.data.results); // Utilisez response.data.results pour obtenir la liste des films populaires
      })
      .catch((error) => {
        setPopularMoviesLoadingError('An error occurred while fetching popular movies.');
        console.error(error);
      });
  }, []);

  return { PopularMovies, PopularMoviesLoadingError };
};


function Home() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const { PopularMovies, PopularMoviesLoadingError } = useFetchPopularMovies();

  const handleChange = (event) => {
    setMovieName(event.target.value);
  };

  const addMovie = () => {
    if (movieName.trim() !== '') {
      setMovies([...movies, movieName]);
      setMovieName('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Mes films préférés</h1>
        <p>Première place : </p>
        <a
          className="App-link"
          href="https://fr.wikipedia.org/wiki/Princess_Bride_(film)"
          target="_blank"
          rel="noopener noreferrer"
        >
          Princess Bride
        </a>
        <p>Deuxième place : </p>
        <a
          className="App-link"
          href="https://fr.wikipedia.org/wiki/Le_Ch%C3%A2teau_ambulant"
          target="_blank"
          rel="noopener noreferrer"
        >
          Le château ambulant
        </a>
        <p>Troisième place : </p>
        <a
          className="App-link"
          href="https://fr.wikipedia.org/wiki/Midsommar_(film)"
          target="_blank"
          rel="noopener noreferrer"
        >
          Midsommar
        </a>
      </header>
      <img src={pellicule} className="pellicule" alt="pellicule" />
      <header className="App-header">
        <h1>Autres films : </h1>
        <input
          type="text"
          id="inputfilm"
          name="NouveauFilm"
          value={movieName}
          onChange={handleChange}
        />
        <button onClick={addMovie}>Ajouter</button>
        <p>Ajouter un titre : {movieName}</p>
        <ul>
          {PopularMovies.map(Movie => (<li>{Movie.original_title}</li>))}
        </ul>
      </header>
      <img src={pellicule} className="pellicule" alt="pellicule" />
    </div>
  );
}

export default Home;