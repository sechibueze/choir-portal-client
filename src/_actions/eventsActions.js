import axios from "axios";
import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  GET_EVENTS_FAIL,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENT_FAIL,
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_REQUEST,
  UPLOAD_ATTENDANCE_REQUEST,
  UPLOAD_ATTENDANCE_SUCCESS,
  UPLOAD_ATTENDANCE_FAIL,
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_FAIL,
  GET_ACTIVITY_SUCCESS,
} from "./types";
import { getConfigHeaders } from "./authActions";
import { setAlert, handleResponseErrors } from "./alertActions";
import { BACKEND_URL } from "../constants";

// create event
export const createEvent = (event) => (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/events`;
  axios
    .post(uri, event, configHeaders)
    .then(({ data }) => {
      console.log("[createEvent]:data ", data);
      dispatch({
        type: CREATE_EVENT_SUCCESS,
        payload: data.data,
      });
      dispatch(setAlert(data.message, CREATE_EVENT_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[createEvent]:err ", { err });
      handleResponseErrors(err, CREATE_EVENT_FAIL);
      dispatch({ type: CREATE_EVENT_FAIL });
    });
};

// Get ALl Events
export const getEvents = () => (dispatch) => {
  dispatch({ type: GET_EVENTS_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/events`;
  axios
    .get(uri, configHeaders)
    .then(({ data }) => {
      console.log("[getEvents]:data ", data);
      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: data.data,
      });
      dispatch(setAlert(data.message, GET_EVENTS_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[getEvents]:err ", { err });
      handleResponseErrors(err, GET_EVENTS_FAIL);
      dispatch({ type: GET_EVENTS_FAIL });
    });
};

// Get Event activity
export const getEventActivity = () => (dispatch, getState) => {
  dispatch({ type: GET_ACTIVITY_REQUEST });
  const configHeaders = getConfigHeaders();
  const access = getState().auth.currentMember.access;
  console.log("get state", access);
  const uri = `${BACKEND_URL}/api/events?access=${access}`;
  axios
    .get(uri, configHeaders)
    .then(({ data }) => {
      console.log("[getEventActivity]:data ", data);
      dispatch({
        type: GET_ACTIVITY_SUCCESS,
        payload: data.data,
      });
      dispatch(setAlert(data.message, GET_ACTIVITY_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[getEventActivity]:err ", { err });
      handleResponseErrors(err, GET_ACTIVITY_FAIL);
      dispatch({ type: GET_ACTIVITY_FAIL });
    });
};

// Get ALl Event by id
export const getEventById = (id) => (dispatch) => {
  dispatch({ type: GET_EVENT_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/events?id=${id}`;
  axios
    .get(uri, configHeaders)
    .then(({ data }) => {
      console.log("[getEventById]:data ", data);
      dispatch({
        type: GET_EVENT_SUCCESS,
        payload: data.data,
      });
      dispatch(setAlert(data.message, GET_EVENT_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[getEventById]:err ", { err });
      handleResponseErrors(err, GET_EVENT_FAIL);
      dispatch({ type: GET_EVENT_FAIL });
    });
};

// Upload attendance
export const uploadAttendance = (fd) => (dispatch) => {
  dispatch({ type: UPLOAD_ATTENDANCE_REQUEST });
  const configHeaders = getConfigHeaders("multipart/form-data");
  const uri = `${BACKEND_URL}/api/events/attendance`;
  axios
    .post(uri, fd, configHeaders)
    .then(({ data }) => {
      console.log("[uploadAttendance]:data ", data);
      dispatch({
        type: UPLOAD_ATTENDANCE_SUCCESS,
        payload: data.data,
      });
      dispatch(setAlert(data.message, UPLOAD_ATTENDANCE_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[uploadAttendance]:err ", { err });
      handleResponseErrors(err, UPLOAD_ATTENDANCE_FAIL);
      dispatch({ type: UPLOAD_ATTENDANCE_FAIL });
    });
};

// Delete events
export const deleteEvents = (events) => (dispatch) => {
  dispatch({ type: DELETE_EVENT_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/events/delete`;
  axios
    .put(uri, events, configHeaders)
    .then(({ data }) => {
      console.log("[deleteEvents]:data ", data);
      dispatch({
        type: DELETE_EVENT_SUCCESS,
        payload: data.data,
      });
      dispatch(setAlert(data.message, DELETE_EVENT_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[deleteEvents]:err ", { err });
      handleResponseErrors(err, DELETE_EVENT_FAIL);
      dispatch({ type: DELETE_EVENT_FAIL });
    });
};
