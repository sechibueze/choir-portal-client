import { AUTH_TOKEN } from "../constants";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_CURRENT_MEMBER_FAIL,
  LOAD_CURRENT_MEMBER_REQUEST,
  LOAD_CURRENT_MEMBER_SUCCESS,
  LOGOUT,
} from "../_actions/types";
const initialState = {
  token: null,
  isAuthenticated: null,
  currentMember: null,
  loading: false,

  loginRequest: false,
  signupRequest: false,
  currentMemberRequest: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginRequest: true,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        signupRequest: true,
      };
    case LOAD_CURRENT_MEMBER_REQUEST:
      return {
        ...state,
        currentMemberRequest: true,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginRequest: false,
        signupRequest: false,
        token: payload,
        isAuthenticated: true,
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
        currentMember: null,
      };
    case LOAD_CURRENT_MEMBER_SUCCESS:
      return {
        ...state,
        currentMember: payload,
        currentMemberRequest: false,
        isAuthenticated: Object.values(payload).length > 0,
      };

    default:
      return state;
  }
}
