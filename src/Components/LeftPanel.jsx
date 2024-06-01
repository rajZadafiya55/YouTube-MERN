import "../Css/leftpanel.css";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import jwtDecode from "jwt-decode";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import CodeIcon from "@mui/icons-material/Code";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { HiOutlineFire } from "react-icons/hi";
import { HiMiniFire } from "react-icons/hi2";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { MdVideoLibrary } from "react-icons/md";
import { showLoginToast } from "../constant/Api";

function LeftPanel() {
  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const [Email, setEmail] = useState();
  const location = useLocation();

  const token = localStorage.getItem("userToken");

  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    if (token) {
      setEmail(jwtDecode(token).email);
    }
  }, [token]);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      if (window.innerWidth >= 860) {
        setMenuClicked((prevMenuClicked) => !prevMenuClicked);
      } else {
        document.body.classList.add("bg-css");
      }
    };

    const menuButton = document.querySelector(".menu-light");
    if (menuButton) {
      menuButton.addEventListener("click", handleMenuButtonClick);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener("click", handleMenuButtonClick);
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("menuClicked", JSON.stringify(menuClicked));
  }, [menuClicked]);

  const selected = localStorage.getItem("selected");

  useEffect(() => {
    const currentUrl = location.pathname;
    let selected = "";

    if (currentUrl === "/") {
      selected = "home";
    } else if (currentUrl === "/trending") {
      selected = "trending";
    } else if (currentUrl === "/watchlater") {
      selected = "watch-later";
    } else if (currentUrl === "/subscriptions") {
      selected = "subscription";
    } else if (currentUrl === "/likedVideos") {
      selected = "liked-video";
    } else if (currentUrl === "/library") {
      selected = "library";
    } else {
      selected = "other";
    }

    localStorage.setItem("selected", selected);
  }, [location]);

  return (
    <>
      {/* ========================== Main HAND ==================================== */}
      <div
        className={theme ? "main-left-section" : "main-left-section light-mode"}
        style={
          menuClicked === false ? { display: "none" } : { display: "block" }
        }
      >
        <div className="first-section ">
          <div
            className={
              selected === "home"
                ? `home sec-data ${theme ? "changeBG" : "changeBG-light"}`
                : "home sec-data"
            }
            onClick={() => {
              localStorage.setItem("selected", "home");
              navigate("/");
            }}
          >
            {selected === "home" ? (
              <HomeIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <HomeOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}

            <p>Home</p>
          </div>
          {/* <div
            className={
              selected === "trending"
                ? `trending sec-data ${theme ? "changeBG" : "changeBG-light"}`
                : "trending sec-data"
            }
            onClick={() => {
              localStorage.setItem("selected", "trending");
              navigate("/trending");
            }}
          >
            {selected === "trending" ? (
              <WhatshotIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <WhatshotOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
            <p>Trending</p>
          </div> */}
          <div
            className={
              selected === "subscription"
                ? `subscription sec-data ${
                    theme ? "changeBG" : "changeBG-light"
                  }`
                : "subscription sec-data"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "subscription");
                navigate("/subscriptions");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "subscription" ? (
              <SubscriptionsIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <SubscriptionsOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
            <p>Subscriptions</p>
          </div>
        </div>
        <hr className={theme ? "seperate" : "seperate-light"} />
        <div className="second-section">
          <div
            className={
              selected === "library"
                ? `library sec-data ${theme ? "changeBG" : "changeBG-light"}`
                : "library sec-data"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "library");
                navigate("/library");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "library" ? (
              <VideoLibraryIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <VideoLibraryOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
            <p>Library</p>
          </div>

          <div
            className={
              selected === "watch-later"
                ? `watch-later sec-data ${
                    theme ? "changeBG" : "changeBG-light"
                  }`
                : "watch-later sec-data"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "watch-later");
                navigate("/watchlater");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "watch-later" ? (
              <WatchLaterIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <WatchLaterOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
            <p>Watch later</p>
          </div>
          <div
            className={
              selected === "liked-video"
                ? `liked-video sec-data ${
                    theme ? "changeBG" : "changeBG-light"
                  }`
                : "liked-video sec-data"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "liked-video");
                navigate("/likedVideos");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "liked-video" ? (
              <ThumbUpIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <ThumbUpOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
            <p>Liked videos</p>
          </div>

          <hr className={theme ? "seperate" : "seperate-light"} />
          <Tooltip
            TransitionComponent={Zoom}
            title="Made with 💖 by Raj Zadafiya and Ravi Senjaliya"
            placement="bottom"
          >
            <div className="developer">
              <CodeIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
              <a
                href="https://github.com/rajZadafiya55"
                target="_blank"
                rel="noreferrer"
              >
                Raj 😁
              </a>
              <a
                href="https://github.com/RaviSenjaliya"
                target="_blank"
                rel="noreferrer"
              >
                Ravi 😎
              </a>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* ========================== SHORT HAND ==================================== */}
      <div
        className={
          theme
            ? "main-left-section main-2"
            : "main-left-section main-2 light-mode"
        }
        style={
          menuClicked === false ? { display: "flex" } : { display: "none" }
        }
      >
        <div className="first-section ">
          <div
            className={
              selected === "home"
                ? `home sec-data sec-data2 ${
                    theme ? "changeBG" : "changeBG-light"
                  }`
                : "home sec-data sec-data2"
            }
            onClick={() => {
              localStorage.setItem("selected", "home");
              navigate("/");
            }}
          >
            {selected === "home" ? (
              <HomeIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <HomeOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
          </div>
          {/* <div
            className={
              selected === "trending"
                ? `trending trending2 sec-data sec-data2 ${
                    theme ? "changeBG" : "changeBG-light"
                  }`
                : "trending trending2 sec-data sec-data2"
            }
            onClick={() => {
              localStorage.setItem("selected", "trending");

              navigate("/trending");
            }}
          >
            {selected === "trending" ? (
              <WhatshotIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <WhatshotOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
          </div> */}
          <div
            className={
              selected === "subscription"
                ? `subscription subscription2 sec-data sec-data2 ${
                    theme ? "changeBG" : "changeBG-light"
                  }`
                : "subscription subscription2 sec-data sec-data2"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "subscription");
                navigate("/subscriptions");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "subscription" ? (
              <SubscriptionsIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <SubscriptionsOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
          </div>
        </div>
        {/* <hr className="seperate" /> */}
        <div className="second-section">
          <div
            className={
              selected === "library"
                ? `library library2 sec-data sec-data2 ${
                    theme ? "changeBG" : "changeBG-light"
                  }`
                : "library library2 sec-data sec-data2"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "library");
                navigate("/library");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "library" ? (
              <VideoLibraryIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <VideoLibraryOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
          </div>
          <div
            className={
              selected === "watch-later"
                ? `watch-later watch-later2 sec-data sec-data2 ${
                    theme ? "changeBG" : "changeBG-light"
                  }`
                : "watch-later watch-later2 sec-data sec-data2"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "watch-later");
                navigate("/watchlater");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "watch-later" ? (
              <WatchLaterIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <WatchLaterOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
          </div>
          <div
            className={
              selected === "liked-video"
                ? `liked-video liked-video2 sec-data sec-data2 ${
                    theme ? "changeBG" : "changeBG-light"
                  }`
                : "liked-video liked-video2 sec-data sec-data2"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "liked-video");

                navigate("/likedVideos");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "liked-video" ? (
              <ThumbUpIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            ) : (
              <ThumbUpOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ====================== HORIZONTAL PANEL ============================== */}

      <div
        className={theme ? "horizontal-panel" : "horizontal-panel light-mode"}
      >
        <div className="horizontal-main-section">
          <div
            className={
              theme ? "home-hori hori" : "home-hori hori text-light-mode"
            }
            onClick={() => {
              localStorage.setItem("selected", "home");
              navigate("/");
            }}
          >
            {selected === "home" ? (
              <GoHomeFill
                fontSize="28px"
                color={theme ? "white" : "black"}
                className="hor-icons"
              />
            ) : (
              <GoHome
                fontSize="28px"
                color={theme ? "white" : "black"}
                className="hor-icons"
              />
            )}

            <p>Home</p>
          </div>
          <div
            className={
              theme
                ? "trending-hori hori"
                : "trending-hori hori text-light-mode"
            }
            onClick={() => {
              localStorage.setItem("selected", "trending");
              navigate("/trending");
            }}
          >
            {selected === "trending" ? (
              <HiMiniFire
                fontSize="28px"
                color={theme ? "white" : "black"}
                className="hor-icons"
              />
            ) : (
              <HiOutlineFire
                fontSize="28px"
                color={theme ? "white" : "black"}
                className="hor-icons"
              />
            )}
            <p>Trending</p>
          </div>
          <IoAddCircleOutline
            fontSize="50px"
            color={theme ? "white" : "black"}
            className="addvid-icon"
            onClick={() => {
              if (token) {
                navigate("/studio");
              } else {
                showLoginToast();
              }
            }}
          />
          <div
            className={
              theme
                ? "subscriptions-hori hori"
                : "subscriptions-hori hori text-light-mode"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "subscription");
                navigate("/subscriptions");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "subscription" ? (
              <MdSubscriptions
                fontSize="28px"
                color={theme ? "white" : "black"}
                className="hor-icons"
              />
            ) : (
              <MdOutlineSubscriptions
                fontSize="28px"
                color={theme ? "white" : "black"}
                className="hor-icons"
              />
            )}
            <p>Subscrip</p>
          </div>
          <div
            className={
              theme ? "library-hori hori" : "library-hori hori text-light-mode"
            }
            onClick={() => {
              if (token) {
                localStorage.setItem("selected", "library");
                navigate("/library");
              } else {
                showLoginToast();
              }
            }}
          >
            {selected === "library" ? (
              <MdVideoLibrary
                fontSize="28px"
                color={theme ? "white" : "black"}
                className="hor-icons"
              />
            ) : (
              <MdOutlineVideoLibrary
                fontSize="28px"
                color={theme ? "white" : "black"}
                className="hor-icons"
              />
            )}
            <p>Library</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftPanel;
