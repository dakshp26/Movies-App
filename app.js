const APIKEY = "<enter your tmdb api key here>"
const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key="+APIKEY+"&language=en-US&sort_by=popularity.desc&page=1";
const IMGPATH = 'https://image.tmdb.org/t/p/w500/';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key="+APIKEY+"&language=en-US&sort_by=popularity.desc&query=";
const main = document.querySelector('.main');//check this
const form = document.getElementById('form');
const search = document.getElementById('search');

//Initially get popular movies
getMovies(APIURL);

async function getMovies(APIURL){
    const resp = await fetch(APIURL);
    const respData = await resp.json();
    

    showMovies(respData.results)
}

function showMovies(movies){
    main.innerHTML = '';
    movies.forEach(movie => {
        const {poster_path, title, vote_average} = movie;
        var {overview} = movie
        if(poster_path === null){
            return movies
           
        }
        if(overview === ""){
            overview = "Overview not yet available. Sorry for the inconvinience!";
        }
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        
            <img src = "${IMGPATH+poster_path}" alt = "${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class ="${getClassByRate(vote_average)}" >${vote_average}</span>
            </div>
            <div class = "overview">
                <h4>Overview:</h4>
                ${overview}
            </div>
    
        `;
        main.appendChild(movieEl) //check this
        
    });
}

function getClassByRate(vote){
    if (vote >= 8){
        return 'green';
    } 
    else if(vote >=5){
        return 'orange';
    } 
    else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value;

    if(searchTerm){
        
        getMovies(SEARCHAPI + searchTerm)
        
        search.value = '';

    }

});

