import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from 'react-bootstrap/Table'

class VisitsTable extends Component {
  render() {
    const { visits } = this.props;
    let rows = visits.map(visit => {
      return <tr key={visit.id}><td>{visit.id}</td><td>{visit.is_new ? 'New' : 'Recurrent'}</td><td>{visit.browser}</td><td>{visit.os}</td><td>{visit.created_at}</td></tr>;
    });
    return (
      <div>
        <h1 className="mt-2">Visits</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>New/Recurrent</th>
              <th>Browser</th>
              <th>OS</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    );
  }
}

VisitsTable.propTypes = {
  visits: PropTypes.array.isRequired
};
export default VisitsTable;