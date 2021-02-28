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

  // -----
  GET_MEMBER_PROFILE,
  CLEAR_MEMBER_PROFILE,
  UPDATE_MEMBER_IMAGE,
  DELETE_MEMBER,

  SEND_PASSWORD_RESET_TOKEN,
  RESET_MEMBER_PASSWORD
 
} from '../_actions/types';
const initialState = {
  membersRequest: false,
  members: [],

  newMemberRequest: false,
  newMember: null,

  deleteMemberRequest: false,
  removedMember: null,

  editMemberRequest: false,
  updatedMember: null,

  toggleAdminRequest: false,
  roleStatus: null,

  // ----
  memberData: null,
  memberImage: null,
  deletedMember: null,
  passwordResetToken: null,
  passwordReset: null

};
export default function (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case GET_MEMBERS_REQUEST:
      return {
        ...state,
        membersRequest: true,
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        membersRequest: false,
        members: payload
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
    case RESET_MEMBER_DATA:
      return {
        ...state,
        newMember: null,
        updatedMember: null,
      }; 
    case DELETE_MEMBER_REQUEST:
      return {
        ...state,
        deleteMemberRequest: true
      }
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        deleteMemberRequest: false,
        removedMember: payload,
      }
    case DELETE_MEMBER_FAIL:
      return {
        ...state,
        deleteMemberRequest: false,
      }
    case EDIT_MEMBER_REQUEST:
      return {
        ...state,
        editMemberRequest: true
      }
    case EDIT_MEMBER_SUCCESS:
      return {
        ...state,
        editMemberRequest: false,
        updatedMember: payload,
      }
    case EDIT_MEMBER_FAIL:
      return {
        ...state,
        editMemberRequest: false,
      }
    case TOGGLE_ADMIN_REQUEST:
      return {
        ...state,
        toggleAdminRequest: true
      }
    case TOGGLE_ADMIN_SUCCESS:
      return {
        ...state,
        toggleAdminRequest: false,
        roleStatus: payload,
      }
    case TOGGLE_ADMIN_FAIL:
      return {
        ...state,
        toggleAdminRequest: false,
      }

    // ----
    case GET_MEMBER_PROFILE:
      return {
        ...state,
        memberData: payload
      };
    case CLEAR_MEMBER_PROFILE:
      return {
        ...state,
        memberData: null
      };
    case UPDATE_MEMBER_IMAGE:
      return {
        ...state,
        memberImage: payload
      };
    case DELETE_MEMBER:
      return {
        ...state,
        deletedMember: payload
      };
    case SEND_PASSWORD_RESET_TOKEN:
      return {
        ...state,
        passwordResetToken: payload
      };
    case RESET_MEMBER_PASSWORD:
      return {
        ...state,
        passwordReset: payload
      };
    
    default:
      return state;
  }
};