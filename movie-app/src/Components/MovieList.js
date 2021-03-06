import React, { Component } from "react";
import axios from "axios";
export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1,
      movie: [],
      fav: [],
    };
  }
  async componentDidMount() {
    // Side effects
    const res =
      await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c31c674c6542b694c057197919f2d628&language=en-US&page=${this.state.currPage}
    `);
    let popMovies = res.data;
    this.setState({
      movie: [...popMovies.results],
    });
    console.log(res);
    console.log("mounting Done");
  }
  changeMovies = async () => {
    const res =
      await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c31c674c6542b694c057197919f2d628&language=en-US&page=${this.state.currPage}
    `);
    let popMovies = res.data;
    this.setState({
      movie: [...popMovies.results],
    });
  };
  handleNext = () => {
    if (this.state.currPage >= this.state.parr.length) {
      let tmpArr = [];
      for (let i = 1; i <= this.state.parr.length + 1; i++) {
        tmpArr.push(i);
      }
      this.setState(
        {
          currPage: this.state.currPage + 1,
          parr: [...tmpArr],
        },
        this.changeMovies
      );
    } else {
      this.setState(
        {
          currPage: this.state.currPage + 1,
        },
        this.changeMovies
      );
    }
  };
  handlePrev = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  };
  handleNum = (pn) => {
    if (pn != this.state.currPage) {
      this.setState(
        {
          currPage: pn,
        },
        this.changeMovies
      );
    }
  };
  handleFav = (movieObj) => {
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    if (this.state.fav.includes(movieObj.id)) {
      oldData = oldData.filter((m) => m.id != movieObj.id);
    } else {
      oldData.push(movieObj);
    }
    localStorage.setItem("movies", JSON.stringify(oldData));
    this.handleFavState();
    console.log(oldData);
  };
  handleFavState = () => {
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    let temp = oldData.map((m) => m.id);
    this.setState({
      fav: [...temp],
    });
  };
  render() {
    let movies = this.state.movie;
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
                <div
                  className="card movie-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
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
                    {this.state.hover == movieObj.id &&
                      (this.state.fav.includes(movieObj.id) ? (
                        <a
                          className="btn btn-primary movie-button"
                          onClick={() => this.handleFav(movieObj)}
                        >
                          Remove from favourite
                        </a>
                      ) : (
                        <a
                          className="btn btn-primary movie-button"
                          onClick={() => this.handleFav(movieObj)}
                        >
                          Add to Favourite
                        </a>
                      ))}
                  </div>
                  {/* </div> */}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" onClick={this.handlePrev}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((pn) =>
                    pn == this.state.currPage ? (
                      <li className="page-item active">
                        <a
                          className="page-link"
                          onClick={() => this.handleNum(pn)}
                        >
                          {pn}
                        </a>
                      </li>
                    ) : (
                      <li className="page-item ">
                        <a
                          className="page-link"
                          onClick={() => this.handleNum(pn)}
                        >
                          {pn}
                        </a>
                      </li>
                    )
                  )}
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleNext}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
