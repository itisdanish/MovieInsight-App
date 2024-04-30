const API_KEY = '3ef309e0';
const BASE_URL = 'http://www.omdbapi.com/';
const popularDisplay = document.getElementById('popular')

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const searchText = document.getElementById('searchText');
  
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getMovies(searchText.value);
  });
});
http://www.omdbapi.com/?i=tt3896198&apikey=3ef309e0
function popularMovies(){
    axios.get(`http://www.omdbapi.com/?s=home&apikey=3ef309e0`)
    .then((response) => {
      const movies = response.data.Search;
      let output = '';
      movies.forEach((movie) => {
        output += `
        
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>              
          </div>
        `;
      });
      popularDisplay.innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
}

// popularMovies()

function getMovies(searchText) {
  axios.get(`${BASE_URL}?s=${searchText}&apikey=${API_KEY}`)
    .then((response) => {
      const movies = response.data.Search;
      let output = '';
      movies.forEach((movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>              
          </div>
        `;
      });
      document.getElementById('movies').innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  const movieId = sessionStorage.getItem('movieId');
  axios.get(`${BASE_URL}?i=${movieId}&apikey=${API_KEY}`)
    .then((response) => {
      const movie = response.data;
      const output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;
      document.getElementById('movie').innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
}
