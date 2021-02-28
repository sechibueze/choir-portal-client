import axios from 'axios';
import {
  LOADING,
  LOADED,
  SIGNUP_SUCCESS,
  // SIGNUP_FAIL,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  // SET_ALERT,
  LOGOUT,
  GET_ACCESS,
  UPLOAD_ACCESS,
  ADD_ACCESS,
  RESET_ACCESS_DATA,
  DELETE_ACCESS,
  FLUSH_ACCESS_LIST,
  LOAD_CURRENT_MEMBER_SUCCESS,
  LOAD_CURRENT_MEMBER_REQUEST,
  LOAD_CURRENT_MEMBER_FAIL,
} from './types';
import { handleResponseErrors, setAlert } from './alertActions';
import { BACKEND_URL, AUTH_TOKEN } from '../constants';
import validateAuthToken from '../_utils/validateAuthToken';

export const getRequestConfig = (method="GET", body = null ) => {
  let requestConfig = {
      method: method,
      headers: {
        'Content-Type':'application/json'
      }
    };

    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      requestConfig.headers['x-auth-token'] = token;
    }
    if(body){
      requestConfig["body"] = JSON.stringify(body)
    }
    return requestConfig;
};

export const getConfigHeaders = ( type = 'application/json') => {
  let configHeaders = {
    headers: {
      "Content-Type": type
    }
  }
  const token = validateAuthToken();
  if (token) {
    configHeaders.headers['x-auth-token'] = token;
  }
  return configHeaders;

};
// lightworthng@gmail.com
export const getAccessToken = ( type = 'application/json') => {
  let configHeaders = {
    headers: {
      "Content-Type": type
    }
  }
  const access = localStorage.getItem('access');
  if (access) {
    configHeaders.headers['x-auth-access'] = access;
  }
  return configHeaders;

}

export const loadCurrentMember = () => dispatch => {
  dispatch({ type: LOAD_CURRENT_MEMBER_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/members/auth`;
  axios.get(uri, configHeaders)
    .then(({ data }) => {
      console.log('[loadCurrentMember]: data ', data)
      dispatch({ type: LOAD_CURRENT_MEMBER_SUCCESS, payload: data.data });
    })
    .catch(err => {
      console.log('[loadCurrentMember]: error ', {err})
      dispatch({ type: LOAD_CURRENT_MEMBER_FAIL})
      // dispatch(handleResponseErrors(err, 'AUTH'));
    });
};

export const registerMember = memberData => dispatch => {
  dispatch({ type: LOADING });

  axios.post('/api/members', memberData)
    .then(({ data }) => {
      localStorage.setItem('token', data.token);

      dispatch(loadCurrentMember());

      dispatch({ type: SIGNUP_SUCCESS, payload: data.token });
    })
    .catch(err => {
      console.log('Err ', err)
      dispatch(handleResponseErrors(err, 'SIGNUP'));
      dispatch({ type: LOADED });
    });
};

export const loginMember = memberLogin => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  const uri = `${BACKEND_URL}/api/members/login`;
  axios.post(uri, memberLogin)
    .then(({ data }) => {
      console.log('[loginMember]:Data ', data)
      localStorage.setItem(AUTH_TOKEN, data.token);
      dispatch(loadCurrentMember());
      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    })
    .catch(err => {
      console.log('[loginMember]:Error ', { err })
      dispatch({ type: LOGIN_FAIL })
      if (err.response) {
        // Server Error
        return dispatch(setAlert(err.response.data.message, LOGIN_FAIL))
      }
      if (!err.response && !window.navigator.onLine) {
        //Check internet connectivity
        return dispatch(setAlert("Check your newtwork", LOGIN_FAIL))
      }
      // Netwoek error
      return dispatch(setAlert(err.message, LOGIN_FAIL))
    });
};

export const verifyAccessId = (accessId, history) => dispatch => {
  dispatch({ type: LOADING });

  axios.post('/api/allowlist/verify', accessId)
    .then(({ data }) => {

      if (history) history.push(`/signup/${data.data.id}`);
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'VERIFY_ACCESS_ID'));
      dispatch({ type: LOADED });
    });
};

export const getAccessList = () => dispatch => {
  dispatch({ type: LOADING });

  axios.get('/api/allowlist')
    .then(({ data }) => {

      dispatch({
        type: GET_ACCESS,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'GET_ACCESS_LIST'));
      dispatch({ type: LOADED });
    });
};

export const uploadAccessList = (fd) => dispatch => {
  dispatch({ type: LOADING });

  const config = getConfigHeaders('multipart/form-data');

  axios.post('/api/allowlist', fd, config)
    .then(({ data }) => {
      dispatch({
        type: UPLOAD_ACCESS,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'UPLOAD_ACCESS_LIST'));
      dispatch({ type: LOADED });
    });
};

export const flushAccessList = () => dispatch => {
  dispatch({ type: LOADING });

  const config = getConfigHeaders();

  axios.delete('/api/allowlist', config)
    .then(({ data }) => {
      dispatch({
        type: FLUSH_ACCESS_LIST ,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'FLUSH_ACCESS_LIST'));
      dispatch({ type: LOADED });
    });
};

export const addAccess = accessData => dispatch => {
  dispatch({ type: LOADING });

  const config = getConfigHeaders();

  axios.put(`/api/allowlist`, accessData, config)
    .then(({ data }) => {
      dispatch({
        type: ADD_ACCESS ,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'ADD_ACCESS'));
      dispatch({ type: LOADED });
    });
};
export const deleteAccessById = id => dispatch => {
  dispatch({ type: LOADING });

  const config = getConfigHeaders();

  axios.delete(`/api/allowlist/${ id }`, config)
    .then(({ data }) => {
      dispatch({
        type: DELETE_ACCESS ,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'DELETE_ACCESS'));
      dispatch({ type: LOADED });
    });
};

export const resetAccessData = () => dispatch => {
  dispatch({ type: RESET_ACCESS_DATA });
};
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};