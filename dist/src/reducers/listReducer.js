
import { types } from "../types/types";

const initialState = {
  list: [
    {
      id: "100",
      valores: "000000000000",
    },
  ],
  actual: {
    id: "0",
    valores: "",
  },
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventLoaded:
      return {
        ...state,
        list: [...action.payload],
      };

    case types.eventUpdated:
      return {
        ...state,
        actual: action.payload,
      };

    default:
      return state;
  }
};
