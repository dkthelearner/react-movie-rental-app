import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };
  validate = () => {
    const { account } = this.state;
    const errors = { ...this.state.errors };
    if (account.username.trim() === "") {
      errors["username"] = "Username is required.";
    }
    if (account.password.trim() === "") {
      errors["username"] = "Password is required.";
    }
    return errors;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) return;
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div className="row">
        <div className="col-6 m-auto">
          <h3>Login Form</h3>
          <form onSubmit={this.handleSubmit} className="align-items-center">
            <Input
              name="username"
              label="Username"
              placeholder="Enter Username"
              value={account.username}
              onChange={this.handleChange}
            />
            <Input
              name="password"
              label="Password"
              placeholder="Enter Password"
              value={account.password}
              onChange={this.handleChange}
            />
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
