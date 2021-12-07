import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import AddVisit from "./visits/AddVisit";

class Home extends Component {
  render() {
    return (
      <div>
        <Container>
          <h1 className="mt-4" id="home-title">Home</h1>
          <p>
            <Link to="/login/" id="login-link">Login</Link>
          </p>
          <p>
            <Link to="/signup" id="signup-link">Sign up</Link>
          </p>
          <p>
            <Link to="/dashboard" id="dashboard-link">Dashboard</Link>
          </p>
        </Container>
        <Container>
          <AddVisit />
        </Container>
      </div>
    );
  }
}

export default Home;
