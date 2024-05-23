import { toast } from "react-toastify";

// export const APIHttp = "http://localhost:3000/";

export const APIHttp = "http://localhost:4000/api/v1/";

// const userData = JSON.parse(localStorage.getItem('loginData'));

// const accessToken = userData.accessToken;

export const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExNDAwNTU2NTMwODlhOTg4ZGNhNjQiLCJlbWFpbCI6InJhakBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJhaiIsImZ1bGxOYW1lIjoiUmFqIFphZGFmaXlhIiwiaWF0IjoxNzE2NDM3MDkzLCJleHAiOjE3MTY1MjM0OTN9.PLFz-7hnNO8eS8ID8zp_KhDAhzGTV5t4q4gSDcEFva4";

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
  toast.success(message, { position: "top-right" });
};

export const showErrorToast = (message) => {
  toast.error(message, { position: "top-right" });
};
