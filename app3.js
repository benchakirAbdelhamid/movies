const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');

const url_img  = `https://api.themoviedb.org/3`+'/discover/movie?sort_by=popularity.desc&'+'api_key=ab6ef3217e7b0d01c843f808f85fbace';

getMovies(url_img);
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            showMovies(data.results);
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview,release_date,original_language} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="https://image.tmdb.org/t/p/w500${poster_path} " alt="${title}">
            <div>
            
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span >${vote_average}</span> 
                </div>
                <div class="movie-info-min">
                <span class="span2" >${original_language}</span>
                    <span class="span1" >${release_date}</span>
                </div>

            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl);
    })
}



form.addEventListener('submit', (e) => {
    
    const searchTerm = search.value;
    const mySearch = 'https://api.themoviedb.org/3' + '/search/movie?'+ 'api_key=1cf50e6248dc270629e802686245c2c8' +'&query='+searchTerm
    e.preventDefault();
    if(searchTerm) {
        getMovies(mySearch)
    }else{
        getMovies(url_img);
    }
    search.value = ''
})

