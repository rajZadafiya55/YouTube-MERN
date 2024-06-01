import { useEffect, useState } from "react";
import "../Css/leftpanel2.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CiShare1 } from "react-icons/ci";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { avatar, username, _id } from "../constant/Api";

import Uavatar from "../img/Uavatar.png";

// REACT ICONS

import { MdDashboard } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineAutoFixHigh } from "react-icons/md";

const LeftPanel2 = () => {
  const navigate = useNavigate();
  const [studioMenuClicked, setstudioMenuClicked] = useState(() => {
    const menu = localStorage.getItem("studioMenuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const StudioSection = localStorage.getItem("Studio-Section");
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setstudioMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu2");
    menuButton.addEventListener("click", handleMenuButtonClick);

    return () => {
      menuButton.removeEventListener("click", handleMenuButtonClick);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "studioMenuClicked",
      JSON.stringify(studioMenuClicked)
    );
  }, [studioMenuClicked]);

  useEffect(() => {
    const currentUrl = location.pathname;
    let selected = "";

    if (currentUrl === "/studio") {
      selected = "Dashboard";
    } else if (currentUrl === "/studio/customize") {
      selected = "Customization";
    } else if (currentUrl === "/studio/video") {
      selected = "Content";
    } else if (currentUrl === "/studio/comments") {
      selected = "Comments";
    } else if (currentUrl === "/studio/playlist") {
      selected = "Playlist";
    }

    localStorage.setItem("Studio-Section", selected);
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  return (
    <>
      <div
        className={
          theme
            ? "main-section2 long-left"
            : "main-section2 long-left light-mode text-light-mode"
        }
        style={
          studioMenuClicked === true
            ? { display: "none" }
            : { display: "flex", width: "270px" }
        }
      >
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div
            className="first-panel"
            style={
              loading === true ? { display: "block" } : { display: "none" }
            }
          >
            <Skeleton
              count={1}
              width={110}
              height={110}
              style={{ borderRadius: "100%" }}
            />
            <div className="about-channel">
              <p className="your-channel">Your Channel</p>
              <Skeleton
                count={1}
                width={150}
                height={20}
                style={{ borderRadius: "4px" }}
              />
            </div>
          </div>
        </SkeletonTheme>

        {/* ================ channel logo ================= */}
        <div
          className="first-panel"
          style={
            loading === false
              ? { visibility: "visible", display: "block" }
              : { visibility: "hidden", display: "none" }
          }
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="View channel on YouTube"
            placement="top"
          >
            <img
              src={avatar || Uavatar}
              alt=""
              className="profile_img"
              onClick={() => {
                if (_id !== undefined) {
                  navigate(`/channel/${_id}`);
                }
              }}
            />
          </Tooltip>
          <CiShare1 className="view-channel2" fontSize="25px" color="white" />
          <div className="about-channel">
            <p className="your-channel">Your Channel</p>
            <p className={theme ? "c-name" : "c-name text-light-mode2"}>
              {username}
            </p>
          </div>
        </div>

        {/* ========================== Main HAND ==================================== */}
        <div className="second-panel">
          <div
            className={
              StudioSection === "Dashboard"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `dashboard panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "Dashboard");
              navigate("/studio");
            }}
          >
            <DashboardIcon
              className={
                StudioSection === "Dashboard" ? "studio-icon2" : "studio-icon"
              }
              fontSize="medium"
              style={{ color: "#A9A9A9", paddingLeft: "25px !important" }}
            />
            <p>Dashboard</p>
          </div>
          <div
            className={
              StudioSection === "Content"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `content panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "Content");
              navigate("/studio/video");
            }}
          >
            <VideoLibraryOutlinedIcon
              className={
                StudioSection === "Content" ? "studio-icon2" : "studio-icon"
              }
              fontSize="medium"
              style={{ color: "#A9A9A9" }}
            />
            <p>Content</p>
          </div>
          <div
            className={
              StudioSection === "Comments"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `comments panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "Comments");
              navigate("/studio/comments");
            }}
          >
            <ChatOutlinedIcon
              className={
                StudioSection === "Comments" ? "studio-icon2" : "studio-icon"
              }
              fontSize="medium"
              style={{ color: "#A9A9A9" }}
            />
            <p>Comments</p>
          </div>
          <div
            className={
              StudioSection === "Customization"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `customization panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "Customization");
              navigate("/studio/customize");
            }}
          >
            <AutoFixHighOutlinedIcon
              className={
                StudioSection === "Customization"
                  ? "studio-icon2"
                  : "studio-icon"
              }
              fontSize="medium"
              style={{ color: "#A9A9A9" }}
            />
            <p>Customization</p>
          </div>
          <div
            className={
              StudioSection === "Playlist"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `Playlist panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "Playlist");
              navigate("/studio/playlist");
            }}
          >
            <PlaylistAddIcon
              className={
                StudioSection === "Playlist" ? "studio-icon2" : "studio-icon"
              }
              fontSize="medium"
              style={{ color: "#A9A9A9" }}
            />
            <p>Playlist</p>
          </div>
        </div>
      </div>

      {/*======================  SHORT HAND  ===================== */}

      <div
        className={
          theme
            ? "main-section2 short-left"
            : "main-section2 short-left light-mode text-light-mode"
        }
        style={
          studioMenuClicked === false
            ? { display: "none" }
            : { display: "flex", width: "90px" }
        }
      >
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div
            className="first-panel"
            style={
              loading === true ? { display: "block" } : { display: "none" }
            }
          >
            <Skeleton
              count={1}
              width={50}
              height={50}
              style={{ borderRadius: "100%" }}
            />
          </div>
        </SkeletonTheme>
        <div
          className="first-panel"
          style={
            loading === false
              ? { visibility: "visible", display: "block" }
              : { visibility: "hidden", display: "none" }
          }
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="View channel on YouTube"
            placement="top"
          >
            <img
              src={avatar || Uavatar}
              alt=""
              className="profile_img"
              style={{ width: "50px", height: "50px" }}
              onClick={() => {
                if (_id !== undefined) {
                  navigate(`/channel/${_id}`);
                }
              }}
            />
          </Tooltip>
          <CiShare1 className="view-channel3" fontSize="20px" />
        </div>
        <div className="second-panel">
          <div
            className={
              StudioSection === "Dashboard"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `dashboard panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "Dashboard");
              navigate("/studio");
            }}
          >
            <Tooltip
              TransitionComponent={Zoom}
              title="Dashboard"
              placement="bottom"
            >
              <DashboardIcon
                className={
                  StudioSection === "Dashboard" ? "studio-icon2" : "studio-icon"
                }
                fontSize="medium"
                style={{
                  color: "#A9A9A9",
                  paddingLeft: "25px !important",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                }}
              />
            </Tooltip>
          </div>
          <div
            className={
              StudioSection === "Content"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `content panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "Content");
              navigate("/studio/video");
            }}
          >
            <Tooltip
              TransitionComponent={Zoom}
              title="Content"
              placement="bottom"
            >
              <VideoLibraryOutlinedIcon
                className={
                  StudioSection === "Content" ? "studio-icon2" : "studio-icon"
                }
                fontSize="medium"
                style={{
                  color: "#A9A9A9",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                }}
              />
            </Tooltip>
          </div>
          <div
            className={
              StudioSection === "Comments"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `comments panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "Comments");
              navigate("/studio/comments");
            }}
          >
            <Tooltip
              TransitionComponent={Zoom}
              title="Comments"
              placement="bottom"
            >
              <ChatOutlinedIcon
                className={
                  StudioSection === "Comments" ? "studio-icon2" : "studio-icon"
                }
                fontSize="medium"
                style={{
                  color: "#A9A9A9",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                }}
              />
            </Tooltip>
          </div>
          <div
            className={
              StudioSection === "Customization"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `customization panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "Customization");
              navigate("/studio/customize");
            }}
          >
            <Tooltip
              TransitionComponent={Zoom}
              title="Customization"
              placement="bottom"
            >
              <AutoFixHighOutlinedIcon
                className={
                  StudioSection === "Customization"
                    ? "studio-icon2"
                    : "studio-icon"
                }
                fontSize="medium"
                style={{
                  color: "#A9A9A9",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                }}
              />
            </Tooltip>
          </div>
          <div
            className={
              StudioSection === "PlayList"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `playlist panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Studio-Section", "PlayList");
              navigate("/studio/playList");
            }}
          >
            <Tooltip
              TransitionComponent={Zoom}
              title="PlayList"
              placement="bottom"
            >
              <PlaylistAddIcon
                className={
                  StudioSection === "PlayList" ? "studio-icon2" : "studio-icon"
                }
                fontSize="medium"
                style={{
                  color: "#A9A9A9",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                }}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      {/* =========================== HORIZONTAL MENU BAR ========================= */}

      <div
        className={
          theme
            ? "studio-horizontal-menu"
            : "studio-horizontal-menu light-mode text-light-mode"
        }
      >
        <div
          className="hori-dashboard"
          onClick={() => {
            localStorage.setItem("Studio-Section", "Dashboard");
            navigate("/studio");
          }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Dashboard"
            placement="bottom"
          >
            <MdDashboard
              className={
                StudioSection === "Dashboard"
                  ? "studio-icon3"
                  : "studio-icon-new"
              }
              fontSize="26px"
              style={{
                color: "#A9A9A9",
              }}
            />
          </Tooltip>
        </div>
        <div
          className="hori-content"
          onClick={() => {
            localStorage.setItem("Studio-Section", "Content");
            navigate("/studio/video");
          }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Content"
            placement="bottom"
          >
            <MdOutlineVideoLibrary
              className={
                StudioSection === "Content" ? "studio-icon3" : "studio-icon-new"
              }
              fontSize="26px"
              style={{
                color: "#A9A9A9",
              }}
            />
          </Tooltip>
        </div>
        <div
          className="hori-comments"
          onClick={() => {
            localStorage.setItem("Studio-Section", "Comments");
            navigate("/studio/comments");
          }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Comments"
            placement="bottom"
          >
            <BiCommentDetail
              className={
                StudioSection === "Comments"
                  ? "studio-icon3"
                  : "studio-icon-new"
              }
              fontSize="26px"
              style={{
                color: "#A9A9A9",
              }}
            />
          </Tooltip>
        </div>
        <div
          className="hori-customize"
          onClick={() => {
            localStorage.setItem("Studio-Section", "Customization");
            navigate("/studio/customize");
          }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Customization"
            placement="bottom"
          >
            <MdOutlineAutoFixHigh
              className={
                StudioSection === "Customization"
                  ? "studio-icon3"
                  : "studio-icon-new"
              }
              fontSize="26px"
              style={{
                color: "#A9A9A9",
              }}
            />
          </Tooltip>
        </div>
        <div
          className="hori-customize"
          onClick={() => {
            localStorage.setItem("Studio-Section", "PlayList");
            navigate("/studio/playList");
          }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="PlayList"
            placement="bottom"
          >
            <FeaturedPlayListIcon
              className={
                StudioSection === "PlayList"
                  ? "studio-icon3"
                  : "studio-icon-new"
              }
              fontSize="26px"
              style={{
                color: "#A9A9A9",
              }}
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default LeftPanel2;
