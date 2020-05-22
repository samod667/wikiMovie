const apiKey = "&apikey=cbf7c5ee";
const baseURL = "https://www.omdbapi.com/";
const search = '?s='
const title = "?t=";
const id = "?i=";

const submitBtn = document.getElementById("submit-btn");
const userInput = document.getElementById("search-input");
const resultUI = document.querySelector(".movie-results-container")
const moreDetails = document.getElementById("more-details")


let resultArr = [];
let movieID;

// EVENT LISTENER

submitBtn.addEventListener('click', generateSearch)
moreDetails.addEventListener('click', e => {
    catchID()
} )


// FUNCTIONS
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearUI() {
    resultUI.innerHTML = ''
}

// function catchID(obj) {
//     movieID = obj.imdbID
// }

async function generateSearch() {
    resultArr = []

    const result = await fetch(`${baseURL}${search}${userInput.value}${apiKey}`)
    const data = await result.json();

    //push data in array
    data.Search.forEach(element => {
        resultArr.push(element)
    })
    console.log(resultArr)

    displayResults()
}

function displayResults() {
    clearUI()

    resultArr.forEach(movie => {
        movieID = movie.imdbID
        const markup = `
       
        <div class="results">
            <img src="${movie.Poster}" alt="Movie Poster">
            <ul>
                <a href="#"><li id="more-details">${movie.Title}</li></a>
                <li>${capitalizeFirstLetter(movie.Type)}</li>
                <li>${movie.Year}</li>
                <li>${movie.imdbID}</li>
            </ul>
            </div>
         
    `
        resultUI.insertAdjacentHTML('afterbegin', markup)
    })
}



