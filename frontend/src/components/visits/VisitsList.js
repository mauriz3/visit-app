import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getVisits } from "./VisitsActions";
import { Button, Form, Row, Col } from "react-bootstrap";
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
      return <h2 className="mt-3">Data not found</h2>;
    }

    let items = visits.map(visit => {
      return <Visit key={visit.id} visit={visit} />;
    });

    return (
      <div>
        <h3 className="mt-3">Date range</h3>
        <Form>
         <Row>
           <Col>
              <Form.Group>
                <Form.Label>From:</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={this.startDate}
                  onChange={this.onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={this.endDate}
                  onChange={this.onChange}
                />
              </Form.Group>
            </Col>
            <Col className="mt-2">
              <Button className="mt-4" variant="success" onClick={this.onFilterClick}>
                Filter
              </Button>
            </Col>
          </Row>
        </Form>
        <h1 className="mt-4">Visits</h1>
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