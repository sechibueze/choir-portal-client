import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,

  // SET_ALERT,
  LOGOUT,
  LOAD_CURRENT_MEMBER_SUCCESS,
  LOAD_CURRENT_MEMBER_REQUEST,
  LOAD_CURRENT_MEMBER_FAIL,
} from "./types";
import { handleResponseErrors, setAlert } from "./alertActions";
import { BACKEND_URL, AUTH_TOKEN } from "../constants";
import validateAuthToken from "../_utils/validateAuthToken";

export const getRequestConfig = (method = "GET", body = null) => {
  let requestConfig = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    requestConfig.headers["x-auth-token"] = token;
  }
  if (body) {
    requestConfig["body"] = JSON.stringify(body);
  }
  return requestConfig;
};

export const getConfigHeaders = (type = "application/json") => {
  let configHeaders = {
    headers: {
      "Content-Type": type,
    },
  };
  const token = validateAuthToken();
  if (token) {
    configHeaders.headers["x-auth-token"] = token;
  }
  return configHeaders;
};
// lightworthng@gmail.com
export const getAccessToken = (type = "application/json") => {
  let configHeaders = {
    headers: {
      "Content-Type": type,
    },
  };
  const access = localStorage.getItem("access");
  if (access) {
    configHeaders.headers["x-auth-access"] = access;
  }
  return configHeaders;
};

export const loadCurrentMember = () => (dispatch) => {
  dispatch({ type: LOAD_CURRENT_MEMBER_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/members/auth`;
  axios
    .get(uri, configHeaders)
    .then(({ data }) => {
      console.log("[loadCurrentMember]: data ", data);
      dispatch({ type: LOAD_CURRENT_MEMBER_SUCCESS, payload: data.data });
    })
    .catch((err) => {
      console.log("[loadCurrentMember]: error ", { err });
      dispatch({ type: LOAD_CURRENT_MEMBER_FAIL });
      dispatch(handleResponseErrors(err, LOAD_CURRENT_MEMBER_FAIL));
    });
};

export const registerMember = (memberData) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  const uri = `${BACKEND_URL}/api/members`;
  axios
    .post(uri, memberData)
    .then(({ data }) => {
      localStorage.setItem(AUTH_TOKEN, data.token);

      dispatch(loadCurrentMember());

      dispatch({ type: SIGNUP_SUCCESS, payload: data.token });
    })
    .catch((err) => {
      console.log("registerMember ", { err });
      dispatch(handleResponseErrors(err, SIGNUP_FAIL));
      dispatch({ type: SIGNUP_FAIL });
    });
};

export const loginMember = (memberLogin) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const uri = `${BACKEND_URL}/api/members/login`;
  axios
    .post(uri, memberLogin)
    .then(({ data }) => {
      console.log("[loginMember]:Data ", data);
      localStorage.setItem(AUTH_TOKEN, data.token);
      dispatch(loadCurrentMember());
      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    })
    .catch((err) => {
      console.log("[loginMember]:Error ", { err });
      dispatch({ type: LOGIN_FAIL });
      if (err.response) {
        // Server Error
        return dispatch(setAlert(err.response.data.message, LOGIN_FAIL));
      }
      if (!err.response && !window.navigator.onLine) {
        //Check internet connectivity
        return dispatch(setAlert("Check your newtwork", LOGIN_FAIL));
      }
      // Netwoek error
      return dispatch(setAlert(err.message, LOGIN_FAIL));
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
