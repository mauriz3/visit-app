import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import AddVisit from "./visits/AddVisit";

class Home extends Component {
  render() {
    return (
      <div>
        <Container>
          <h1 className="mt-4">Home</h1>
          <p>
            <Link to="/login/">Login</Link>
          </p>
          <p>
            <Link to="/signup">Sign up</Link>
          </p>
          <p>
            <Link to="/dashboard">Dashboard</Link>
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
