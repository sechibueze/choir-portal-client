import axios from "axios";
import {
  SHILOH_SIGNUP_REQUEST,
  SHILOH_SIGNUP_SUCCESS,
  SHILOH_SIGNUP_FAIL,
  SHILOH_LIST_FAIL,
  SHILOH_LIST_REQUEST,
  SHILOH_LIST_SUCCESS,
  SHILOH_DATA_REQUEST,
  SHILOH_DATA_SUCCESS,
  SHILOH_DATA_FAIL,
  EDIT_SHILOH_FAIL,
  EDIT_SHILOH_REQUEST,
  EDIT_SHILOH_SUCCESS,
  DELETE_SHILOH_FAIL,
  DELETE_SHILOH_REQUEST,
  DELETE_SHILOH_SUCCESS,
  RESET_SHILOH_DATA,
} from "../_actions/types";
import { setAlert, handleResponseErrors } from "./alertActions";
import { getConfigHeaders } from "./authActions";
import { BACKEND_URL } from "../constants";

export const registerForShiloh = (data) => (dispatch) => {
  dispatch({ type: SHILOH_SIGNUP_REQUEST });
  const uri = `${BACKEND_URL}/api/shiloh/register`;
  const configHeaders = getConfigHeaders();
  axios
    .post(uri, data, configHeaders)
    .then(({ data }) => {
      console.log("[registerForShiloh ] data", data);
      dispatch({ type: SHILOH_SIGNUP_SUCCESS, payload: data.data });
      dispatch(
        setAlert("Shiloh signup success", SHILOH_SIGNUP_SUCCESS, "success")
      );
    })
    .catch((err) => {
      console.log("[registerForShiloh ] error", { err });
      dispatch(handleResponseErrors(err, SHILOH_SIGNUP_FAIL));
      dispatch({ type: SHILOH_SIGNUP_FAIL });
    });
};

// Update Shiloh Registration
export const updateShilohRegistration = (data) => (dispatch) => {
  dispatch({ type: EDIT_SHILOH_REQUEST });
  const uri = `${BACKEND_URL}/api/shiloh/attendees/update`;
  const configHeaders = getConfigHeaders();
  axios
    .put(uri, data, configHeaders)
    .then(({ data }) => {
      console.log("[updateShilohRegistration ] data", data);
      dispatch({ type: EDIT_SHILOH_SUCCESS, payload: data.data });
      dispatch(
        setAlert("Shiloh update success", EDIT_SHILOH_SUCCESS, "success")
      );
    })
    .catch((err) => {
      console.log("[updateShilohRegistration ] error", { err });
      dispatch(handleResponseErrors(err, EDIT_SHILOH_FAIL));
      dispatch({ type: EDIT_SHILOH_FAIL });
    });
};

export const getShilohRegistration = (options = {}) => (dispatch) => {
  console.log("opt", options);
  dispatch({
    type:
      Object.keys(options).length > 0
        ? SHILOH_DATA_REQUEST
        : SHILOH_LIST_REQUEST,
  });
  const hasQuery = Object.keys(options).length > 0;

  const uri = new URL(`${BACKEND_URL}/api/shiloh/attendees`);
  let queryStrings = "";
  if (hasQuery) queryStrings = uri.searchParams;

  const { _id, access } = options;
  if (access) queryStrings.append("access", access);
  if (_id) queryStrings.append("id", _id);

  uri.search = queryStrings.toString();

  const configHeaders = getConfigHeaders();
  axios
    .get(uri, configHeaders)
    .then(({ data }) => {
      console.log("[getShilohRegistration ] data", data);
      dispatch({
        type: hasQuery ? SHILOH_DATA_SUCCESS : SHILOH_LIST_SUCCESS,
        payload: data.data,
      });
      dispatch(
        setAlert(
          "Shiloh data success",
          hasQuery ? SHILOH_DATA_SUCCESS : SHILOH_LIST_SUCCESS,
          "success"
        )
      );
    })
    .catch((err) => {
      console.log("[getShilohRegistration ] error", { err });
      dispatch(
        handleResponseErrors(
          err,
          hasQuery ? SHILOH_DATA_FAIL : SHILOH_LIST_FAIL
        )
      );
      dispatch({ type: hasQuery ? SHILOH_DATA_FAIL : SHILOH_LIST_FAIL });
    });
};

export const removeShilohRegistration = (options = {}) => (dispatch) => {
  console.log("opt", options);
  dispatch({
    type: DELETE_SHILOH_REQUEST,
  });
  const uri = new URL(`${BACKEND_URL}/api/shiloh/attendees`);
  const configHeaders = getConfigHeaders();
  axios
    .put(uri, options, configHeaders)
    .then(({ data }) => {
      console.log("[removeShilohRegistration ] data", data);
      dispatch({
        type: DELETE_SHILOH_SUCCESS,
        payload: data.data,
      });
      dispatch(
        setAlert("Shiloh data success", DELETE_SHILOH_SUCCESS, "success")
      );
    })
    .catch((err) => {
      console.log("[removeShilohRegistration ] error", { err });
      dispatch(handleResponseErrors(err, DELETE_SHILOH_FAIL));
      dispatch({ type: DELETE_SHILOH_FAIL });
    });
};

export const resetShilohData = () => (dispatch) =>
  dispatch({ type: RESET_SHILOH_DATA });
