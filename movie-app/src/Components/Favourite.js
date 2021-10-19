import React, { Component } from "react";
import { getMovies } from "./getMovie";

export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genre: [],
      currgen: "All Genres",
      movies: [],
      genres: [],
    };
  }
  selectGenre = (genre) => {
    this.setState({
      currgen: genre,
    });
  };
  handleDelete = (id) => {
    let temp = this.state.movies.filter((m) => m.id != id);
    this.setState({
      movies: [...temp],
    });
    localStorage.setItem("movies", JSON.stringify(temp));
  };
  componentDidMount() {
    const genreIds = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let temp = [];
    temp.push("All Genres");
    let Data = JSON.parse(localStorage.getItem("movies") || "[]");
    this.state.movies = [...Data];
    this.state.movies.forEach((movieObj) => {
      if (!temp.includes(genreIds[movieObj.genre_ids[0]])) {
        temp.push(genreIds[movieObj.genre_ids[0]]);
      }
    });
    this.setState({
      genres: [...temp],
    });
  }

  render() {
    const genreIds = {
      1: "All Genre",
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let filteredMovies = [];
    if (this.state.currgen != "All Genres") {
      filteredMovies = this.state.movies.filter(
        (m) => genreIds[m.genre_ids[0]] == this.state.currgen
      );
    } else {
      filteredMovies = this.state.movies;
    }
    console.log(filteredMovies);
    return (
      <>
        <div>
          <div className="row">
            <div className="col-3 favourite-filter">
              <ul className="list-group ">
                {this.state.genres.map((genre) =>
                  genre == this.state.currgen ? (
                    <li
                      className="list-group-item"
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        fontWeight: "900",
                      }}
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      className="list-group-item "
                      onClick={() => this.selectGenre(genre)}
                    >
                      {genre}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Poster</th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Language</th>
                    <th scope="col">Rating</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovies.map((movieObj) => (
                    <tr>
                      {/* <th scope="row"></th> */}
                      <td>
                        <img
                          src={`https://image.tmdb.org/t/p/w400/${movieObj.backdrop_path}`}
                          className="Favourite-img"
                          alt="..."
                        />
                      </td>
                      <td>{movieObj.original_title}</td>
                      <td>{genreIds[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.original_language}</td>
                      <td>{movieObj.vote_average}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(movieObj.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
