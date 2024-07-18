import "../Css/browse.css";
import { useEffect, useState, useMemo } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../Css/theme.css";
import { useNavigate } from "react-router-dom";
import { showLoginToast } from "../constant/Api";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../redux/actions/videoAction";

const Browse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => state.videos.searchTerm);
  const AllVideo = useSelector((state) => state.videos.videosDetails);

  const [videoDetails, setVideoDetails] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const [TagsSelected, setTagsSelected] = useState("All");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
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

  const Tags = [
    "All",
    "Artificial Intelligence",
    "Comedy",
    "Gaming",
    "Vlog",
    "Beauty",
    "Travel",
    "Food",
    "Fashion",
  ];

  useEffect(() => {
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getAllVideos());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setVideoDetails(AllVideo);
  }, [AllVideo]);

  const filteredVideosMemo = useMemo(() => {
    if (searchTerm) {
      return videoDetails.filter(
        (video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.owner[0].username
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }
    return videoDetails;
  }, [searchTerm, videoDetails]);

  useEffect(() => {
    setFilteredVideos(filteredVideosMemo);
  }, [filteredVideosMemo]);

  return (
    <>
      <SkeletonTheme
        baseColor={theme ? "#353535" : "#aaaaaa"}
        highlightColor={theme ? "#444" : "#b6b6b6"}
      >
        <div
          className={theme ? "browse" : "browse light-mode"}
          style={loading ? { display: "flex" } : { display: "none" }}
        >
          <div
            className={
              menuClicked
                ? `browse-data ${theme ? "" : "light-mode"}`
                : `browse-data2 ${theme ? "" : "light-mode"}`
            }
            style={menuClicked ? { left: "250px" } : { left: "74px" }}
          >
            <div
              className={
                theme ? "popular-categories" : "popular-categories light-mode"
              }
            >
              {Tags.map((element, index) => (
                <div
                  className={
                    TagsSelected === element
                      ? `top-tags ${theme ? "tag-color" : "tag-color-light"}`
                      : `top-tags ${theme ? "" : "tagcolor-newlight"}`
                  }
                  key={index}
                >
                  <p>{element}</p>
                </div>
              ))}
            </div>
            <div
              className="video-section"
              style={{
                marginLeft: "40px",
              }}
            >
              <div className="uploaded-videos">
                {Array.from({ length: 16 }).map((_, index) => (
                  <div className="video-data" key={index}>
                    <Skeleton
                      count={1}
                      width={330}
                      height={186}
                      style={{ borderRadius: "12px" }}
                      className="sk-browse-vid"
                    />
                    <div className="channel-basic-data">
                      <Skeleton
                        count={1}
                        width={40}
                        height={40}
                        style={{ borderRadius: "100%", marginTop: "40px" }}
                        className="sk-browse-profile"
                      />
                      <Skeleton
                        count={2}
                        width={250}
                        height={15}
                        style={{
                          position: "relative",
                          top: "40px",
                          left: "15px",
                        }}
                        className="sk-browse-title"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>

      <div
        className={theme ? "browse" : "browse light-mode"}
        style={
          loading
            ? { visibility: "hidden", display: "none" }
            : { visibility: "visible", display: "flex" }
        }
      >
        <div
          className={
            menuClicked
              ? `browse-data ${theme ? "" : "light-mode"}`
              : `browse-data2 ${theme ? "" : "light-mode"}`
          }
          style={menuClicked ? { left: "250px" } : { left: "74px" }}
        >
          <div
            className={
              theme ? "popular-categories" : "popular-categories light-mode"
            }
          >
            {Tags.map((element, index) => (
              <div
                className={
                  TagsSelected === element
                    ? `top-tags ${theme ? "tag-color" : "tag-color-light"}`
                    : `top-tags ${theme ? "" : "tagcolor-newlight"}`
                }
                key={index}
              >
                <p>{element}</p>
              </div>
            ))}
          </div>

          <div
            className="video-section"
            style={{
              marginLeft: "40px",
            }}
          >
            <div
              className="uploaded-videos"
              style={{
                paddingRight: menuClicked ? "50px" : "0px",
                display: TagsSelected === "All" ? "grid" : "none",
              }}
            >
              {filteredVideos && filteredVideos.length > 0 ? (
                filteredVideos.map((element, index) => {
                  const {
                    thumbnail,
                    title,
                    views,
                    createdAt,
                    owner,
                    duration,
                  } = element;

                  const publishDate = new Date(createdAt);
                  const timeDifference = new Date() - publishDate;
                  const minutes = Math.floor(timeDifference / 60000);
                  const hours = Math.floor(timeDifference / 3600000);
                  const days = Math.floor(timeDifference / 86400000);
                  const weeks = Math.floor(timeDifference / 604800000);
                  const years = Math.floor(timeDifference / 31536000000);
                  let timeAgo = "just now";

                  if (minutes >= 1) {
                    if (minutes < 60) timeAgo = `${minutes} mins ago`;
                    else if (hours < 24) timeAgo = `${hours} hours ago`;
                    else if (days < 7) timeAgo = `${days} days ago`;
                    else if (weeks < 52) timeAgo = `${weeks} weeks ago`;
                    else timeAgo = `${years} years ago`;
                  }

                  const roundedDuration = Math.round(duration);
                  const durationMinutes = Math.floor(roundedDuration / 60);
                  const durationSeconds = roundedDuration % 60;

                  return (
                    <div
                      className="video-data"
                      key={element._id}
                      style={{
                        display: element.isPublished ? "block" : "none",
                      }}
                      onClick={() => {
                        if (token) {
                          setTimeout(() => {
                            navigate(`/video/${element._id}`);
                            window.location.reload();
                          }, 400);
                        } else {
                          showLoginToast();
                        }
                      }}
                    >
                      <img
                        style={{ width: "330px", borderRadius: "10px" }}
                        src={thumbnail.url}
                        alt="thumbnails"
                        className="browse-thumbnails"
                      />
                      <p className="duration">
                        {durationMinutes}:
                        {durationSeconds < 10
                          ? `0${durationSeconds}`
                          : durationSeconds}
                      </p>

                      <div
                        className={
                          theme
                            ? "channel-basic-data"
                            : "channel-basic-data text-light-mode"
                        }
                      >
                        <div className="channel-pic">
                          <img
                            className="channel-profile"
                            src={owner[0].avatar}
                            alt="channel-profile"
                          />
                        </div>
                        <div className="channel-text-data">
                          <p className="title" style={{ marginTop: "10px" }}>
                            {title.length <= 60
                              ? title
                              : `${title.slice(0, 55)}..`}
                          </p>
                          <div className="video-uploader">
                            <Tooltip
                              TransitionComponent={Zoom}
                              title={owner[0].username}
                              placement="top"
                            >
                              <p
                                className={
                                  theme
                                    ? "uploader"
                                    : "uploader text-light-mode2"
                                }
                                style={{ marginTop: "10px" }}
                              >
                                {owner[0].username}
                              </p>
                            </Tooltip>

                            <Tooltip
                              TransitionComponent={Zoom}
                              title="Verified"
                              placement="right"
                            >
                              <CheckCircleIcon
                                fontSize="100px"
                                style={{
                                  color: "rgb(138, 138, 138)",
                                  marginTop: "8px",
                                  marginLeft: "4px",
                                }}
                              />
                            </Tooltip>
                          </div>

                          <div
                            className={
                              theme ? "view-time" : "view-time text-light-mode2"
                            }
                          >
                            <p className="views">
                              {views >= 1e9
                                ? `${(views / 1e9).toFixed(1)}B`
                                : views >= 1e6
                                ? `${(views / 1e6).toFixed(1)}M`
                                : views >= 1e3
                                ? `${(views / 1e3).toFixed(1)}K`
                                : views}{" "}
                              views
                            </p>
                            <p
                              className="upload-time"
                              style={{ marginLeft: "4px" }}
                            >
                              &#x2022; {timeAgo}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-data-found">No data found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
