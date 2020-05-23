const apiKey = "&apikey=cbf7c5ee";
const baseURL = "https://www.omdbapi.com/";
const search = '?s='
const title = "?t=";
const id = "?i=";

const submitBtn = document.getElementById("submit-btn");
const userInput = document.getElementById("search-input");
const resultUI = document.querySelector(".movie-results-container")


let resultArr = [];
let movieID;

// EVENT LISTENER ON SUBMIT

submitBtn.addEventListener('click', generateSearch)


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
        //console.log(resultArr)

        displayResults()
    } catch (error) {
        alert("Can't find the movie you searched for :(")
    }

}

function displayResults() {
    clearUI()

    resultArr.forEach(movie => {
        const markup = `
       
        <div class="results">
            <img src="${movie.Poster}" alt="Movie Poster">
            <ul>
                <a href="#" id="more-details" onclick="onTitleClicked('${movie.imdbID}')"><li>${movie.Title}</li></a>
                <li>${capitalizeFirstLetter(movie.Type)}</li>
                <li>${movie.Year}</li>
                <li>${movie.imdbID}</li>
            </ul>
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
    //console.log(data)


    const markup = `
        <div class="movie-result">
            <h1>${data.Title}</h1>
            <img src="${data.Poster}" alt="Poster Here">


            <ul>
                <li>Year: ${data.Year}</li>
                <li>Rated: ${data.Rated}</li>
                <li>Release Date: ${data.Released}</li>
                <li>Type: ${capitalizeFirstLetter(data.Type)}</li>
                <li>Runtime: ${data.Runtime}</li>
                <li>Genre: ${data.Genre}</li>
                <li>Director: ${data.Director}</li>
                <li>Writer: ${data.Writer}</li>
                <li>Actors: ${data.Actors}</li>
                <li>Language: ${data.Language}</li>
                <li>Country: ${data.Country}</li>
                <li>Awards: ${data.Awards}</li>
                <li>IMDB Score: ${data.imdbRating}</li>
                <li>Metacritic Score: ${data.Metascore}</li>
            </ul>
            <div id="plot">
                <h4>${capitalizeFirstLetter(data.Type)} Plot</h4>
                <p>${data.Plot}</p>
            </div>
        </div>
    </div>
    `
    resultUI.insertAdjacentHTML('afterbegin', markup)
}







