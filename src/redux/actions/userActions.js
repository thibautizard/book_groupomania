import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("https://projet7-oc-api.herokuapp.com/api/user/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((errors) => {
      dispatch({
        type: SET_ERRORS,
        payload: errors.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("https://projet7-oc-api.herokuapp.com/api/user/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((errors) => {
      dispatch({
        type: SET_ERRORS,
        payload: errors.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdtoken");
  if (axios.default.headers)
    delete axios.default.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("https://projet7-oc-api.herokuapp.com/api/user/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("https://projet7-oc-api.herokuapp.com/api/user/uploadImage", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(
      "https://projet7-oc-api.herokuapp.com/api/user/editProfile",
      userDetails
    )
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = () => (dispatch) => {
  axios
    .delete("https://projet7-oc-api.herokuapp.com/api/user/delete")
    .then(() => {
      console.log("Votre profil a bien été supprimé !");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteOtherUser = (pseudo) => (dispatch) => {
  axios
    .delete(`https://projet7-oc-api.herokuapp.com/api/user/delete/${pseudo}`)
    .then(() => {
      console.log("Ce profil a bien été supprimé !");
    })
    .catch((err) => {
      console.log(err);
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdtoken = `Bearer ${token}`;
  localStorage.setItem("FBIdtoken", FBIdtoken);
  axios.defaults.headers.common["Authorization"] = FBIdtoken;
};
