import axios from "axios";
import { SET_CALL_DATA } from "../ActionTypes";
export const setCallData = (data: any) => {
  return (dispatch: any) => dispatch({ type: SET_CALL_DATA, payload: data });
};

export const getCallData = () => {
  return (dispatch: any) => {
    const config = {
      method: "get",
      url: "https://frontend-test-api.aircall.io/calls?offset=1&limit=10",
      Headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response);
        dispatch(setCallData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
