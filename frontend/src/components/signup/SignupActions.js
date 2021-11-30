import axios from "axios";
import { toast } from "react-toastify";
import { toastOnError } from "../../utils/Utils";
import {
  CREATE_USER_ERROR,
  CREATE_USER_SUBMITTED,
  CREATE_USER_SUCCESS
} from "./SignupTypes";

export const signupNewUser = userData => dispatch => {
  dispatch({ type: CREATE_USER_SUBMITTED }); // set submitted state
  axios
    .post("/api/v1/users/", userData)
    .then(response => {
      toast.success(
        "Account for " +
          userData.username +
          " created successfully. Please login."
      );
      dispatch({ type: CREATE_USER_SUCCESS });
    })
    .catch(error => {
      toastOnError(error);
      if (error?.response?.data) {
        dispatch({
          type: CREATE_USER_ERROR,
          errorData: error.response.data
        });
      }
    });
};