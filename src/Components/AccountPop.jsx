import { useEffect, useState, useRef } from "react";
import "../Css/accountPop.css";
import Uavatar from "../img/Uavatar.png";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { SiYoutubestudio } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import {
  avatar,
  email,
  username,
  _id,
  APIHttp,
  refreshToken as storedRefreshToken,
} from "../constant/Api";
import { toast } from "react-toastify";
import axios from "axios";

function AccountPop() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const intervalIdRef = useRef(null);

  const AuthLogOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    setIsBtnClicked(true);
    navigate("/");
    window.location.reload();
  };

  const token = localStorage.getItem("userToken");

  const checkTokenExpiration = async () => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTimeInMillis = payload.exp * 1000;
      const currentTimeInMillis = Date.now();

      if (currentTimeInMillis >= expirationTimeInMillis) {
        try {
          const response = await axios.post(`${APIHttp}users/refresh-token`, {
            refreshToken: storedRefreshToken,
          });
          const { accessToken } = response.data.data;
          localStorage.setItem("userToken", accessToken);
          toast.info("Access token refreshed successfully.");
          window.location.reload();
        } catch (error) {
          toast.error("Session expired. Please log in again.");
          AuthLogOut();
        }
      }
    }
  };

  useEffect(() => {
    if (token) {
      intervalIdRef.current = setInterval(
        checkTokenExpiration,
        2 * 60 * 60 * 1000
      );
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <>
      <div
        className={
          theme ? "account-pop" : "account-pop account-pop-light light-mode"
        }
        style={
          isBtnClicked === false ? { display: "block" } : { display: "none" }
        }
      >
        <div className="user-section">
          <div className="left-part">
            <img
              src={avatar ? avatar : Uavatar}
              alt="channelIMG"
              className="channelIMG"
            />
          </div>
          <div className="right-part">
            <p>{username}</p>
            <Tooltip
              TransitionComponent={Zoom}
              title={email}
              placement="bottom"
            >
              <p>{email}</p>
            </Tooltip>
          </div>
        </div>
        <hr className={theme ? "seperate" : "seperate-light"} />
        <div className="about-channel-section">
          <div
            className={theme ? "yourchannel c-sec" : "yourchannel c-sec2"}
            onClick={() => {
              navigate(`/channel/${_id}`);
            }}
          >
            <AccountBoxOutlinedIcon
              fontSize="medium"
              style={{ color: theme ? "white" : "black" }}
            />
            <p>Your channel</p>
          </div>
          <div
            className={theme ? "yourstudio c-sec" : "yourstudio c-sec2"}
            onClick={() => {
              navigate("/studio");
            }}
          >
            <SiYoutubestudio
              fontSize="21px"
              style={{ color: theme ? "white" : "black" }}
            />
            <p>YouTube Studio</p>
          </div>
        </div>
        <hr className={theme ? "seperate" : "seperate-light"} />
        <div className="extra1-section">
          <div
            className={theme ? "exitout c-sec" : "exitout c-sec2"}
            onClick={() => {
              AuthLogOut();
            }}
          >
            <LogoutOutlinedIcon
              fontSize="medium"
              style={{ color: theme ? "white" : "black" }}
            />
            <p>Sign Out</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPop;
