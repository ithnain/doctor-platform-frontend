import { SET_ENUMS } from "../../types";

const initialState = {
  enums: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ENUMS:
      return { ...state, enums: payload };

    default:
      return state;
  }
};
