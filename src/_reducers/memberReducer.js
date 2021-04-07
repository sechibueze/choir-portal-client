import {
  GET_MEMBERS_FAIL,
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  ADD_NEW_MEMBER_REQUEST,
  ADD_NEW_MEMBER_SUCCESS,
  ADD_NEW_MEMBER_FAIL,
  RESET_MEMBER_DATA,
  EDIT_MEMBER_REQUEST,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_FAIL,
  DELETE_MEMBER_FAIL,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  TOGGLE_ADMIN_FAIL,
  TOGGLE_ADMIN_REQUEST,
  TOGGLE_ADMIN_SUCCESS,
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
const initialState = {
  membersRequest: false,
  members: [],

  newMemberRequest: false,
  newMember: null,

  membersUploadRequest: false,
  membersUpload: null,

  deleteMemberRequest: false,
  removedMember: null,

  editMemberRequest: false,
  updatedMember: null,

  toggleAdminRequest: false,
  roleStatus: null,

  memberImageRequest: false,
  memberImageData: null,

  passwordTokenRequest: false,
  passwordToken: null,

  passwordResetRequest: false,
  passwordReset: null,
};
export default function memberReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESET_MEMBER_DATA:
      return {
        ...state,
        newMember: null,
        updatedMember: null,
        membersUpload: null,
      };
    case GET_MEMBERS_REQUEST:
      return {
        ...state,
        membersRequest: true,
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        membersRequest: false,
        members: payload,
      };
    case GET_MEMBERS_FAIL:
      return {
        ...state,
        membersRequest: false,
      };

    case ADD_NEW_MEMBER_REQUEST:
      return {
        ...state,
        newMemberRequest: true,
      };
    case ADD_NEW_MEMBER_SUCCESS:
      return {
        ...state,
        newMemberRequest: false,
        newMember: payload,
      };
    case ADD_NEW_MEMBER_FAIL:
      return {
        ...state,
        newMemberRequest: false,
      };

    case DELETE_MEMBER_REQUEST:
      return {
        ...state,
        deleteMemberRequest: true,
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        deleteMemberRequest: false,
        removedMember: payload,
      };
    case DELETE_MEMBER_FAIL:
      return {
        ...state,
        deleteMemberRequest: false,
      };
    case EDIT_MEMBER_REQUEST:
      return {
        ...state,
        editMemberRequest: true,
      };
    case EDIT_MEMBER_SUCCESS:
      return {
        ...state,
        editMemberRequest: false,
        updatedMember: payload,
      };
    case EDIT_MEMBER_FAIL:
      return {
        ...state,
        editMemberRequest: false,
      };

    case MEMBERS_UPLOAD_REQUEST:
      return {
        ...state,
        membersUploadRequest: true,
      };
    case MEMBERS_UPLOAD_SUCCESS:
      return {
        ...state,
        membersUploadRequest: false,
        membersUpload: payload,
      };
    case MEMBERS_UPLOAD_FAIL:
      return {
        ...state,
        membersUploadRequest: false,
      };
    case TOGGLE_ADMIN_REQUEST:
      return {
        ...state,
        toggleAdminRequest: true,
      };
    case TOGGLE_ADMIN_SUCCESS:
      return {
        ...state,
        toggleAdminRequest: false,
        roleStatus: payload,
      };
    case TOGGLE_ADMIN_FAIL:
      return {
        ...state,
        toggleAdminRequest: false,
      };

    case MEMBER_IMAGE_SUCCESS:
      return {
        ...state,
        memberImageData: payload,
        memberImageRequest: false,
      };
    case MEMBER_IMAGE_REQUEST:
      return {
        ...state,
        memberImageRequest: true,
      };
    case MEMBER_IMAGE_FAIL:
      return {
        ...state,
        memberImageRequest: false,
      };

    // Password Token request
    case PASSWORD_TOKEN_REQUEST:
      return {
        ...state,
        passwordTokenRequest: true,
      };
    case PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        passwordTokenRequest: false,
        passwordToken: payload,
      };
    case PASSWORD_TOKEN_FAIL:
      return {
        ...state,
        passwordTokenRequest: false,
      };
    // Password Reset request
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        passwordResetRequest: true,
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        passwordResetRequest: false,
        passwordReset: payload,
      };
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        passwordResetRequest: false,
      };

    default:
      return state;
  }
}
