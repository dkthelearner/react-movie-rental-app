import React, { Component } from "react";

class MovieDetail extends Component {
  handleSave = () => {
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div>
        <h1>Movie of {this.props.match.params.id}</h1>
        <button onClick={this.handleSave} className="btn btn-primary btn-sm">
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetail;
