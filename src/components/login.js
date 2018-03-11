import React from "react";
import PropTypes from "prop-types";

const Login = props => (
  <nav className="Login">
    <h2>Inventory Login</h2>
    <p>Login to manage your inventory</p>
    <button className="github" onClick={() => props.authenticate("Github")}>
      Login with Github
    </button>
    <button className="twitter" onClick={() => props.authenticate("Twitter")}>
      Login with twitter
    </button>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Login with facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
