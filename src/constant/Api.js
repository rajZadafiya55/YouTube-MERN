import { toast } from "react-toastify";
export const APIHttp = "http://localhost:4000/api/v1/";
import Uavatar from "../img/Uavatar.png";

// const userData = JSON.parse(localStorage.getItem('loginData'));

// const accessToken = userData.accessToken;

// export const accessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExNDAwNTU2NTMwODlhOTg4ZGNhNjQiLCJlbWFpbCI6InJhakBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJhaiIsImZ1bGxOYW1lIjoiUmFqIFphZGFmaXlhIiwiaWF0IjoxNzE2NDM3MDkzLCJleHAiOjE3MTY1MjM0OTN9.PLFz-7hnNO8eS8ID8zp_KhDAhzGTV5t4q4gSDcEFva4";

// ==========(User data)====================================================

const userData = localStorage.getItem("userData");

let avatar, coverImage, email, fullName, username, _id;

if (userData) {
  const parsedData = JSON.parse(userData);
  avatar = parsedData.avatar || Uavatar;
  coverImage = parsedData.coverImage || Uavatar;
  email = parsedData.email || "user@gmail.com";
  fullName = parsedData.fullName || "User";
  username = parsedData.username || "User_123";
  _id = parsedData._id || "1234";
} else {
  console.error("No userData found in localStorage.");
}
export { avatar, coverImage, email, fullName, username, _id };

// ==========(User Token)====================================================

export const accessToken = localStorage.getItem("userToken");
export const refreshToken = localStorage.getItem("userToken");

export const Header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
  },
};

export const VideoHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + accessToken,
  },
};

// Toast messages
export const showToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showLoginToast = () => {
  toast.info("Would you please login !", {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const EmptyMessage = (message) =>
  toast.error(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const commonNotify = (message) =>
  toast.success(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const CancelNotify = (message) =>
  toast.warning(message, {
    position: "bottom-center",
    autoClose: 950,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
