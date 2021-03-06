function minInfo(id, element) {
  axios
    .get("http://www.omdbapi.com?i=" + id + "&apikey=2728c457")
    .then(response => {
      console.log(response);
      var movie = response.data;
      var poster = movie.Poster;
      var title = movie.Title;
      let released = movie.Released;
      let genre = movie.Genre;
      let actors = movie.Actors;
      let director = movie.Director;
      let plot = movie.Plot;
      let output = "";
      if (
        element
          .parent()
          .parent()
          .attr("id") === "featured"
      ) {
        output = `
        <img
        class="img-fluid"
        src="${poster}"
        title="post-name"
      />

      <div class="artical-info">
        <h3>${title}</h3>
        <p><strong>Released:</strong> ${released}</p>
        <p>
          <strong>Genre:</strong> ${genre}
        </p>
       
        <a onclick="movieSelected('${id}')" class="btn btn-secondary mr-4" href="#">More info</a>
        <a  class="btn btn-warning ml-4  ">Rent Now</a>
        `;

        console.log(title);
      } else if (
        element
          .parent()
          .parent()
          .attr("id") === "new-movies"
      ) {
        console.log();
        output = `
        <img src="${poster}" class="img-fluid"/>
        <div class="artical-info">
          <h4>${title}</h4>
          <p><strong>Released:</strong> ${released}</p>
         
        <p>
          <strong>Genre:</strong> ${genre}
        </p>
          <a onclick="movieSelected('${id}')" class="btn btn-secondary mr-1">
            More info
          </a>
          <a  class="btn btn-warning ml-1">
            Rent Now
          </a>
        </div>
        `;
      } else if (
        element
          .parent()
          .parent()
          .attr("id") === "new-releases"
      ) {
        output = `
        <img src="${poster}" class=" img-fluid" />
        <div class="artical-info">
          <h4>${title}</h4>
          <p><strong>Released:</strong> ${released}</p>
        <p>
          <strong>Genre:</strong> ${genre}
        </p>
          <a onclick="movieSelected('${id}')" class="btn btn-secondary mr-1">
            More info
          </a>
          <a  class="btn btn-warning ml-1">
            Rent Now
          </a>
        </div>
        `;
      } else if (element.parent().attr("id") === "coming-soon") {
        output = `
        <figure class="figure">
        <img
          class="col-sm-12 "
          src="${poster}"
          alt="Zena"
          class="figure"
        />
        <div
          style="font-size: 1vw"
          class=" figure-caption artical-info mt-auto "
        >
          <h2>${title}</h2>
          <p><strong>Release Date:</strong> ${released}</p>
          <p><strong>Director:</strong> ${director}</p>
          <p>
            <strong>Synopsis:</strong> ${plot}
          </p>
          <p>
            <strong>Actors:</strong> ${actors}
          </p>
          <a onclick="movieSelected('${id}')" class="btn btn-secondary mr-2 ">
            More info
          </a>
          <a  class="btn btn-warning ml-2  ">
            Pre-order
          </a>
        </div>
      </figure>
        `;
      }
      element.html(output);
    })
    .catch(error => {
      console.log(error);
    });
}

minInfo("tt4154796", $(".featured-1"));
minInfo("tt5884052", $(".featured-2"));
minInfo("tt1298644", $(".featured-3"));
minInfo("tt4154796", $(".trending:eq(0)"));
minInfo("tt6722030", $(".trending:eq(1)"));
minInfo("tt5884052", $(".trending:eq(2)"));
minInfo("tt2139881", $(".trending:eq(3)"));
minInfo("tt1298644", $(".trending:eq(4)"));
minInfo("tt6146586", $(".new-release:eq(0)"));
minInfo("tt6423362", $(".new-release:eq(1)"));
minInfo("tt6920356", $(".new-release:eq(2)"));
minInfo("tt6139732", $(".coming:eq(0)"));
minInfo("tt1489887", $(".coming:eq(1)"));

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function maxInfo() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com?i=" + movieId + "&apikey=2728c457")
    .then(response => {
      console.log(response);
      let movie = response.data;
      $(document).prop("title", `Rent ${movie.Title.toUpperCase()} on Renvies`);
      let output = `
      <div class="content">
      <div class="container-fluid"></div>
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre: </strong>${
                movie.Genre
              }</li>
              <li class="list-group-item"><strong>Released: </strong>${
                movie.Released
              }</li>
              <li class="list-group-item"><strong>Rated: </strong>${
                movie.Rated
              }</li>
              <li class="list-group-item"><strong>IMDB Rating: </strong>${
                movie.imdbRating
              }</li>
              <li class="list-group-item"><strong>Director: </strong>${
                movie.Director
              }</li>
              <li class="list-group-item"><strong>Writer: </strong>${
                movie.Writer
              }</li>
              <li class="list-group-item"><strong>Actors: </strong>${
                movie.Actors
              }</li>
            </ul>
            <div class="well">
              <h2>Plot</h2>
              <p>${movie.Plot}</p>
              <hr>
              <a href="http://imdb.com/title/${
                movie.imdbID
              }" target=_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default">Go back to Search</a>
            </div>
          </div>
        </div>
        </div>
        </div>
      `;
      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
