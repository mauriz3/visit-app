import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getVisits } from "./VisitsActions";
import { Button, Form } from "react-bootstrap";
import Visit from "./Visit";

class VisitsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFilterClick = () => {
    console.log('this.state', this.state)
    this.props.getVisits(this.state.startDate, this.state.endDate);
  };
  componentDidMount() {
    this.props.getVisits();
  }

  render() {
    const { visits } = this.props.visits;

    if (visits.length === 0) {
      return <h2>Please add your first visit</h2>;
    }

    let items = visits.map(visit => {
      return <Visit key={visit.id} visit={visit} />;
    });

    return (
      <div>
        <h3>Date range</h3>
        <Form>
          <Form.Group>
            <Form.Label>From:</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={this.startDate}
              onChange={this.onChange}
            />
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={this.endDate}
              onChange={this.onChange}
            />
          </Form.Group>
        </Form>
        <Button variant="success" onClick={this.onFilterClick}>
          Filter
        </Button>
        <hr />
        <h1>Visits</h1>
        {items}
        <hr />
      </div>
    );
  }
}

VisitsList.propTypes = {
  getVisits: PropTypes.func.isRequired,
  visits: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  visits: state.visits
});

export default connect(mapStateToProps, {
  getVisits
})(withRouter(VisitsList));