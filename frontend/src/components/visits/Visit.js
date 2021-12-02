import React, { Component } from "react";
import PropTypes from "prop-types";

class Visit extends Component {
  render() {
    const { visit } = this.props;
    return (
      <div>
        <hr />
        <p>
          (id:{visit.id}) {visit.is_new ? 'New' : 'Recurrent'}, {visit.browser}, {visit.os}, {visit.created_at}
        </p>
      </div>
    );
  }
}

Visit.propTypes = {
  visit: PropTypes.object.isRequired
};
export default Visit;