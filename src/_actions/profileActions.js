import axios from 'axios';
import { BACKEND_URL } from '../constants';
import {
  RESET_PROFILE_DATA,

  GET_PROFILES_FAIL,
  GET_PROFILES_REQUEST,
  GET_PROFILES_SUCCESS,

  // GET_PROFILE_REQUEST,
  // GET_PROFILE_SUCCESS,
  // GET_PROFILE_FAIL,

  ME_PROFILE_REQUEST,
  ME_PROFILE_SUCCESS,
  ME_PROFILE_FAIL,

  PERSONAL_DATA_FAIL,
  PERSONAL_DATA_SUCCESS,
  PERSONAL_DATA_REQUEST,

  NOK_DATA_REQUEST,
  NOK_DATA_SUCCESS,
  NOK_DATA_FAIL,

  CHURCH_DATA_FAIL,
  CHURCH_DATA_SUCCESS,
  CHURCH_DATA_REQUEST,

  UNIT_DATA_FAIL,
  UNIT_DATA_SUCCESS,
  UNIT_DATA_REQUEST,

  DELETE_PROFILES_FAIL,
  DELETE_PROFILES_SUCCESS,
  DELETE_PROFILES_REQUEST,
} from '../_actions/types';

import { handleResponseErrors, setAlert } from './alertActions';
import { getConfigHeaders } from './authActions';

export const createProfile = data => dispatch => {
  dispatch({ type: PERSONAL_DATA_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/profiles`;
  axios.post(uri, data, configHeaders)
    .then(({ data }) => {
      console.log(' createProfile ] data', data)
      dispatch({ type: PERSONAL_DATA_SUCCESS, payload: data.data });
      dispatch(setAlert("Profile created/updated", PERSONAL_DATA_SUCCESS, "success"));
     
    })
    .catch(err => {
      console.log(' createProfile ] error', { err })
      dispatch(handleResponseErrors(err, PERSONAL_DATA_FAIL));
      dispatch({ type: PERSONAL_DATA_FAIL })
    });
};

export const getProfiles = () => dispatch => {
  dispatch({ type: GET_PROFILES_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/profiles`;
  axios.get(uri, configHeaders)
    .then(({ data }) => {
      console.log('[getProfiles ] data', data)
      dispatch({ type: GET_PROFILES_SUCCESS, payload: data.data });
      dispatch(setAlert("Profile data here", GET_PROFILES_SUCCESS, "success"));
     
    })
    .catch(err => {
      console.log('[getProfiles ] error', { err })
      dispatch(handleResponseErrors(err, GET_PROFILES_FAIL));
      dispatch({type: GET_PROFILES_FAIL})
    });
};
export const meProfile = (_id = "") => dispatch => {
  dispatch({ type: ME_PROFILE_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = _id ? `${BACKEND_URL}/api/profiles/${_id}` : `${BACKEND_URL}/api/profiles/me`;
  console.log("uri meProfile", uri)
  axios.get(uri, configHeaders)
    .then(({ data }) => {
      console.log('[meProfile ] data', data)
      dispatch({ type: ME_PROFILE_SUCCESS, payload: data.data });
      dispatch(setAlert("Profile data here", ME_PROFILE_SUCCESS, "success"));
     
    })
    .catch(err => {
      console.log('[meProfile ] error', { err })
      dispatch(handleResponseErrors(err, ME_PROFILE_FAIL));
      dispatch({ type: ME_PROFILE_FAIL })
    });
};

export const updateNOKData = nokInfo => dispatch => {
  dispatch({ type: NOK_DATA_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${ BACKEND_URL }/api/profiles/nok`;
  axios.put(uri, nokInfo, configHeaders)
    .then(({ data }) => {
      console.log('[updateNOKInfo] data', data)
      dispatch({ type: NOK_DATA_SUCCESS, payload: data.data });
      dispatch(setAlert(data.message , NOK_DATA_SUCCESS, "success"));
    })
    .catch(err => {
      console.log('[updateNOKInfo ] err ', {err})
      dispatch(handleResponseErrors(err, NOK_DATA_FAIL));
      dispatch({ type: NOK_DATA_FAIL });
    });
};

export const updateChurchData = churchInfo => dispatch => {
  dispatch({ type: CHURCH_DATA_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/profiles/churchinfo`;
  axios.put(uri, churchInfo, configHeaders)
    .then(({ data }) => {
      console.log('[updateChurchData]data ', data)
      dispatch({ type: CHURCH_DATA_SUCCESS, payload: data.data });
      dispatch(setAlert(data.message, CHURCH_DATA_SUCCESS, "success"));
    })
    .catch(err => {
      console.log('[updateChurchData] err', {err})
      dispatch(handleResponseErrors(err, CHURCH_DATA_FAIL));
      dispatch(setAlert(err.message, CHURCH_DATA_FAIL))
    });
};

export const updateUnitData = unitInfo => dispatch => {
  dispatch({ type: UNIT_DATA_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/profiles/unitinfo`;
  axios.put(uri, unitInfo, configHeaders)
    .then(({ data }) => {
      console.log('[updateUnitData]-data', data)
      dispatch({ type: UNIT_DATA_SUCCESS, payload: data.data });
      dispatch(setAlert(data.message, UNIT_DATA_SUCCESS, "success"));
    })
    .catch(err => {
      console.log('[updateUnitData] error ', {err})
      dispatch(handleResponseErrors(err, UNIT_DATA_FAIL));
      dispatch(setAlert(err.message, UNIT_DATA_FAIL))
    });
};

export const deleteProfiles = (deleteList) => dispatch => {
  dispatch({ type: DELETE_PROFILES_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/profiles`;
  axios.put(uri, deleteList, configHeaders)
    .then(({ data }) => {
      console.info("[deleteProfiles]: data", data)
      dispatch({ type: DELETE_PROFILES_SUCCESS , payload: data.data });
      dispatch(setAlert("Profile deleted", DELETE_PROFILES_SUCCESS, "success"));
    })
    .catch(err => {
      console.info("[deleteProfiles]: err", { err })
      dispatch(handleResponseErrors(err, DELETE_PROFILES_FAIL));
      dispatch({ type: DELETE_PROFILES_FAIL })
    });
};

export const resetProfileData = () => dispatch => {
  dispatch({ type: RESET_PROFILE_DATA })
}
// export const updateAuthData = authData => dispatch => {
//   dispatch({ type: LOADING });
//   const configHeaders = getConfigHeaders();
//   axios.put('/api/members', authData, configHeaders)
//     .then(({ data }) => {
//       console.log('UDATEED member profile ', data)
//       dispatch({ type: UPDATE_AUTH_DATA, payload: data.data });
//       dispatch({ type: LOADED });
//     })
//     .catch(err => {
//       console.log('Error in loading currently logged in member profile ', err)
//       dispatch(handleResponseErrors(err, 'AUTH_DATA_UPDATE'));
//     });
// };

// // Create and Update
// export const updateMemberProfile = (profileData, update=true) => dispatch => {
//   dispatch({ type: LOADING });
//   const configHeaders = getConfigHeaders();
//   axios.post('/api/profiles', profileData, configHeaders)
//     .then(({ data }) => {
//       // console.log('updateMemberProfile Data ', data)
//       dispatch({ type: update ?  UPDATE_MEMBER_PROFILE : CREATE_MEMBER_PROFILE , payload: data.data });
//       dispatch({ type: LOADED });
//     })
//     .catch(err => {
//       console.log('Err ', err)
//       dispatch(handleResponseErrors(err, 'PROFILE_ERROR'));
//     });
// };

// // Delete profile
// // DELETE /api/profiles/me


