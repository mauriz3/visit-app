import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addVisit } from "./VisitsActions";
import { isEmpty } from "./../../utils/Utils";

class AddVisit extends Component {
  componentDidMount() {
    this.onMount();
  }
  onMount = () => {
    const visit = {
      browser: getBrowser(),
      os: getOS(),
      is_new: isEmpty(localStorage.getItem("recurrent"))
    };
    this.props.addVisit(visit);
    localStorage.setItem("recurrent", true);
  };

  render() {
    return (
      <div>
        <hr />
        <h2>Welcome!</h2>
      </div>
    );
  }
}

AddVisit.propTypes = {
  addVisit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const getBrowser = () => {
  let userAgent = navigator.userAgent;
  let browserName = "Unknown";
  if (userAgent.match(/chrome|chromium|crios/i)) browserName = "Chrome";
  if (userAgent.match(/firefox|fxios/i)) browserName = "Firefox";
  if (userAgent.match(/safari/i)) browserName = "Safari";
  if (userAgent.match(/opr\//i)) browserName = "Opera";
  if (userAgent.match(/edg/i)) browserName = "Edge";
  return browserName
};

const getOS = () => {
  let OSName = "Unknown";
  if (navigator.userAgent.indexOf("Win") !== -1) OSName = "Windows";
  if (navigator.userAgent.indexOf("Mac") !== -1) OSName = "MacOS";
  if (navigator.userAgent.indexOf("Linux") !== -1) OSName = "Linux";
  if (navigator.userAgent.indexOf("Android") !== -1) OSName = "Android";
  if (navigator.userAgent.indexOf("like Mac") !== -1) OSName = "iOS";
  return OSName
};

export default connect(mapStateToProps, { addVisit })(withRouter(AddVisit));