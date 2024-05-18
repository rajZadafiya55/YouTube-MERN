// export const APIHttp = "http://localhost:3000/";

export const APIHttp = "http://localhost:4000/api/v1/";

// const userData = JSON.parse(localStorage.getItem('loginData'));

// const accessToken = userData.accessToken;

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExNDAwNTU2NTMwODlhOTg4ZGNhNjQiLCJlbWFpbCI6InJhakBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJhaiIsImZ1bGxOYW1lIjoiUmFqIFphZGFmaXlhIiwiaWF0IjoxNzE2MDQxNTkzLCJleHAiOjE3MTYxMjc5OTN9.31qE9HXkWW3l2SLegccLgK4gOeWXMHPJ1l5fEe1Tkyo";

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


