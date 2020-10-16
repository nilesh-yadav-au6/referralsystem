import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userAction";
import style from "../SignIn/Login.module.css";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorEmail: "",
      errorPassword: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validate = () => {
    let errorEmail = "";
    let errorPassword = "";

    if (!this.state.email.includes("@")) {
      errorEmail = "invalid email";
    }
    if (errorEmail) {
      this.setState({ errorEmail });
      return false;
    }
    if (!this.state.password) {
      errorPassword = "Password can not be Empty";
    }

    if (errorPassword) {
      this.setState({ errorPassword });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isvalid = this.validate();
    if (isvalid) {
      const loggedUser = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.loginUser(loggedUser);
      this.setState({
        email: "",
        password: "",
        errorEmail: "",
        errorPassword: "",
      })
    }
  };

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit} className={style.mainDiv}>
          <input
            className={style.inDiv}
            type="email"
            name="email"
            // required
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <small style={{color:"red"}}>{this.state.errorEmail}</small>
          <input
            className={style.inDiv}
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <small style={{color:"red"}}>{this.state.errorPassword}</small>
          <input className={style.btDiv} type="submit" value="Sing In" />
        </form>
        {this.props.propsUser !== null ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }
}

const mapStateProp = (state) => {
  return {
    propsUser: state.user.user,
  };
};

export default connect(mapStateProp, { loginUser })(Login);
