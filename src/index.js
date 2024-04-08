let allMovies = [];
const movieList = document.getElementById("films");

function getMovies() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:3000/films", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            allMovies = result;
            ListMovies(result);
        })
        .catch((error) => console.error(error));
}

function ListMovies(movies) {
    let html = "";
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];
        html = html + `<li class="film items" onclick="clickedMovie(${i})">${movie.title}</li>`;
    }
    movieList.innerHTML = html;
}

getMovies();

function clickedMovie(i) {
    let poster = document.getElementById("poster");
    let clickedMovie =  allMovies[i];
    poster.src = clickedMovie.poster;
    poster.alt = clickedMovie.title;
    movieInfo(clickedMovie.id)


}

function movieInfo(id){
    const movieTitle = document.getElementById("title")
    const runtime = document.getElementById("runtime")
    const info = document.getElementById("film-info")
    const showtime = document.getElementById("showtime")
    const ticket = document.getElementById("ticket-num")
    const btn = document.getElementById("buy-ticket")

    const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch(`http://localhost:3000/films/${id}`, requestOptions)

  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    movieTitle.innerText = result.title;
    runtime.innerText = `${result.runtime} minutes`
    info.innerText = result.description
    showtime.innerText = result.showtime
    ticket.innerText = result.capacity
    btn.addEventListener("click", function(){
        
        result.capacity -=1
        ticket.innerText = `${result.capacity}`
    
    })
    

  })
  .catch((error) => console.error(error));

  


}

function makeSale(movie){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", 'application/json')
    const ticket = document.getElementById("ticket-num")
    const btn = document.getElementById("buy-ticket")

    const raw = JSON.stringify({
        title:movie.title,
        runtime: movie.runtime,
        capacity:movie.capacity,
        showtime:movie.showtime,
        tickets_sold:movie.tickets_sold,
        description:movie.description,
        poster:movie.poster,
    })

    const requestOptions = {
        method: "PUT",
        redirect: "follow",
        headers:myHeaders,
        body:raw
      };
      
      fetch(`http://localhost:3000/films/${movie.id}}`, requestOptions)
        .then((response) => response.text())
        .then((result) => { console.log(result)
            movieInfo(movie.id)        
            
        })
        .catch((error) => console.error(error));

}

makeSale()