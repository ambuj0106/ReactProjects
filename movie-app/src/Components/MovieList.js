import React, { Component } from "react";
import { getMovies } from "./getMovie";
export default class MovieList extends Component {
  render() {
    let movies = getMovies.results;
    return (
      <>
        {movies.length == 0 ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-center">Trending</h3>
            <div className="movie-list">
              {movies.map((movieObj) => (
                <div className="card movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w400/${movieObj.backdrop_path}`}
                    className="card-img-top movie-img"
                    alt="..."
                  />
                  {/* <div className="card-body"> */}
                  <h3 className="card-title movie-title">
                    {movieObj.original_title}
                  </h3>
                  {/* <p className="card-text movie-overview">
                      {movieObj.overview}
                    </p> */}
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#" className="btn btn-primary movie-button">
                      Add to favourite
                    </a>
                  </div>
                  {/* </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
