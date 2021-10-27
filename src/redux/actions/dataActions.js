import {
  SET_POSTS,
  SET_POSTS_USER,
  SET_MORE_POSTS,
  SET_POST,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  DELETE_COMMENT,
  SET_ERRORS,
  CREATE_POST,
  LOADING_UI,
  STOP_LOADING_UI,
  CLEAR_ERRORS,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

// Get all posts
export const getPosts = (offset) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`https://projet7-oc-api.herokuapp.com/api/posts`, {
      params: { offset: offset },
    })
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

export const getMorePosts = (offset) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`https://projet7-oc-api.herokuapp.com/api/posts`, {
      params: { offset: offset },
    })
    .then((res) => {
      dispatch({
        type: SET_MORE_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_MORE_POSTS,
        payload: [],
      });
    });
};

// Like a post
export const likePost = (postId) => (dispatch) => {
  axios
    .put(`https://projet7-oc-api.herokuapp.com/api/posts/like/${postId}`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .put(`https://projet7-oc-api.herokuapp.com/api/posts/unlike/${postId}`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Create a post
export const createPost = (post) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("https://projet7-oc-api.herokuapp.com/api/posts/createPost", post)
    .then((res) => {
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get a post
export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`https://projet7-oc-api.herokuapp.com/api/posts/post/${postId}`)
    .then((res) => {
      dispatch({ type: SET_POST, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Upload image
export const uploadImagePost = (formData) => (dispatch) => {
  return axios
    .post(
      "https://projet7-oc-api.herokuapp.com/api/posts/uploadImagePost",
      formData
    )
    .then((res) => res.data.imageUrl)
    .catch((err) => console.log(err));
};

// Delete a post
export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`https://projet7-oc-api.herokuapp.com/api/posts/delete/${postId}`)
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
    })
    .catch((err) => console.log(err));
};

// Submit comment
export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(
      `https://projet7-oc-api.herokuapp.com/api/posts/${postId}/comment`,
      commentData
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteComment = (commentId) => (dispatch) => {
  axios
    .delete(
      `https://projet7-oc-api.herokuapp.com/api/posts/delete-comment/${commentId}`
    )
    .then(() => {
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
    })
    .catch((err) => console.log(err));
};

export const getUserPosts = (pseudo) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`https://projet7-oc-api.herokuapp.com/api/user/posts/${pseudo}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS_USER,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS_USER,
        payload: null,
      });
    });
};

// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
