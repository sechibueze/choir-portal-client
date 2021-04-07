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
const initialState = {
  shilohSignupRequest: false,
  shilohSignup: null,

  shilohDataRequest: false,
  shilohData: null,

  shilohListRequest: false,
  shilohList: [],

  editShilohDataRequest: false,
  deleteShilohDataRequest: false,
  shilohDataDelta: null,
  shilohDataUpdate: null,
};
export default function shilohReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RESET_SHILOH_DATA:
      return {
        ...state,
        shilohDataDelta: null,
        shilohSignup: null,
        shilohDataUpdate: null,
      };
    case DELETE_SHILOH_FAIL:
      return {
        ...state,
        deleteShilohDataRequest: false,
      };
    case DELETE_SHILOH_REQUEST:
      return {
        ...state,
        deleteShilohDataRequest: true,
      };

    case DELETE_SHILOH_SUCCESS:
      return {
        ...state,
        shilohDataDelta: payload,
        deleteShilohDataRequest: false,
      };
    case EDIT_SHILOH_SUCCESS:
      return {
        ...state,
        shilohDataUpdate: payload,
        editShilohDataRequest: false,
      };
    case EDIT_SHILOH_FAIL:
      return {
        ...state,
        editShilohDataRequest: false,
      };
    case EDIT_SHILOH_REQUEST:
      return {
        ...state,
        shilohListRequest: true,
      };

    case SHILOH_LIST_SUCCESS:
      return {
        ...state,
        shilohList: payload,
        shilohListRequest: false,
      };
    case SHILOH_LIST_FAIL:
      return {
        ...state,
        shilohListRequest: false,
      };
    case SHILOH_LIST_REQUEST:
      return {
        ...state,
        shilohListRequest: true,
      };

    case SHILOH_DATA_SUCCESS:
      return {
        ...state,
        shilohData: payload,
        shilohDataRequest: false,
      };
    case SHILOH_DATA_FAIL:
      return {
        ...state,
        shilohDataRequest: false,
      };
    case SHILOH_DATA_REQUEST:
      return {
        ...state,
        shilohDataRequest: true,
      };

    case SHILOH_SIGNUP_SUCCESS:
      return {
        ...state,
        shilohSignup: payload,
        shilohSignupRequest: false,
      };
    case SHILOH_SIGNUP_FAIL:
      return {
        ...state,
        shilohSignupRequest: false,
      };
    case SHILOH_SIGNUP_REQUEST:
      return {
        ...state,
        shilohSignupRequest: true,
      };

    default:
      return state;
  }
}
