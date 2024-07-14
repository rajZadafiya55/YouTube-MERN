import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import "../Css/accountPop.css";
import avatar from "../img/avatar.png";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useNavigate } from "react-router-dom";
import { _id } from "../constant/Api";

function AccountPop() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  const [ChannelID, setChannelID] = useState(_id);
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setName(decodedToken.name || "");
        setEmail(decodedToken.email || "");
      } catch (error) {
        console.log("Error decoding token:", error.message);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Dark", JSON.stringify(theme));
  }, [theme]);
  return (
    <>
      <div
        className={theme ? "account-pop2" : "account-pop2 light-mode"}
        style={
          isBtnClicked === false ? { display: "block" } : { display: "none" }
        }
      >
        {/*==================== profile pic ==================== */}
        <div className="user-section">
          <div className="left-part">
            <img
              src={profile ? profile : avatar}
              alt="channelIMG"
              className="channelIMG"
            />
          </div>
          <div className="right-part">
            <p>{name}</p>
            <Tooltip
              TransitionComponent={Zoom}
              title={email}
              placement="bottom"
            >
              <p>
                {email.slice(0, 12)}
                {email.length > 12 ? "..." : ""}
              </p>
            </Tooltip>
          </div>
        </div>

        <hr className={theme ? "seperate" : "seperate seperate-light"} />

        {/*===================== middle details  ================*/}
        <div className="about-channel-section">
          <div
            className={
              theme ? "yourchannel c-sec" : "yourchannel c-sec preview-lightt"
            }
            onClick={() => {
              navigate(`/channel/${ChannelID}`);
            }}
          >
            <AccountBoxOutlinedIcon
              fontSize="medium"
              style={{ color: theme ? "#909090" : "black" }}
            />
            <p>Your channel</p>
          </div>
          <div
            className={
              theme ? "yourstudio c-sec" : "yourstudio c-sec preview-lightt"
            }
            onClick={() => {
              navigate("/");
            }}
          >
            <YouTubeIcon
              fontSize="medium"
              style={{ color: theme ? "#909090" : "black" }}
            />
            <p>YouTube</p>
          </div>
          <div
            className={
              theme ? "apperance c-sec" : "apperance c-sec preview-lightt"
            }
            onClick={() => {
              if (isBtnClicked === false) {
                setIsBtnClicked(true);
              } else {
                setIsBtnClicked(false);
              }
            }}
          >
            <DarkModeOutlinedIcon
              fontSize="medium"
              style={{ color: theme ? "#909090" : "black" }}
            />
            <p>Appearance: {theme ? "Dark" : "Light"}</p>
            <ArrowForwardIosRoundedIcon
              className="open"
              fontSize="small"
              style={{ color: theme ? "#ffffff8a" : "#606060" }}
            />
          </div>
        </div>

        <hr className={theme ? "seperate" : "seperate seperate-light"} />

        {/*====================== sign out ==================  */}
        <div className="extra1-section">
          <div
            className={theme ? "exitout c-sec" : "exitout c-sec preview-lightt"}
            onClick={() => {
              localStorage.removeItem("userToken");
              navigate("/");
            }}
          >
            <LogoutOutlinedIcon
              fontSize="medium"
              style={{ color: theme ? "#909090" : "black" }}
            />
            <p>Sign Out</p>
          </div>
        </div>
      </div>

      {/*========================== dark & light mode nu ander nu dialog box ================== */}
      <div
        className={theme ? "account-pop2" : "account-pop2 light-mode"}
        style={
          isBtnClicked === true
            ? { display: "block", paddingTop: "12px" }
            : { display: "none", paddingTop: "20px" }
        }
      >
        <div className="appearance-title">
          <ArrowBackOutlinedIcon
            className={theme ? "back-arrow" : "back-arrow preview-lightt"}
            fontSize="medium"
            style={{ color: theme ? "#909090" : "#606060" }}
            onClick={() => {
              if (isBtnClicked === true) {
                setIsBtnClicked(false);
              } else {
                setIsBtnClicked(true);
              }
            }}
          />
          <p>Apperance</p>
        </div>
        <hr
          className={theme ? "seperate" : "seperate seperate-light"}
          style={
            isBtnClicked === true ? { marginTop: "6px" } : { marginTop: "15px" }
          }
        />
        <div className="theme-section">
          <p className="caution">Settings applied to this browser only</p>
          <div className="theme-list">
            <div
              className={theme ? "dark-theme" : "dark-theme preview-lightt"}
              onClick={() => {
                setTheme(true);
                window.location.reload();
              }}
            >
              <DoneOutlinedIcon
                className="dark-arrow"
                fontSize="medium"
                style={{ opacity: theme ? "1" : "0" }}
              />
              <p>Dark theme</p>
            </div>
            <div
              className={theme ? "light-theme" : "light-theme preview-lightt"}
              onClick={() => {
                setTheme(false);
                window.location.reload();
              }}
            >
              <DoneOutlinedIcon
                className="light-arrow"
                fontSize="medium"
                style={{ opacity: !theme ? "1" : "0" }}
              />
              <p>Light theme</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPop;
