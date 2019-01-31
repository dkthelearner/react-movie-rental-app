import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../util/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handleRefresh = () => {
    this.setState({ movies: getMovies() });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handlePageSize = e => {
    this.setState({ pageSize: e.target.value });
  };
  handleItemSelect = genre => {
    console.log("Item Selected !", genre);
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) {
      return (
        <div className="row">
          <div className="col-6">
            <span className="text text-secondary">
              There is no movies in database.
            </span>
          </div>
          <div className="col">
            <button
              onClick={() => this.handleRefresh()}
              className="btn btn-secondary btn-sm"
            >
              Refersh
            </button>
          </div>
        </div>
      );
    }

    const { movies, currentPage, pageSize, genres } = this.state;

    const filtered = paginate(movies, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup listItems={genres} onItemSelect={this.handleItemSelect} />
        </div>
        <div className="col">
          <div className="row">
            <div className="col-10">
              <p className="text text-secondary">
                Showing {filtered.length} movie from database.
              </p>
            </div>
            <div className="col">
              <select
                className="custom-select"
                name="pageSize"
                id="pageSize"
                onChange={this.handlePageSize}
              >
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>

          <table className="table table-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rent</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map(movie => (
                <tr key={movie._id} className="text text-secondary">
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            totalItems={count}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div className="col-2" />
      </div>
    );
  }
}

export default Movies;
