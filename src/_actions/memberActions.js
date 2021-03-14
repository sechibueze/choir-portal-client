import axios from "axios";
import {
  GET_MEMBERS_FAIL,
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  EDIT_MEMBER_REQUEST,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_FAIL,
  DELETE_MEMBER_FAIL,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  TOGGLE_ADMIN_FAIL,
  TOGGLE_ADMIN_REQUEST,
  TOGGLE_ADMIN_SUCCESS,
  ADD_NEW_MEMBER_FAIL,
  ADD_NEW_MEMBER_SUCCESS,
  ADD_NEW_MEMBER_REQUEST,
  RESET_MEMBER_DATA,
  MEMBERS_UPLOAD_FAIL,
  MEMBERS_UPLOAD_REQUEST,
  MEMBERS_UPLOAD_SUCCESS,
  MEMBER_IMAGE_FAIL,
  MEMBER_IMAGE_REQUEST,
  MEMBER_IMAGE_SUCCESS,
  PASSWORD_TOKEN_REQUEST,
  PASSWORD_TOKEN_FAIL,
  PASSWORD_TOKEN_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
} from "../_actions/types";
import { handleResponseErrors, setAlert } from "./alertActions";
import { getConfigHeaders } from "./authActions";
import { BACKEND_URL } from "../constants";

export const getMembers = () => (dispatch) => {
  dispatch({ type: GET_MEMBERS_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/members`;
  axios
    .get(uri, configHeaders)
    .then(({ data }) => {
      console.log("[loadMembers]data ", data);
      dispatch({ type: GET_MEMBERS_SUCCESS, payload: data.data });
    })
    .catch((err) => {
      console.log("[loadMembers] error", { err });
      dispatch({ type: GET_MEMBERS_FAIL });
      dispatch(handleResponseErrors(err, GET_MEMBERS_FAIL));
    });
};

export const addNewMember = (newMemberData) => (dispatch) => {
  dispatch({ type: ADD_NEW_MEMBER_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/members`;
  axios
    .post(uri, newMemberData, configHeaders)
    .then(({ data }) => {
      console.log("[addNewMember]data ", data);
      dispatch({ type: ADD_NEW_MEMBER_SUCCESS, payload: data.data });
      dispatch(
        setAlert("New member added", ADD_NEW_MEMBER_SUCCESS, "success", 10000)
      );
    })
    .catch((err) => {
      console.log("[addNewMember] error", { err });
      dispatch(handleResponseErrors(err, ADD_NEW_MEMBER_FAIL));
      dispatch({ type: ADD_NEW_MEMBER_FAIL });
    });
};

export const uploadMembers = (fd) => (dispatch) => {
  dispatch({ type: MEMBERS_UPLOAD_REQUEST });
  const configHeaders = getConfigHeaders("multipart/form-data");
  const uri = `${BACKEND_URL}/api/members/uploads`;
  axios
    .post(uri, fd, configHeaders)
    .then(({ data }) => {
      console.log("[uploadMembers]data ", data);
      dispatch({ type: MEMBERS_UPLOAD_SUCCESS, payload: data.data });
      dispatch(
        setAlert("New members uploaded", MEMBERS_UPLOAD_SUCCESS, "success")
      );
    })
    .catch((err) => {
      console.log("[uploadMembers] error", { err });
      dispatch(handleResponseErrors(err, MEMBERS_UPLOAD_FAIL));
      dispatch({ type: MEMBERS_UPLOAD_FAIL });
    });
};

export const editMember = (newMemberData) => (dispatch) => {
  dispatch({ type: EDIT_MEMBER_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/members`;
  axios
    .put(uri, newMemberData, configHeaders)
    .then(({ data }) => {
      console.log("[editMember]data ", data);
      dispatch({ type: EDIT_MEMBER_SUCCESS, payload: data.data });
      dispatch(setAlert("Member updated", EDIT_MEMBER_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[editMember] error", { err });
      dispatch(handleResponseErrors(err, EDIT_MEMBER_FAIL));
      dispatch({ type: EDIT_MEMBER_FAIL });
    });
};

export const toggleAdminRole = (memberData) => (dispatch) => {
  dispatch({ type: TOGGLE_ADMIN_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/members/admin`;
  axios
    .put(uri, memberData, configHeaders)
    .then(({ data }) => {
      console.log("[toggleAdminRole]:data ", data);
      dispatch({ type: TOGGLE_ADMIN_SUCCESS, payload: data.data });
      dispatch(
        setAlert(
          "Members role has been changed",
          TOGGLE_ADMIN_SUCCESS,
          "success"
        )
      );
    })
    .catch((err) => {
      console.log("[toggleAdminRole]:error ", { err });
      dispatch(handleResponseErrors(err, TOGGLE_ADMIN_FAIL));
      dispatch({ type: TOGGLE_ADMIN_FAIL });
    });
};

export const deleteMembers = (memberData) => (dispatch) => {
  dispatch({ type: DELETE_MEMBER_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/members/delete`;
  console.log("[deleteMembers]:payload ", memberData);
  axios
    .put(uri, memberData, configHeaders)
    .then(({ data }) => {
      console.log("[deleteMembers]:data ", data);
      dispatch({ type: DELETE_MEMBER_SUCCESS, payload: data.data });
      dispatch(setAlert("Members deleted", DELETE_MEMBER_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[deleteMembers]:error ", { err });
      dispatch(handleResponseErrors(err, DELETE_MEMBER_FAIL));
    });
};

export const updateMemberImage = (imageData) => (dispatch) => {
  dispatch({ type: MEMBER_IMAGE_REQUEST });
  const configHeaders = getConfigHeaders("multipart/form-data");
  const uri = `${BACKEND_URL}/api/members/image`;
  axios
    .put(uri, imageData, configHeaders)
    .then(({ data }) => {
      console.info("[updateMemberImage]:data", data);
      dispatch({ type: MEMBER_IMAGE_SUCCESS, payload: data.data });
      dispatch(setAlert(data.message, MEMBER_IMAGE_SUCCESS, "success"));
    })
    .catch((err) => {
      console.info("[updateMemberImage]:error", { err });
      dispatch(handleResponseErrors(err, MEMBER_IMAGE_FAIL));
      dispatch({ type: MEMBER_IMAGE_FAIL });
    });
};

export const resetMemberData = () => (dispatch) => {
  dispatch({ type: RESET_MEMBER_DATA });
};

// -------------------------------------------------------------------------------------------
// export const loadProfileByMemberId = memberId => dispatch => {
//   dispatch({ type: LOADING });
//   const configHeaders = getConfigHeaders();
//   // localhost:5000/api/profiles/members/5edcbc05c66bd7109c75f07d/
//   axios.get(`/api/profiles/members/${memberId}`, configHeaders)
//     .then(({ data }) => {
//       console.log('Loaded members ', data)
//       dispatch({ type: GET_MEMBER_PROFILE, payload: data.data });
//       dispatch({ type: LOADED });
//     })
//     .catch(err => {
//       console.log('Error iin loading members', err)
//       dispatch(handleResponseErrors(err, 'PROFILE'));
//     });
// };
// export const clearMemberProfile = () => dispatch => {
//   dispatch({ type: CLEAR_MEMBER_PROFILE });
// };

export const sendPasswordResetToken = (data) => (dispatch) => {
  dispatch({ type: PASSWORD_TOKEN_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/members/forgotpassword`;
  axios
    .put(uri, data, configHeaders)
    .then(({ data }) => {
      console.log("[sendPasswordResetToken]:data ", data);
      dispatch({ type: PASSWORD_TOKEN_SUCCESS, payload: data });
      dispatch(setAlert(data.message, PASSWORD_TOKEN_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[sendPasswordResetToken]:error ", { err });
      dispatch(handleResponseErrors(err, PASSWORD_TOKEN_FAIL));
      dispatch({ type: PASSWORD_TOKEN_FAIL });
    });
};

export const resetMemberPassword = (data, history = "") => (dispatch) => {
  dispatch({ type: PASSWORD_RESET_REQUEST });
  const configHeaders = getConfigHeaders();
  // localhost:5000/api/members/forgotpassword
  const uri = `${BACKEND_URL}/api/members/resetpassword`;
  axios
    .put(uri, data, configHeaders)
    .then(({ data }) => {
      dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data });
      dispatch(setAlert(data.message, PASSWORD_RESET_SUCCESS, "success"));
      if (history) {
        history.push("/login");
      }
    })
    .catch((err) => {
      dispatch(handleResponseErrors(err, PASSWORD_RESET_FAIL));
      dispatch({ type: PASSWORD_RESET_FAIL });
    });
};

// export const deleteMemberById = memberId => dispatch => {
//   dispatch({ type: LOADING });
//   const configHeaders = getConfigHeaders();
//   axios.delete(`/api/members/${ memberId}`, configHeaders)
//     .then(({ data }) => {
//       console.log('Currently logged in member profile ', data)
//       dispatch({ type: DELETE_MEMBER, payload: data.data });
//       dispatch({ type: LOADED });
//     })
//     .catch(err => {
//       console.log('Error in loading currently logged in member profile ', err)
//       dispatch(handleResponseErrors(err, 'DELETE_MEMBER'));
//     });
// };
