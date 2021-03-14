import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  GET_EVENT_FAIL,
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  GET_EVENTS_FAIL,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_REQUEST,
  UPLOAD_ATTENDANCE_FAIL,
  UPLOAD_ATTENDANCE_REQUEST,
  UPLOAD_ATTENDANCE_SUCCESS,
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_FAIL,
  GET_ACTIVITY_SUCCESS,
} from "../_actions/types";
const initialState = {
  eventsRequest: false,
  events: [],

  activity: [],
  activityRequest: false,

  newEventRequest: false,
  newEvent: null,

  singleEvent: null,
  singleEventRequest: false,

  noEventDataRequest: false,
  noEventData: null,

  newAttendanceRequest: false,
  newAttendance: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENTS_REQUEST:
      return {
        ...state,
        eventsRequest: true,
      };
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: payload,
        eventsRequest: false,
      };
    case GET_EVENTS_FAIL:
      return {
        ...state,
        eventsRequest: false,
      };
    // Single event
    case GET_EVENT_REQUEST:
      return {
        ...state,
        singleEventRequest: true,
      };
    case GET_EVENT_SUCCESS:
      return {
        ...state,
        singleEvent: payload,
        singleEventRequest: false,
      };
    case GET_EVENT_FAIL:
      return {
        ...state,
        singleEventRequest: false,
      };
    // Create events
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        newEventRequest: true,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        newEvent: payload,
        newEventRequest: false,
      };
    case CREATE_EVENT_FAIL:
      return {
        ...state,
        newEventRequest: false,
      };
    // Attendance events
    case UPLOAD_ATTENDANCE_REQUEST:
      return {
        ...state,
        newAttendanceRequest: true,
      };
    case UPLOAD_ATTENDANCE_SUCCESS:
      return {
        ...state,
        newAttendance: payload,
        newAttendanceRequest: false,
      };
    case UPLOAD_ATTENDANCE_FAIL:
      return {
        ...state,
        newAttendanceRequest: false,
      };
    // Delete events
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        noEventDataRequest: true,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        noEventData: payload,
        noEventDataRequest: false,
      };
    case DELETE_EVENT_FAIL:
      return {
        ...state,
        noEventDataRequest: false,
      };
    // Get activity request
    case GET_ACTIVITY_REQUEST:
      return {
        ...state,
        activityRequest: true,
      };
    case GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        activity: payload,
        activityRequest: false,
      };
    case GET_ACTIVITY_FAIL:
      return {
        ...state,
        activityRequest: false,
      };

    default:
      return state;
  }
}
