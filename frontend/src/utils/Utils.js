import axios from "axios";
import { toast } from "react-toastify";

export const setAxiosAuthToken = token => {
  if (typeof token !== "undefined" && token) {
    // Apply for every request
    axios.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const toastOnError = error => {
  if (error?.response?.data) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    toast.error(JSON.stringify(error.response.data));
  } else if (error?.message) {
    // the error message is available,
    // let's display it on error toast
    toast.error(JSON.stringify(error.message));
  } else {
    // strange error, just show it
    toast.error(JSON.stringify(error));
  }
};

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);
