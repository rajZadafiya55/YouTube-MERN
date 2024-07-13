/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import {
  CHANGE_PASSWORD,
  GET_USER_CHANNEL_PROFILE,
  GET_USER_WATCH_HISTORY,
  NEW_REGISTRATION,
  USER_LOGIN,
} from "../types";

import { toast } from "react-toastify";
import { APIHttp, Header } from "../../constant/Api";

const showToastMessage = () => {
  toast.success("You have successfully registered!", {
    position: "top-right",
  });
};
const loginToastMessage = () => {
  toast.success("login successfully", {
    position: "top-right",
  });
};

const InvalidToastMessage = () => {
  toast.success("Invalid credentials", {
    position: "top-right",
  });
};

const ChangePwdToastMessage = () => {
  toast.success("Change Password successfully", {
    position: "top-right",
  });
};

const addUser = () => ({
  type: NEW_REGISTRATION,
});

export const registerUserData = (data) => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("avatar", data.avatar);
  formData.append("coverImage", data.coverImage);

  return (dispatch) => {
    axios
      .post(`${APIHttp}users/register`, formData)
      .then((res) => {
        dispatch(addUser);
        if (res.data.success === true) {
          showToastMessage();
        } else {
          InvalidToastMessage();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const login = () => ({
  type: USER_LOGIN,
});

export const loginUser = (data, navigate) => {
  return (dispatch) => {
    axios
      .post(`${APIHttp}users/login`, data)
      .then((res) => {
        dispatch(login);
        if (res.data.success === true) {
          localStorage.setItem("loginData", JSON.stringify(res.data.data || 0));
          loginToastMessage();
          navigate("/");
        } else {
          InvalidToastMessage();
          navigate("/pages/login/login3");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const changePwd = () => ({
  type: CHANGE_PASSWORD,
});

export const changePassword = (data, navigate) => {
  return (dispatch) => {
    axios
      .post(`${APIHttp}users/change-password`, data)
      .then((res) => {
        dispatch(changePwd);

        if (res.data.success === true) {
          ChangePwdToastMessage();
          navigate("/pages/login/login3");
        } else {
          InvalidToastMessage();
          navigate("/pages/login/changePassword");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getChannelProfile = (profile) => ({
  type: GET_USER_CHANNEL_PROFILE,
  payload: profile,
});

export const getUserChannelProfile = (id) => {
  return (dispatch) => {
    axios
      .get(`${APIHttp}users/c/${id}`, Header)
      .then(async (res) => {
        await dispatch(getChannelProfile(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getUserHistory = (histroy) => ({
  type: GET_USER_WATCH_HISTORY,
  payload: histroy,
});

export const getUserWatchHistory = () => {
  return (dispatch) => {
    axios
      .get(`${APIHttp}users/histroy`, Header)
      .then(async (res) => {
        await dispatch(getUserHistory(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
