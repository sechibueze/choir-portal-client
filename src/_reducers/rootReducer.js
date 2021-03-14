import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import memberReducer from "./memberReducer";
import profilesReducer from "./profilesReducer";
import eventReducer from "./eventReducers";
// import postReducer from './postReducer';
// import shilohReducer from './shilohReducer';
export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  profiles: profilesReducer,
  members: memberReducer,
  events: eventReducer,
  // admin: adminReducer,
  // posts: postReducer,
  // shiloh: shilohReducer
});
