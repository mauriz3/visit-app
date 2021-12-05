import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addVisit } from "./VisitsActions";
import { isEmpty } from "./../../utils/Utils";
import { BROWSER, OS } from "./VisitsTypes";

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
  let browserName = BROWSER.UNKNOWN.NAME;
  if (userAgent.match(/chrome|chromium|crios/i)) browserName = BROWSER.CHROME.NAME;
  if (userAgent.match(/firefox|fxios/i)) browserName = BROWSER.FIREFOX.NAME;
  if (userAgent.match(/safari/i)) browserName = BROWSER.SAFARI.NAME;
  if (userAgent.match(/opr\//i)) browserName = BROWSER.OPERA.NAME;
  if (userAgent.match(/edg/i)) browserName = BROWSER.EDGE.NAME;
  return browserName
};

const getOS = () => {
  let OSName = OS.UNKNOWN.NAME;
  if (navigator.userAgent.indexOf("Win") !== -1) OSName = OS.WINDOWS.NAME;
  if (navigator.userAgent.indexOf("Mac") !== -1) OSName = OS.MACOS.NAME;
  if (navigator.userAgent.indexOf("Linux") !== -1) OSName = OS.LINUX.NAME;
  if (navigator.userAgent.indexOf("Android") !== -1) OSName = OS.ANDROID.NAME;
  if (navigator.userAgent.indexOf("like Mac") !== -1) OSName = OS.IOS.NAME;
  return OSName
};

export default connect(mapStateToProps, { addVisit })(withRouter(AddVisit));