import { useEffect, useState } from "react";
import "../Css/navbar.css";
import Reset from "./Reset";
import axios from "axios";
import { Grid, styled, Button } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import { APIHttp } from "../constant/Api";
import ClipLoader from "react-spinners/ClipLoader";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

function Signin(prop) {
  const [loading, setLoading] = useState(false); // State for loading

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // ===============================================================

  const [showReset, setShowReset] = useState(false);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    if (prop.close === true) {
      setShowReset(false);
    }
  }, [prop.close]);

  useEffect(() => {
    if (prop.switch === false) {
      setShowReset(false);
    }
  }, [prop.switch]);

  // ================(form handler)===============================================

  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .post(`${APIHttp}users/login`, data)
        .then((y) => {
          const userToken = y.data.data.accessToken;
          const refreshToken = y.data.data.refreshToken;
          const userData = JSON.stringify(y.data.data.user);
          localStorage.setItem("userToken", userToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("userData", userData);
          toast.success("login successfully");
          setLoading(false);

          setTimeout(() => {
            window.location.reload();
            document.body.classList.remove("bg-class");
          }, 1000);
        })
        .catch((y) => {
          toast.error("your credentials are invalid");
          setLoading(false);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div
        className="above-data"
        style={{ display: showReset ? "none" : "block" }}
      >
        <p className="signup-head">Login to Your Account</p>
        <p className="signup-desc">
          Stay Connected-Stay Entertained, Step into the World of YouTube, Join
          the YouTube Community
        </p>
      </div>
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={() => null}
        className="signup-form"
        style={{ display: showReset ? "none" : "flex" }}
      >
        <Grid container spacing={0}>
          <Grid item sm={12} xs={12}>
            <TextField
              type="email"
              name="email"
              label="Email"
              value={data.email || ""}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["Email is required", "Email is not valid"]}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              type="password"
              name="password"
              id="standard-basic"
              value={data.password || ""}
              onChange={handleChange}
              label="Password"
              errorMessages={["Password is required"]}
              validators={["required"]}
            />
          </Grid>
        </Grid>
        <p
          className={
            theme ? "forgot-password" : "forgot-password text-light-mode"
          }
          style={{ marginBottom: "20px" }}
          onClick={() => setShowReset(true)}
        >
          Forgot password?
        </p>

        <Button
          className={theme ? "signup-btn" : "signup-btn signin-btn-light"}
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={24} color={"#fff"} />
          ) : (
            "Login to Your Account"
          )}
        </Button>
      </ValidatorForm>
      <div
        className="password-reset"
        style={{ display: showReset ? "block" : "none" }}
      >
        {/* ============(Forgot Password)====================================== */}

        <Reset />

        {/* ================================================================== */}
      </div>
    </>
  );
}

export default Signin;
