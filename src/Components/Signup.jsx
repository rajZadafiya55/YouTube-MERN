import { Grid, styled, Button } from "@mui/material";
import "../Css/navbar.css";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import { toast } from "react-toastify";
import { APIHttp } from "../constant/Api";
import { useNavigate } from "react-router-dom";
import pica from "pica";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const resizeImage = (file, width, height) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    reader.onerror = (e) => {
      reject(e);
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const picaInstance = pica();
      picaInstance
        .resize(img, canvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2,
        })
        .then(() => picaInstance.toBlob(canvas, "image/jpeg", 0.9))
        .then((blob) => {
          resolve(new File([blob], file.name, { type: "image/jpeg" }));
        })
        .catch(reject);
    };

    reader.readAsDataURL(file);
  });
};

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const [loading, setLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    if (file.type === "application/pdf") {
      toast.error("PDF files are not allowed. Please upload an image file.");
      return;
    }

    try {
      if (fieldName === "avatar") {
        const resizedAvatar = await resizeImage(file, 98, 98);
        setData({ ...data, [fieldName]: resizedAvatar });
      } else if (fieldName === "coverImage") {
        const resizedCoverImage = await resizeImage(file, 2048, 1152);
        setData({ ...data, [fieldName]: resizedCoverImage });
      }
    } catch (error) {
      toast.error("Failed to resize the image. Please try again.");
    }
  };

  const resetForm = () => {
    setData({
      fullName: "",
      username: "",
      email: "",
      password: "",
      avatar: null,
      coverImage: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    axios
      .post(`${APIHttp}users/register`, formData)
      .then((r) => {
        toast("Registration successful.");
        resetForm(); // Reset the form
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        toast.error("Failed to submit the form. Please try again.");
        setLoading(false); // Set loading to false
      });

    navigate("/");
  };

  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  return (
    <div>
      <div className="above-data">
        <p className="signup-head">Create Your Account</p>
        <p className="signup-desc">
          Unlock Your World of Entertainment, Join the YouTube Community
        </p>
      </div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              type="text"
              name="fullName"
              id="standard-basic"
              value={data.fullName || ""}
              onChange={handleChange}
              errorMessages={["Full name is required"]}
              label="Full Name"
              validators={["required"]}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              type="text"
              name="username"
              label="User Name (unique)"
              value={data.username || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["User name is required"]}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
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
          <Grid item lg={6} md={6} sm={12} xs={12}>
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

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              name="avatar"
              label="Profile Image"
              InputLabelProps={{ shrink: true }}
              type="file"
              onChange={handleImageChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              name="coverImage"
              label="Cover Image"
              InputLabelProps={{ shrink: true }}
              type="file"
              onChange={handleImageChange}
            />
          </Grid>
        </Grid>

        <Button
          className={theme ? "signup-btn" : "signup-btn signin-btn-light"}
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <ClipLoader size={24} color={"#fff"} />
          ) : (
            "Create Your Account"
          )}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default Signup;
