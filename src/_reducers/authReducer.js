import { AUTH_TOKEN } from '../constants';
import {
  LOADING,
  LOADED,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  LOAD_CURRENT_MEMBER_FAIL,
  LOAD_CURRENT_MEMBER_REQUEST,
  LOAD_CURRENT_MEMBER_SUCCESS,

  LOGOUT,

  GET_ACCESS,
  ADD_ACCESS,
  DELETE_ACCESS,
  UPLOAD_ACCESS,
  FLUSH_ACCESS_LIST,
  RESET_ACCESS_DATA,


} from '../_actions/types';
const initialState = {
  token: null,
  isAuthenticated: null,
  currentMember: null,
  loading: false,

  loginRequest: false,
  currentMemberRequest: false,

  accessList: [],
  newAccess: null,
  updatedAccess: null,
  deleteAccess: null,
  updatedAccessList: null,
  newAccessUpload: null,
};
export default function (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginRequest: true
      }
    case LOAD_CURRENT_MEMBER_REQUEST:
      return {
        ...state,
        currentMemberRequest: true
      }
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginRequest: false,
        token: payload,
        isAuthenticated: true
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOAD_CURRENT_MEMBER_FAIL:
    case LOGOUT:
      localStorage.removeItem(AUTH_TOKEN);
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: null,
        loginRequest: false,
        currentMemberRequest: false,
        currentMember: null
      };
    case LOAD_CURRENT_MEMBER_SUCCESS:
      return {
        ...state,
        currentMember: payload,
        currentMemberRequest: false,
        isAuthenticated: Object.values(payload).length > 0
      };
    case GET_ACCESS:
      return {
        ...state,
        accessList: payload, 
      };
    case UPLOAD_ACCESS:
      return {
        ...state,
        newAccessUpload: payload, 
      };
    case ADD_ACCESS:
      return {
        ...state,
        newAccess: payload, 
      };
    case FLUSH_ACCESS_LIST:
    case DELETE_ACCESS:
      return {
        ...state,
        updatedAccessList: payload, 
      };
    case RESET_ACCESS_DATA:
      return {
        ...state,
        newAccessUpload: null,
        newAccess: null,
        updatedAccess: null
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOADED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};