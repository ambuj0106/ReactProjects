import React, { Component } from "react";
import { getMovies } from "./getMovie";
export default class Banner extends Component {
  render() {
    return (
      <div>
        <div className="card banner-card">
          <img
            src={`https://image.tmdb.org/t/p/w400/${getMovies.results[0].backdrop_path}`}
            className="card-img-top banner-img"
            alt="..."
          />
          <div className="card-body">
            <h1 className="card-title banner-title">
              {getMovies.results[0].original_title}
            </h1>
            <p className="card-text banner-overview">
              {getMovies.results[0].overview}
            </p>
            {/* <a href="#" className="btn btn-primary">
              Go somewhere
            </a> */}
          </div>
        </div>
      </div>
    );
  }
}
