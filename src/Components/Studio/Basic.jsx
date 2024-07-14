import { useState, useEffect, useRef } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { toast } from "react-toastify";
import axios from "axios";
import { Grid, styled, Button } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import ClipLoader from "react-spinners/ClipLoader";
import {
  avatar,
  coverImage,
  email as initialEmail,
  fullName as initialFullName,
  username,
  _id,
  APIHttp,
  Header,
  FrontendDomain,
} from "../../constant/Api";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

function Basic() {
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const [data, setData] = useState({
    email: initialEmail,
    fullName: initialFullName,
  });

  const [channelID, setChannelID] = useState(_id);
  const channelUrl = `${FrontendDomain}channel`;
  const channelIDInputRef = useRef(null);
  const [copy, setCopy] = useState(false);

  const [theme, setTheme] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${channelUrl}/${_id}`)
      .then(() => {
        toast("Link copied !", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch((error) => {
        console.log("Error copying link to clipboard:", error);
      });
  };

  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `${APIHttp}users/update-account`,
        data,
        Header
      );
      if (response.status === 200) {
        toast.success("Info updated successfully");

        const updatedUserData = {
          ...JSON.parse(localStorage.getItem("userData")),
          email: data.email,
          fullName: data.fullName,
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        window.location.reload();
        setLoading(false);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Oops, something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="basic-info-section"
        style={{
          opacity: loading ? "0.35" : "1",
          transition: "opacity .15s ease",
          cursor: loading ? "wait" : "auto",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
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
                value={data.email}
                onChange={handleChange}
                validators={["required", "isEmail"]}
                errorMessages={["Email is required", "Email is not valid"]}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                type="text"
                name="fullName"
                id="standard-basic"
                value={data.fullName}
                onChange={handleChange}
                label="Full Name"
                errorMessages={["Full Name is required"]}
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
              "Change Basic Info"
            )}
          </Button>
        </ValidatorForm>
        <div className="basic-channelurl-section">
          <p
            className={
              theme
                ? "basic-channelurl-head"
                : "basic-channelurl-head text-light-mode"
            }
          >
            Channel URL
          </p>
          <p
            className={
              theme
                ? "basic-channelurl-desc"
                : "basic-channelurl-desc text-light-mode2"
            }
          >
            This is the standard web address for your channel. It includes your
            unique channel ID, which is the numbers and letters at the end of
            the URL.
          </p>
          {channelID === "" || channelID === "undefined" ? (
            <input
              type="text"
              className={
                theme
                  ? "channel-name-inp2"
                  : "channel-name-inp2 text-light-mode preview-light"
              }
              value="Loading..."
              style={{ pointerEvents: "none" }}
            />
          ) : (
            <>
              <div className="channellink-copy">
                <input
                  type="text"
                  className={
                    theme
                      ? "channel-name-inp2"
                      : "channel-name-inp2 text-light-mode preview-light"
                  }
                  value={`${channelUrl}/${
                    copy
                      ? channelID.length >= 30
                        ? channelID
                        : `${channelID.slice(0, 10)}...`
                      : channelID
                  }`}
                  onClick={handleCopyLink}
                  ref={channelIDInputRef}
                />
                <ContentCopyOutlinedIcon
                  className={theme ? "coppy-id" : "coppy-id-light"}
                  onClick={handleCopyLink}
                  fontSize="medium"
                  style={{ color: theme ? "white" : "#606060" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Basic;
