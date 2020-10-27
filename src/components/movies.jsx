import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../util/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 6,
    sortColumn: { path: "title", order: "asc" },
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
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleItemSelect = genre => {
    this.setState({
      currentPage: 1,
      selectedGenre: genre
    });
  };
  render() {
    const {
      currentPage,
      pageSize,
      genres,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const { length: count } = this.state.movies;

    const filterMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filterMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    if (count === 0) {
      return (
        <span className="text text-secondary">
          There is no movies in database.
        </span>
      );
    }

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            listItems={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleItemSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filterMovies.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onDelete={this.handleDelete}
          />
          <Pagination
            totalCount={filterMovies.length}
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
