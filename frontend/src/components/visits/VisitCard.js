import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

class VisitCard extends Component {
  render() {
    return (
      <div>
        <Card
          border={this.props.border}
          className="mb-2"
        >
          <Card.Header>{this.props.header}</Card.Header>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

VisitCard.propTypes = {
  header: PropTypes.string.isRequired,
  title: PropTypes.number.isRequired,
  border: PropTypes.string,
};

export default VisitCard;