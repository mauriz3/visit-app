import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_VISITS, ADD_VISIT } from "./VisitsTypes";

export const getVisits = (startDate = "", endDate = "") => dispatch => {
  axios
    .get(`/api/v1/visits/?start_date=${startDate}&end_date=${endDate}`)
    .then(response => {
      dispatch({
        type: GET_VISITS,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const addVisit = visit => dispatch => {
  axios
    .post("/api/v1/visits/", visit)
    .then(response => {
      dispatch({
        type: ADD_VISIT,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};
