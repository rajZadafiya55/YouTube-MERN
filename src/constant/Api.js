import { toast } from "react-toastify";
export const APIHttp = "https://youtube-api-ucsp.onrender.com/api/v1/";
export const FrontendDomain = "https://yoouttube.vercel.app/";
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
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
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

export const formatDate = (createdAt) => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  const timeDifference = currentDate - createdDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};
