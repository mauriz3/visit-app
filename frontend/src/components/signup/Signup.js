import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";
import { signupNewUser } from "./SignupActions";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // update function to call the action
  onSignupClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.signupNewUser(userData);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md="4">
            <h1 className="mt-4" id="signup-title">Sign up</h1>
            <Form>
              <Form.Group controlId="usernameId">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  isInvalid={this.props.createUser.usernameError}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter user name"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid">
                  {this.props.createUser.usernameError}
                </FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="passwordId" className="mt-4">
                <Form.Label>Your password</Form.Label>
                <Form.Control
                  isInvalid={this.props.createUser.passwordError}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={this.password}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {this.props.createUser.passwordError}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
            <Button color="primary" id="signup-button" className="mt-4" onClick={this.onSignupClick}>
              Sign up
            </Button>
            <p className="mt-2">
              Already have account? <Link to="/login" id="login-link">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

// connect action and reducer
Signup.propTypes = {
  signupNewUser: PropTypes.func.isRequired,
  createUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  createUser: state.createUser
});

export default connect(mapStateToProps, {
  signupNewUser
})(withRouter(Signup));
