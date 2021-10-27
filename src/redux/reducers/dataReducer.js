import {
  SET_POSTS,
  SET_POSTS_USER,
  SET_POST,
  SET_MORE_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  CREATE_POST,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case SET_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
      };

    case SET_POSTS_USER:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case SET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };

    case LIKE_POST:
      let indexLike = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[indexLike] = action.payload;

      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state,
      };

    case UNLIKE_POST:
      let indexUnlike = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[indexUnlike] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state,
      };

    case DELETE_POST:
      let indexDelete = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(indexDelete, 1);
      return {
        ...state,
      };

    case CREATE_POST:
      return {
        ...state,
        posts: action.payload,
      };

    case SUBMIT_COMMENT:
      let indexCount = state.posts.findIndex(
        (post) => post.postId === action.payload.post.postId
      );
      state.posts[indexCount] = action.payload.post;
      return {
        ...state,
        post: {
          ...action.payload.post,
          comments: [action.payload.comment, ...state.post.comments],
        },
      };

    case DELETE_COMMENT:
      let indexCommentDelete = state.post.comments.findIndex(
        (comment) => comment.commentId === action.payload
      );
      state.post.comments.splice(indexCommentDelete, 1);
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments,
        },
      };

    default:
      return state;
  }
}
