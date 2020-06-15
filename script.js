/// VARIABLES ///

    const apiKey = "&apikey=cbf7c5ee";
    const baseURL = "https://www.omdbapi.com/";
    const search = '?s='
    const title = "?t=";
    const id = "?i=";

    const formEl = document.getElementById('form');
    const userInput = document.getElementById("search-input");
    const resultUI = document.querySelector(".movie-results-container")


    let resultArr = [];
    let movieID;

        /// EVENT LISTENERS ///

    // Event on submit
    formEl.addEventListener('submit', e => {
        e.preventDefault();

        //Start the search for the movie
        generateSearch();

        //Clear user input and blue text field
        userInput.value = '';
        userInput.blur();
    });

    //Event on head click
    document.getElementById('head').addEventListener('click', e => {
        location.reload();
    });


        /// FUNCTIONS ///

    //First letter to capital
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //Clear UI
    function clearUI() {
        resultUI.innerHTML = '';
    }

    //On title clicked get the movie ID and disply the full movie results
    function onTitleClicked(id) {
        movieID = id;
        displayMovieResults();
    }

    async function generateSearch() {
        //Reset the result array if search was already made
        resultArr = []

        try {
            const result = await fetch(`${baseURL}${search}${userInput.value}${apiKey}`);
            const data = await result.json();

            //push data in array
            data.Search.forEach(element => {
                resultArr.push(element)
            })
            // console.log(resultArr)

            //Remove error msg
            userInput.classList.remove('form-control', "is-invalid");

            //Animate main search area up
            document.getElementById('container').classList.remove('center');
            document.getElementById('container').classList.add("animate__animated", "animate__slideInUp");
            displayResults();


        } catch (error) {
            userInput.classList.add('form-control', "is-invalid");
        }

    }

    function displayResults() {
        //Clear UI for previous results
        clearUI()

        //Loop through results and display markup for all movie results
        resultArr.forEach(movie => {
            const markup = `
       
            <div class="result2 animate__animated animate__fadeIn">
                    <a href="#main-result1" class="more-details" onclick="onTitleClicked('${movie.imdbID}')"><img src="${movie.Poster}" alt="Movie Poster"></a>
                    <a href="#main-result1" class="more-details" onclick="onTitleClicked('${movie.imdbID}')"><span id="movie-title">${movie.Title}</span></a>
                    <span id="movie-type">${capitalizeFirstLetter(movie.Type)}</span>
                    <span>${movie.Year}</span>        
                </div>      
               `;
            resultUI.insertAdjacentHTML('afterbegin', markup)

        })

    };

    async function displayMovieResults() {
        //Clear UI for previous results
        clearUI()
        //Get data from API
        const result = await fetch(`${baseURL}${id}${movieID}${apiKey}`)
        const data = await result.json()
        // console.log(data)

        //Display single movie results page markup
        const markup = `
        <div id="main-result1" class="movie-result1 animate__animated animate__fadeIn">
            <div class="main-result">
                <img src="${data.Poster}" alt="Poster" id="main-poster">
                <h2 id="movie-main-title">${data.Title}</h2>
            </div>

        <div class="movie-details">
            <span id="plot">${data.Plot}</span>
            <table class="movie-details-table">
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
        </div>`

    resultUI.insertAdjacentHTML('afterbegin', markup)
    }









