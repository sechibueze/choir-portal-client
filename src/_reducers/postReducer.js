import {
  RESET_POST,
  CREATE_POST_REQUEST,
  CREATE_POST_FAIL,
  CREATE_POST_SUCCESS,
  GET_POSTS_REQUEST,
  GET_POSTS_FAIL,
  GET_POSTS_SUCCESS,
  EDIT_POST_REQUEST,
  EDIT_POST_FAIL,
  EDIT_POST_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
} from "../_actions/types";

const initialState = {
  posts: [],
  postsRequest: false,

  newPost: null,
  newPostRequest: false,

  postItem: null,
  postItemRequest: false,

  editPostDataRequest: false,
  editPostData: null,

  noPostDataRequest: false,
  noPostData: null,
};

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESET_POST:
      return {
        ...state,
        postItem: null,
        editPostData: null,
        noPostData: null,
      };
    // Create Post
    case CREATE_POST_REQUEST:
      return {
        ...state,
        newPostRequest: true,
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        newPostRequest: false,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        newPostRequest: false,
        newPost: payload,
      };
    // Get Posts
    case GET_POSTS_REQUEST:
      return {
        ...state,
        postsRequest: true,
      };
    case GET_POSTS_FAIL:
      return {
        ...state,
        postsRequest: false,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        postsRequest: false,
        posts: payload,
      };
    // Delete Posts
    case DELETE_POST_REQUEST:
      return {
        ...state,
        noPostDataRequest: true,
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        noPostDataRequest: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        noPostDataRequest: false,
        noPostData: payload,
      };
    // Edit Posts
    case EDIT_POST_REQUEST:
      return {
        ...state,
        editPostDataRequest: true,
      };
    case EDIT_POST_FAIL:
      return {
        ...state,
        editPostDataRequest: false,
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        editPostDataRequest: false,
        editPostData: payload,
      };

    default:
      return state;
  }
}
