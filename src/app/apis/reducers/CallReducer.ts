import { SET_CALL_DATA } from "../ActionTypes";
const initialVal = {
  calls: [],
};

const callsReducer = (state = initialVal, action: any) => {
  switch (action.type) {
    case SET_CALL_DATA:
      return {
        ...state,
        calls: action.payload,
      };

      return {
        ...state,
        otpToken: action.payload,
      };

      return {
        ...state,
        orderDownloadCount: action.payload,
      };

      return {
        ...state,
        apiError: action.payload,
      };

      return {
        ...state,
        totalPages: action.payload,
      };

      return {
        ...state,
        totalOrders: action.payload,
      };
    default:
      return state;
  }
};

export default callsReducer;
