import {
  RESET_PROFILE_DATA,

  GET_PROFILES_FAIL,
  GET_PROFILES_REQUEST,
  GET_PROFILES_SUCCESS,

  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,

  ME_PROFILE_FAIL,
  ME_PROFILE_REQUEST,
  ME_PROFILE_SUCCESS,

  PERSONAL_DATA_FAIL,
  PERSONAL_DATA_SUCCESS,
  PERSONAL_DATA_REQUEST,

  NOK_DATA_FAIL,
  NOK_DATA_SUCCESS,
  NOK_DATA_REQUEST,

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
const initialState = {
  profiles: [],
  profilesRequest: false,

  profile: null,
  profileRequest: false,
  
  personaleData: null,
  personaleDataRequest: false,

  nokData: null,
  nokDataRequest: false,
  
  churchData: null,
  churchDataRequest: false,

  unitData: null,
  unitDataRequest: false,
  
  meProfileData: null,
  meProfileDataRequest: false,

  noProfileData: null,
  noProfileDataRequest: false,

};
export default function (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case RESET_PROFILE_DATA:
      return {
        ...state,
        personalData: null,
        nokData: null,
        churchData: null,
        unitData: null,
      };
    // Get Profiles
    case GET_PROFILES_REQUEST:
      return {
        ...state,
        profilesRequest: true
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profilesRequest: false,
        profiles: payload
      };
    case GET_PROFILES_FAIL:
      return {
        ...state,
        profilesRequest: false
      };
    // NOK data
    case NOK_DATA_REQUEST:
      return {
        ...state,
        nokDataRequest: true
      };
    case NOK_DATA_SUCCESS:
      return {
        ...state,
        nokDataRequest: false,
        nokData: payload
      };
    case NOK_DATA_FAIL:
      return {
        ...state,
        nokDataRequest: false
      };
    // Personal data
    case PERSONAL_DATA_REQUEST:
      return {
        ...state,
        personalDataRequest: true
      };
    case PERSONAL_DATA_SUCCESS:
      return {
        ...state,
        personalDataRequest: false,
        personalData: payload
      };
    case PERSONAL_DATA_FAIL:
      return {
        ...state,
        personalDataRequest: false,
      };
    // Church data
    case CHURCH_DATA_REQUEST:
      return {
        ...state,
       churchDataRequest: true
      };
    case CHURCH_DATA_SUCCESS:
      return {
        ...state,
       churchDataRequest: false,
       churchData: payload
      };
    case CHURCH_DATA_FAIL:
      return {
        ...state,
        churchDataRequest: false
      };
    // Unit data
    case UNIT_DATA_REQUEST:
      return {
        ...state,
       unitDataRequest: true
      };
    case UNIT_DATA_SUCCESS:
      return {
        ...state,
       unitDataRequest: false,
       unitData: payload
      };
    case UNIT_DATA_FAIL:
      return {
        ...state,
       unitDataRequest: false
      };
    // No Profile
    case DELETE_PROFILES_REQUEST:
      return {
        ...state,
        noProfileDataRequest: true
      };
    case DELETE_PROFILES_SUCCESS:
      return {
        ...state,
        noProfileDataRequest: false,
        noProfileData: payload
      };
    case DELETE_PROFILES_FAIL:
      return {
        ...state,
        noProfileDataRequest: false
      };
    // Me Profile
    case ME_PROFILE_REQUEST:
      return {
        ...state,
        meProfileDataRequest: true
      };
    case ME_PROFILE_SUCCESS:
      return {
        ...state,
        meProfileDataRequest: false,
        meProfileData: payload
      };
    case ME_PROFILE_FAIL:
      return {
        ...state,
        meProfileDataRequest: false
      };
    
    // Get Profile
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        profileRequest: true
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileRequest: false,
        profile: payload
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profileRequest: false
      };
    
    
    default:
      return state;
  }
};