import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../util/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 6,
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
  handleItemSelect = genre => {
    const movies = [...getMovies()];
    const filterMovies = [...getMovies()].filter(
      movie => movie.genre._id === genre._id
    );
    this.setState({
      movies: genre._id ? filterMovies : movies,
      currentPage: 1,
      selectedItem: genre
    });
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
              Refresh
            </button>
          </div>
        </div>
      );
    }

    const { movies, currentPage, pageSize, genres, selectedItem } = this.state;

    const filtered = paginate(movies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            listItems={genres}
            selectedItem={selectedItem}
            onItemSelect={this.handleItemSelect}
          />
        </div>
        <div className="col">
          <p className="text text-secondary">
            Showing {filtered.length} movie from database.
          </p>
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
                <tr key={movie._id}>
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
      </div>
    );
  }
}

export default Movies;
