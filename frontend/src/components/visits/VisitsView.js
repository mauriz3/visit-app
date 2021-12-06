import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getVisits } from "./VisitsActions";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import VisitCard from "./VisitCard";
import VisitChart from "./VisitChart";
import VisitsTable from "./VisitsTable";
import moment from 'moment';

const today = new Date()
const yesterday = new Date(today).setDate(today.getDate() - 1)
const todayDateString = moment(today).format('YYYY-MM-DD');
const yesterdayDateString = moment(yesterday).format('YYYY-MM-DD');

class VisitsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: yesterdayDateString,
      endDate: todayDateString,
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFilterClick = () => {
    this.props.getVisits(this.state.startDate, this.state.endDate);
  };
  componentDidMount() {
    this.onFilterClick();
  };

  render() {
    const { rawVisits } = this.props.visits;
    const { newVisits } = this.props.visits;
    const { recurrentVisits } = this.props.visits;
    const { visitsFormattedByOSs } = this.props.visits;
    const { visitsFormattedByBrowsers } = this.props.visits;

    if (rawVisits.length === 0) {
      return <h2 className="mt-3">Data not found</h2>;
    }

    return (
      <div>
        <Form className="mt-4">
          <Row className="justify-content-end">
            <Col xs="6" md="4" lg="3">
              <Form.Group as={Row}>
                <Form.Label as={Col} sm="3" className="pt-2">From:</Form.Label>
                <Col sm="9" className="mb-3">
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.onChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs="6" md="4" lg="3">
              <Form.Group as={Row}>
                <Form.Label as={Col} sm="2" className="pt-2">To:</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.onChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs="3" sm="2" md="1">
              <Button variant="primary" onClick={this.onFilterClick}>
                Go
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="my-3">
          <Col sm="4">
            <VisitCard header="Total Visits" title={newVisits + recurrentVisits} />
          </Col>
          <Col sm="4">
            <VisitCard header="New Visits" title={newVisits} />
          </Col>
          <Col sm="4">
            <VisitCard header="Recurrent Visits" title={recurrentVisits} />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card
              border=""
              className="mb-2"
            >
              <Card.Header>Operative Systems</Card.Header>
              <Card.Body>
                <VisitChart area={false} data={visitsFormattedByOSs} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card
              className="mb-2"
            >
              <Card.Header>Browsers</Card.Header>
              <Card.Body>
                <VisitChart area={true} data={visitsFormattedByBrowsers} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <VisitsTable visits={rawVisits} />
      </div>
    );
  }
}

VisitsView.propTypes = {
  getVisits: PropTypes.func.isRequired,
  visits: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  visits: state.visits
});

export default connect(mapStateToProps, {
  getVisits
})(withRouter(VisitsView));