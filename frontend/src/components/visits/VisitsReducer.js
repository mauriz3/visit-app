import { GET_VISITS, ADD_VISIT } from "./VisitsTypes";

const initialState = {
  visits: []
};

export const visitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VISITS:
      return {
        ...state,
        visits: action.payload
      };
    case ADD_VISIT:
      return {
        ...state,
        visits: [...state.visits, action.payload]
      };
    default:
      return state;
  }
};
