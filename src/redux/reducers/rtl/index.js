import { SET_IS_RTL } from "../../types";

const initialState = {
  isRtl: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_RTL:
      return { isRtl: payload };

    default:
      return state;
  }
};
