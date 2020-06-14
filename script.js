const apiKey = "&apikey=cbf7c5ee";
const baseURL = "https://www.omdbapi.com/";
const search = '?s='
const title = "?t=";
const id = "?i=";

const formEl = document.getElementById('form');
const submitBtn = document.getElementById("submit-btn");
const userInput = document.getElementById("search-input");
const resultUI = document.querySelector(".movie-results-container")


let resultArr = [];
let movieID;

// EVENT LISTENER ON SUBMIT

formEl.addEventListener('submit', e => {
    e.preventDefault();

    generateSearch();
})

//Event listener on head click
document.getElementById('head').addEventListener('click', e => {
    location.reload();
})


// FUNCTIONS
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearUI() {
    resultUI.innerHTML = ''
}

function onTitleClicked(id) {
    movieID = id
    displayMovieResults()
}

async function generateSearch() {

    resultArr = []
    try {
        const result = await fetch(`${baseURL}${search}${userInput.value}${apiKey}`)
        const data = await result.json();

        //push data in array
        data.Search.forEach(element => {
            resultArr.push(element)
        })
        // console.log(resultArr)

        displayResults()
    } catch (error) {
        alert("Can't find the movie you searched for :(")
    }

}

function displayResults() {
    clearUI()

    resultArr.forEach(movie => {
        const markup = `
       
        <div class="result2 animate__animated animate__fadeIn">
            <a href="#main-result1" id="more-details" onclick="onTitleClicked('${movie.imdbID}')"><img src="${movie.Poster}" alt="Movie Poster"></a>
                <a href="#main-result1" id="more-details" onclick="onTitleClicked('${movie.imdbID}')"><span id="movie-title">${movie.Title}</span></a>
                <span id="movie-type">${capitalizeFirstLetter(movie.Type)}</span>
                <span>${movie.Year}</span>        
            </div>
            
    `
        resultUI.insertAdjacentHTML('afterbegin', markup)

    })
    //moviePage()
}

async function displayMovieResults() {
    clearUI()
    const result = await fetch(`${baseURL}${id}${movieID}${apiKey}`)
    const data = await result.json()
    console.log(data)

       const markup = `
         <div id="main-result1" class="movie-result1 animate__animated animate__fadeIn">
        <div class="main-result">
        <img src="${data.Poster}" alt="Poster" id="main-poster">
        <h2 id="movie-main-title">${data.Title}</h2>
        </div>

        <div class="movie-details">

                <span class="plot">${data.Plot}</span>
                <table id="movie-details-table">
                    <tr><td>Year:</td><td>${data.Year}</td></tr>
                    <tr><td>Rated::</td><td>${data.Rated}</td></tr>
                    <tr><td>Release Date:</td><td>${data.Released}</td></tr>
                    <tr><td>Runtime:</td><td>${data.Runtime}</td></tr>
                    <tr><td>Genre:</td><td>${data.Genre}</td></tr>
                    <tr><td>Director:</td><td>${data.Director}</td></tr>
                    <tr><td>Writer:</td><td>${data.Writer}</td></tr>
                    <tr><td>Actors:</td><td>${data.Actors}</td></tr>
                    <tr><td>Language:</td><td>${data.Language}</td></tr>
                    <tr><td>Country:</td><td>${data.Country}</td></tr>
                    <tr><td>Awards:</td><td>${data.Awards}</td></tr>
                    <tr><td>IMDB Score:</td><td>${data.imdbRating}</td></tr>
                    <tr><td>Metacritic Score:</td><td>${data.Metascore}</td></tr>
                </table>

        </div>
</div>
       `
    // const markup = `
    //     <div class="movie-result">
    //         <h1>${data.Title}</h1>
    //         <img src="${data.Poster}" alt="Poster Here">
    //
    //
    //         <ul>
    //             <li>Year: ${data.Year}</li>
    //             <li>Rated: ${data.Rated}</li>
    //             <li>Release Date: ${data.Released}</li>
    //             <li>Type: ${capitalizeFirstLetter(data.Type)}</li>
    //             <li>Runtime: ${data.Runtime}</li>
    //             <li>Genre: ${data.Genre}</li>
    //             <li>Director: ${data.Director}</li>
    //             <li>Writer: ${data.Writer}</li>
    //             <li>Actors: ${data.Actors}</li>
    //             <li>Language: ${data.Language}</li>
    //             <li>Country: ${data.Country}</li>
    //             <li>Awards: ${data.Awards}</li>
    //             <li>IMDB Score: ${data.imdbRating}</li>
    //             <li>Metacritic Score: ${data.Metascore}</li>
    //         </ul>
    //         <div id="plot">
    //             <h4>${capitalizeFirstLetter(data.Type)} Plot</h4>
    //             <p>${data.Plot}</p>
    //         </div>
    //     </div>
    // </div>
    // `
    resultUI.insertAdjacentHTML('afterbegin', markup)
}







