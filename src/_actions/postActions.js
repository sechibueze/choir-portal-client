import axios from "axios";
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
} from "./types";
import { getConfigHeaders } from "./authActions";
import { setAlert, handleResponseErrors } from "./alertActions";
import { BACKEND_URL } from "../constants";

// Get ALl Posts [ with filter ]
export const getPosts = (opts = {}) => (dispatch) => {
  dispatch({ type: GET_POSTS_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = new URL(`${BACKEND_URL}/api/posts`);
  let queryString = "";
  if (Object.keys(opts).length > 0) queryString = uri.searchParams;
  const { id, count } = opts;
  if (id) queryString.append("id", id);
  if (count) queryString.append("count", count);
  uri.search = queryString.toString();
  console.log("getposts uri", uri, uri.toString());
  axios
    .get(uri, configHeaders)
    .then(({ data }) => {
      console.log("[getPosts ]:data", data);
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log("[getPosts ]:err", { err });
      handleResponseErrors(err, GET_POSTS_FAIL);
      dispatch({ type: GET_POSTS_FAIL });
    });
};

// Create new post
export const createPost = (post) => (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/posts`;
  axios
    .post(uri, post, configHeaders)
    .then(({ data }) => {
      console.log("[createPost ]:data", data);
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: data.data,
      });
      dispatch(setAlert(data.message, CREATE_POST_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[createPost ]:err", { err });
      handleResponseErrors(err, CREATE_POST_FAIL);
      dispatch({ type: CREATE_POST_FAIL });
    });
};
//Edit post
export const editPost = (post) => (dispatch) => {
  dispatch({ type: EDIT_POST_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/posts`;
  axios
    .put(uri, post, configHeaders)
    .then(({ data }) => {
      console.log("[editPost ]:data", data);
      dispatch({
        type: EDIT_POST_SUCCESS,
        payload: data.data,
      });
      dispatch(setAlert(data.message, EDIT_POST_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[editPost ]:err", { err });
      handleResponseErrors(err, EDIT_POST_FAIL);
      dispatch({ type: EDIT_POST_FAIL });
    });
};
// Delete post
export const deletePosts = (post) => (dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });
  const configHeaders = getConfigHeaders();
  const uri = `${BACKEND_URL}/api/posts/delete`;
  axios
    .put(uri, post, configHeaders)
    .then(({ data }) => {
      console.log("[deletePosts ]:data", data);
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: data.data,
      });
      dispatch(setAlert(data.message, DELETE_POST_SUCCESS, "success"));
    })
    .catch((err) => {
      console.log("[deletePosts ]:err", { err });
      handleResponseErrors(err, DELETE_POST_FAIL);
      dispatch({ type: DELETE_POST_FAIL });
    });
};
export const resetPostData = () => (dispatch) => {
  dispatch({ type: RESET_POST });
};

// ---------------------------------------
// Get a single post by the post id
// export const getPostByPostId = id => dispatch => {
//   dispatch({type: LOADING })
//   const configHeaders = getConfigHeaders();
//   axios.get(`/api/posts/${id}`, configHeaders)
//     .then(({ data }) => {
//       dispatch({
//         type: SET_POST_BY_POST_ID,
//         payload: data.data
//       });
//       dispatch({type: LOADED })
//     })
//     .catch(err => {
//       handleResponseErrors(err, 'SET_POST_ALERT')
//     });
// };

// route PUT 200 /api/posts/like/:id
// Like a Post
// export const likePostByPostId = postId => dispatch => {
//   dispatch({type: LOADING })
//   const configHeaders = getConfigHeaders();
//   axios.put(`/api/posts/like/${postId}`, {},  configHeaders)
//     .then(({ data }) => {
//       dispatch({
//         type: LIKE_POST,
//         payload: data
//       });

//       dispatch(setAlert(data.message, 'LIKE_POST_SUCCESS'));
//       dispatch({type: LOADED })
//     })
//     .catch(err => {
//       handleResponseErrors(err, 'LIKE_POST_ALERT')
//     });
// };

// route PUT 200 /api/posts/unlike/:id
// UnLike a Post
// export const unlikePostByPostId = postId => dispatch => {
//   dispatch({type: LOADING })
//   const configHeaders = getConfigHeaders();
//   axios.put(`/api/posts/unlike/${postId}`,{} , configHeaders)
//     .then(({ data }) => {
//       dispatch({
//         type: UNLIKE_POST,
//         payload: data
//       });
//       dispatch(setAlert(data.message, 'UNLIKE_POST_SUCCESS'));
//       dispatch({type: LOADED })
//     })
//     .catch(err => {
//       handleResponseErrors(err, 'UNLIKE_POST_ALERT')
//     });
// };

// @route POST 201 /api/posts/comments/:id
// Add comment to a post
// export const addCommentToPost = (postId, comment) => dispatch => {
//   dispatch({type: LOADING })
//   const configHeaders = getConfigHeaders();
//   const body = JSON.stringify({ comment });
//   axios.post(`/api/posts/comments/${postId}`, body, configHeaders)
//     .then(({ data }) => {
//       dispatch({
//         type: ADD_COMMENT_TO_POST,
//         payload: data.data
//       });
//       dispatch(setAlert(data.message, 'ADD_COMMENT_SUCCESS'));
//       dispatch({type: LOADED })
//     })
//     .catch(err => {
//       handleResponseErrors(err, 'ADD_COMMENT_ALERT')

//     });
// };

// @route PUT 200 /api/posts:/post_id/comments/:comment_id
// Remove comment to a post
// export const removePostComment = (postId, commentId ) => dispatch => {
//   dispatch({type: LOADING })
//   const configHeaders = getConfigHeaders();
//   const uri = `/api/posts/${postId}/comments/${commentId}`;
//   axios.put(uri, {}, configHeaders)
//     .then(({ data }) => {
//       dispatch({
//         type: REMOVE_POST_COMMENT,
//         payload: data.data
//       });
//       dispatch(setAlert(data.message, 'REMOVE_COMMENT_SUCCESS'));
//       dispatch({type: LOADED });
//     })
//     .catch(err => {
//       handleResponseErrors(err, 'REMOVE_COMMENT_ALERT')

//     });
// };

// Delete a Post by Id
// export const deletePostById = id => dispatch => {
//   dispatch({type: LOADING })
//   const configHeaders = getConfigHeaders();
//   axios.delete(`/api/posts/${ id }`, configHeaders)
//     .then(({ data }) => {
//       dispatch({
//         type: POST_DELETED,
//         payload: data
//       });
//       dispatch(setAlert(data.message, 'DELETE_POST_ALERT'));
//       dispatch({type: LOADED })
//     })
//     .catch(err => {
//       handleResponseErrors(err, 'DELETE_POST_ALERT')
//     });
// };
