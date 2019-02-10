import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();
  handleSubmit = e => {
    e.preventDefault();
    console.log(e);
  };
  componentDidMount() {
    console.log(this.username);
  }
  render() {
    return (
      <div className="row">
        <div className="col-5 m-auto">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit} className="align-items-center">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                ref={this.username}
                className="form-control"
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
