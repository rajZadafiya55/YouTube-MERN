export const APIHttp = 'http://localhost:3000/';

// export const APIHttp = 'http://localhost:4000/api/v1/';

// const userData = JSON.parse(localStorage.getItem('loginData'));

// const accessToken = userData.accessToken;

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExNDAwNTU2NTMwODlhOTg4ZGNhNjQiLCJlbWFpbCI6InJhakBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJhaiIsImZ1bGxOYW1lIjoiUmFqIFphZGFmaXlhIiwiaWF0IjoxNzE1MDk2ODE0LCJleHAiOjE3MTUxODMyMTR9.VGQ-Bn8gHL2Y-WdeWrcWQ1WI9RGg_Krovf9y3GX8vko';

export const Header = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + accessToken
  }
};
