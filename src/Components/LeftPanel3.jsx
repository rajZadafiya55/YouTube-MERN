import { useEffect, useState } from "react";
import "../Css/leftpanel3.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedVideo } from ".../../../redux/actions/videoAction.js";

const LeftPanel2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedVideos = useSelector((state) => state.videos.selectedVideo);

  const { id } = useParams();
  const [videodata, setVideoData] = useState();
  const VideoEditSection = localStorage.getItem("Video-Edit Section");
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [studioMenuClicked, setstudioMenuClicked] = useState(() => {
    const menu = localStorage.getItem("studioMenuClicked2");
    return menu ? JSON.parse(menu) : false;
  });
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

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
      "studioMenuClicked2",
      JSON.stringify(studioMenuClicked)
    );
  }, [studioMenuClicked]);

  useEffect(() => {
    const currentUrl = location.pathname;
    let selected = "";

    if (currentUrl === `/studio/video/edit/${id}`) {
      selected = "Details";
    } else if (currentUrl === "/studio/customize") {
      selected = "Customization";
    } else if (currentUrl === "/studio/video") {
      selected = "Content";
    } else if (currentUrl === `/studio/video/comments/${id}`) {
      selected = "Video-Comments";
    }

    localStorage.setItem("Video-Edit Section", selected);
  }, [location, id]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const GetVideoData = async () => {
      try {
        if (id !== undefined) {
          dispatch(getSelectedVideo(id));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    GetVideoData();
  }, [id]);

  useEffect(() => {
    setVideoData(selectedVideos);
  }, [selectedVideos]);

  return (
    <>
      <div
        className={
          theme ? "main-section3" : "main-section3 light-mode text-light-mode"
        }
        style={
          studioMenuClicked === true ? { display: "none" } : { display: "flex" }
        }
      >
        {/*================== channel and conetnt back arrow navbar in top ====================== */}
        <div
          className={
            theme
              ? "first-panel first-panel1"
              : "first-panel first-panel1 preview-lightt"
          }
          onClick={() => {
            if (window.location.href.includes(`/studio/video/edit/${id}`)) {
              navigate("/studio/video");
            } else {
              navigate("/studio/comments");
            }
          }}
        >
          <div className="about-video">
            <WestIcon fontSize="medium" style={{ color: "#aaa" }} />
            {window.location.href.includes(`/studio/video/edit/${id}`) ? (
              <p>Channel content</p>
            ) : (
              <p>Channel comments</p>
            )}
          </div>
        </div>

        {/* START HERE  */}
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div
            className="mid-panel"
            style={
              loading === true ? { display: "block" } : { display: "none" }
            }
          >
            <div className="redirect-video">
              <Skeleton count={1} width={220} height={124} />
            </div>
            <div className="thisvideo-mg-data2" style={{ marginTop: "25px" }}>
              <Skeleton count={1} width={220} height={17} />
              <Skeleton count={1} width={150} height={13} />
            </div>
          </div>
        </SkeletonTheme>

        {/* END HERE  */}
        {/*================== video and description show =================== */}
        <div
          className="mid-panel"
          style={
            videodata && loading === false
              ? { visibility: "visible", display: "block" }
              : { visibility: "hidden", display: "none" }
          }
        >
          <div
            className="redirect-video"
            onClick={() => {
              if (videodata) {
                navigate(`/video/${videodata._id}`);
                window.location.reload();
              }
            }}
          >
            <img
              src={videodata && videodata.thumbnail.url}
              alt="thumbnail"
              className="current-video-thumbnail"
            />
            <p className="current-video-duraation">
              {Math.floor(videodata && videodata.duration / 60) +
                ":" +
                (Math.round(videodata && videodata.duration % 60) < 10
                  ? "0" + Math.round(videodata && videodata.duration % 60)
                  : Math.round(videodata && videodata.duration % 60))}
            </p>
            <Tooltip
              TransitionComponent={Zoom}
              title="View on YouTube"
              placement="bottom"
            >
              <YouTubeIcon
                className="watch-video"
                fontSize="large"
                style={{ color: "white" }}
              />
            </Tooltip>
          </div>
          <div className="thisvideo-mg-data">
            <p className="ur-vid">Your video</p>
            <Tooltip
              TransitionComponent={Zoom}
              title={videodata && videodata.title}
              placement="bottom"
            >
              <p
                className={
                  theme
                    ? "current-video-title"
                    : "current-video-title text-light-mode2"
                }
              >
                {videodata && videodata.title <= 38
                  ? videodata && videodata.title
                  : `${videodata && videodata.title}...`}
              </p>
            </Tooltip>
          </div>
        </div>

        {/*================== content and comment menu =================== */}
        <div className="second-panel">
          <div
            className={
              VideoEditSection === "Details"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `details panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Video-Edit Section", "Details");
              navigate(`/studio/video/edit/${id}`);
            }}
          >
            <ModeEditOutlineOutlinedIcon
              className={
                VideoEditSection === "Details" ? "studio-icon2" : "studio-icon"
              }
              fontSize="medium"
              style={{ color: "#A9A9A9", paddingLeft: "25px !important" }}
            />
            <p>Details</p>
          </div>
          <div
            className={
              VideoEditSection === "Video-Comments"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `comments panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Video-Edit Section", "Video-Comments");
              navigate(`/studio/video/comments/${id}`);
            }}
          >
            <ChatOutlinedIcon
              className={
                VideoEditSection === "Video-Comments"
                  ? "studio-icon2"
                  : "studio-icon"
              }
              fontSize="medium"
              style={{ color: "#A9A9A9", paddingLeft: "25px !important" }}
            />
            <p>Comments</p>
          </div>
        </div>
      </div>

      {/* ANOTHER SHORT HAND  */}

      <div
        className={theme ? "main-section3-new" : "main-section3-new light-mode"}
        style={
          studioMenuClicked === false
            ? { display: "none" }
            : { display: "flex", width: "90px" }
        }
      >
        <div
          className={
            theme
              ? "first-panel first-panel1"
              : "first-panel first-panel1 preview-lightt"
          }
          onClick={() => {
            if (window.location.href.includes(`/studio/video/edit/${id}`)) {
              navigate("/studio/video");
            } else {
              navigate("/studio/comments");
            }
          }}
        >
          <div className="about-video" style={{ right: "0px" }}>
            <WestIcon fontSize="medium" style={{ color: "#aaa" }} />
          </div>
        </div>
        {/* START HERE  */}
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div
            className="mid-panel"
            style={
              loading === true ? { display: "block" } : { display: "none" }
            }
          >
            <div className="redirect-video">
              <Skeleton count={1} width={75} height={42} />
            </div>
          </div>
        </SkeletonTheme>
        {/* END HERE  */}
        <div
          className="mid-panel"
          style={
            videodata && loading === false
              ? { visibility: "visible", display: "block" }
              : { visibility: "hidden", display: "none" }
          }
        >
          <div
            className="redirect-video"
            onClick={() => {
              if (videodata) {
                navigate(`/video/${videodata._id}`);
                window.location.reload();
              }
            }}
          >
            <img
              src={videodata && videodata.thumbnail.url}
              alt="thumbnail"
              className="current-video-thumbnail"
              style={{ width: "70px" }}
            />
            <Tooltip
              TransitionComponent={Zoom}
              title="View on YouTube"
              placement="bottom"
            >
              <YouTubeIcon
                className="watch-video2"
                fontSize="medium"
                style={{ color: "white" }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="second-panel">
          <div
            className={
              VideoEditSection === "Details"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `details panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Video-Edit Section", "Details");
              navigate(`/studio/video/edit/${id}`);
            }}
          >
            <ModeEditOutlineOutlinedIcon
              className={
                VideoEditSection === "Details" ? "studio-icon2" : "studio-icon"
              }
              fontSize="medium"
              style={{
                color: "#A9A9A9",
                paddingLeft: "25px !important",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            />
          </div>
          <div
            className={
              VideoEditSection === "Video-Comments"
                ? `${theme ? "studio-active" : "studio-active-light"} panel ${
                    theme ? "" : "panel-light"
                  }`
                : `comments panel ${theme ? "" : "panel-light"}`
            }
            onClick={() => {
              localStorage.setItem("Video-Edit Section", "Video-Comments");
              navigate(`/studio/video/comments/${id}`);
            }}
          >
            <ChatOutlinedIcon
              className={
                VideoEditSection === "Video-Comments"
                  ? "studio-icon2"
                  : "studio-icon"
              }
              fontSize="medium"
              style={{
                color: "#A9A9A9",
                paddingLeft: "25px !important",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftPanel2;
