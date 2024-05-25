import { useEffect, useState } from "react";
import "../Css/navbar.css";
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

function Reset() {
  const [loading, setLoading] = useState(false); // State for loading

  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  // ===============================================================

  const [showReset, setShowReset] = useState(false);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

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
        .post(`${APIHttp}users/change-password`, data)
        .then((y) => {
          toast.success("Password change successfully !");
          setLoading(false);
          // setTimeout(() => {
          //   window.location.reload();
          //   document.body.classList.remove("bg-class");
          // }, 1000);
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
        <p className="signup-head">Forgot Password</p>
        <p className="signup-desc">
          Don&apos;t remember your password? No worries, we can help you to
          reset your password.
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
              name="oldPassword"
              id="standard-basic"
              value={data.oldPassword || ""}
              onChange={handleChange}
              label="Password"
              errorMessages={["Old password is required"]}
              validators={["required"]}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              type="password"
              name="newPassword"
              id="standard-basic"
              value={data.newPassword || ""}
              onChange={handleChange}
              label="New Password"
              errorMessages={["New password is required"]}
              validators={["required"]}
            />
          </Grid>
        </Grid>

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
            "Reset Your Password"
          )}
        </Button>
      </ValidatorForm>
    </>
  );
}

export default Reset;
