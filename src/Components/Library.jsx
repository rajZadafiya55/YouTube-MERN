import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import jwtDecode from "jwt-decode";
import nothing from "../img/nothing.png";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useState, useEffect } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import "../Css/library.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserWatchHistory } from "../redux/actions/userAction";
import { getAllLikedVideos } from "../redux/actions/likeAction";

const Library = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchHistory = useSelector(
    (state) => state.user.watchHistory.watchHistory
  );
  const likeVideos = useSelector((state) => state.like.videosDetails);

  const [watchlater, setWatchLater] = useState([]);
  const [videolike, setVideolike] = useState([]);
  const [loading, setLoading] = useState(true);
  const [LibraryLoading, setLibraryLoading] = useState(true);
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  document.title = "Library - YouTube";
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    localStorage.setItem("menuClicked", JSON.stringify(menuClicked));
  }, [menuClicked]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      setLibraryLoading(false);
    }, 1200);
  }, []);

  // get watch later
  useEffect(() => {
    dispatch(getUserWatchHistory());
  }, []);

  useEffect(() => {
    setWatchLater(watchHistory);
  }, [watchHistory]);

  // get video like
  useEffect(() => {
    dispatch(getAllLikedVideos());
  }, []);

  useEffect(() => {
    setVideolike(likeVideos);
  }, [likeVideos]);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu");
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
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  const watchLaterArray =
    watchlater && watchlater?.length > 0
      ? watchlater.slice(0, 6) // Get the first four elements if available
      : [];

  const LikedVideosArray =
    videolike && videolike?.length > 0
      ? videolike?.slice(0, 6) // Get the first four elements if available
      : [];

  if (watchlater?.length === 0 && videolike?.length === 0) {
    return (
      <>
        <div className="searched-content">
          <img src={nothing} alt="no results" className="nothing-found" />
          <p className={theme ? "no-results" : "no-results text-light-mode"}>
            No data found!
          </p>
        </div>
      </>
    );
  }

  if (loading === true) {
    return (
      <>
        <div className="main-trending-section">
          <div className="spin23" style={{ top: "200px" }}>
            <span className={theme ? "loader2" : "loader2-light"}></span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="library-section"
        style={{
          left: menuClicked === false ? "150px" : "320px",
        }}
      >
        {/* SKELETON WATCH LATER  */}
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div
            className="watchlater-library"
            style={{
              display:
                LibraryLoading &&
                watchlater &&
                watchlater.savedData !== "NO DATA"
                  ? "block"
                  : "none",
              marginBottom: "20px",
            }}
          >
            <div className="top-watchlater-library">
              <Skeleton count={1} width={160} height={22} />
            </div>
            <div className="watchlater-library-videos">
              {watchLaterArray &&
                watchLaterArray?.map((element, index) => {
                  return (
                    <div className="thiswatchlater-videoss" key={index}>
                      <Skeleton
                        count={1}
                        width={225}
                        height={129}
                        style={{ borderRadius: "8px" }}
                      />

                      <div
                        className="thislibrary-video-details"
                        style={{ position: "relative", top: "14px" }}
                      >
                        <Skeleton count={1} width={220} height={22} />
                        <div className="thisvideo-extra-daataa">
                          <div
                            className={
                              theme
                                ? "thisvide-oneliner-1"
                                : "thisvide-oneliner-1 text-light-mode2"
                            }
                          >
                            <Skeleton count={1} width={180} height={14} />
                          </div>
                          <div className="thisvide-oneliner-2"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </SkeletonTheme>

        <div
          className="watchlater-library"
          style={{
            visibility: LibraryLoading ? "hidden" : "visible",
            display:
              !LibraryLoading &&
              watchlater &&
              watchlater.savedData !== "NO DATA"
                ? "block"
                : "none",
          }}
        >
          <div className="top-watchlater-library">
            <div
              className={
                theme
                  ? "top-watch-left"
                  : "top-watch-left text-light-mode light-mode"
              }
            >
              <WatchLaterOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
              <p onClick={() => navigate("/watchlater")}>Watch later</p>
              <p>{watchlater && watchlater?.length}</p>
            </div>
            {watchLaterArray && watchLaterArray?.length >= 6 ? (
              <p
                className="see-all"
                onClick={() => {
                  navigate("/watchlater");
                }}
              >
                See all
              </p>
            ) : (
              ""
            )}
          </div>
          <div
            className={
              theme
                ? "watchlater-library-videos"
                : "watchlater-library-videos light-mode"
            }
          >
            {watchLaterArray &&
              watchLaterArray?.map((element, index) => {
                return (
                  <div
                    className="thiswatchlater-videoss"
                    key={index}
                    onClick={() => {
                      navigate(`/video/${element._id}`);
                      window.location.reload();
                    }}
                  >
                    <img
                      src={element.thumbnail?.url}
                      alt="thumbnail"
                      className="thiswatch-thumbnail"
                    />
                    <p
                      className={
                        theme
                          ? "thislibrary-duration"
                          : "thislibrary-duration text-dark-mode"
                      }
                    >
                      {Math.floor(element.duration / 60) +
                        ":" +
                        (Math.round(element.duration % 60) < 10
                          ? "0" + Math.round(element.duration % 60)
                          : Math.round(element.duration % 60))}
                    </p>
                    <div className="thislibrary-video-details">
                      <p>
                        {element.title && element.title?.length <= 46
                          ? element.title
                          : `${element.title?.slice(0, 46)}..`}
                      </p>
                      <div className="thisvideo-extra-daataa">
                        <div
                          className={
                            theme
                              ? "thisvide-oneliner-1"
                              : "thisvide-oneliner-1 text-light-mode2"
                          }
                        >
                          <p>{element.owner?.username}</p>
                          <Tooltip
                            TransitionComponent={Zoom}
                            title="Verified"
                            placement="right"
                          >
                            <CheckCircleIcon
                              fontSize="100px"
                              style={{
                                color: "rgb(138, 138, 138)",
                                marginLeft: "4px",
                              }}
                            />
                          </Tooltip>
                        </div>
                        <div className="thisvide-oneliner-2">
                          <p
                            className={
                              theme
                                ? "thisvideo-uploaddate"
                                : "thisvideo-uploaddate text-light-mode2"
                            }
                          >
                            {(() => {
                              const timeDifference =
                                new Date() - new Date(element.createdAt);
                              const minutes = Math.floor(
                                timeDifference / 60000
                              );
                              const hours = Math.floor(
                                timeDifference / 3600000
                              );
                              const days = Math.floor(
                                timeDifference / 86400000
                              );
                              const weeks = Math.floor(
                                timeDifference / 604800000
                              );
                              const years = Math.floor(
                                timeDifference / 31536000000
                              );

                              if (minutes < 1) {
                                return "just now";
                              } else if (minutes < 60) {
                                return `${minutes} mins ago`;
                              } else if (hours < 24) {
                                return `${hours} hours ago`;
                              } else if (days < 7) {
                                return `${days} days ago`;
                              } else if (weeks < 52) {
                                return `${weeks} weeks ago`;
                              } else {
                                return `${years} years ago`;
                              }
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <hr
          className={theme ? "seperate" : "seperate-light"}
          style={
            watchlater && watchlater.savedData !== "NO DATA"
              ? { display: "block" }
              : { display: "none" }
          }
        />

        {/* SKELETON LIKE VIDEOS  */}
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div
            className="likedvideos-library"
            style={{
              display:
                LibraryLoading && videolike && videolike !== "NO DATA"
                  ? "block"
                  : "none",
            }}
          >
            <div className="top-watchlater-library">
              <Skeleton count={1} width={160} height={22} />
            </div>
            <div className="watchlater-library-videos">
              {LikedVideosArray &&
                LikedVideosArray.map((element, index) => {
                  return (
                    <div className="thiswatchlater-videoss" key={index}>
                      <Skeleton
                        count={1}
                        width={225}
                        height={129}
                        style={{ borderRadius: "8px" }}
                      />
                      <div
                        className="thislibrary-video-details"
                        style={{ position: "relative", top: "12px" }}
                      >
                        <Skeleton count={1} width={210} height={22} />

                        <div className="thisvideo-extra-daataa">
                          <Skeleton count={1} width={180} height={18} />

                          <div className="thisvide-oneliner-2">
                            <Skeleton count={1} width={140} height={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </SkeletonTheme>
        <div
          className="likedvideos-library"
          style={{
            visibility: LibraryLoading ? "hidden" : "visible",
            display:
              LibraryLoading || (videolike && videolike === "NO DATA")
                ? "none"
                : "block",
          }}
        >
          <div className="top-watchlater-library">
            <div
              className={
                theme ? "top-like-lefttt" : "top-like-lefttt text-light-mode"
              }
            >
              <ThumbUpOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
              <p onClick={() => navigate("/likedVideos")}>Liked videos</p>
              <p>{videolike && videolike?.length}</p>
            </div>
            {LikedVideosArray && LikedVideosArray?.length >= 6 ? (
              <p
                className="see-all"
                onClick={() => {
                  navigate(`/likedVideos`);
                }}
              >
                See all
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="watchlater-library-videos">
            {LikedVideosArray &&
              LikedVideosArray?.map((element, index) => {
                return (
                  <div
                    className="thiswatchlater-videoss"
                    key={index}
                    onClick={() => {
                      navigate(`/video/${element.videos._id}`);
                      window.location.reload();
                    }}
                  >
                    <img
                      src={element.videos.thumbnail?.url}
                      alt="thumbnail"
                      className="thiswatch-thumbnail"
                    />
                    <p
                      className={
                        theme
                          ? "thislibrary-duration"
                          : "thislibrary-duration text-dark-mode"
                      }
                    >
                      {Math.floor(element.videos.duration / 60) +
                        ":" +
                        (Math.round(element.videos.duration % 60) < 10
                          ? "0" + Math.round(element.videos.duration % 60)
                          : Math.round(element.videos.duration % 60))}
                    </p>
                    <div
                      className={
                        theme
                          ? "thislibrary-video-details"
                          : "thislibrary-video-details light-mode"
                      }
                    >
                      <p>
                        {element.videos.title &&
                        element.videos.title?.length <= 46
                          ? element.videos.title
                          : `${element.videos.title?.slice(0, 46)}..`}
                      </p>
                      <div className="thisvideo-extra-daataa">
                        <div
                          className={
                            theme
                              ? "thisvide-oneliner-1"
                              : "thisvide-oneliner-1 text-light-mode2"
                          }
                        >
                          <p>{element.videos.owner?.username}</p>
                          <Tooltip
                            TransitionComponent={Zoom}
                            title="Verified"
                            placement="right"
                          >
                            <CheckCircleIcon
                              fontSize="100px"
                              style={{
                                color: "rgb(138, 138, 138)",
                                marginLeft: "4px",
                              }}
                            />
                          </Tooltip>
                        </div>
                        <div className="thisvide-oneliner-2">
                          <p
                            className={
                              theme
                                ? "thisvideo-uploaddate"
                                : "thisvideo-uploaddate text-light-mode2"
                            }
                          >
                            {(() => {
                              const timeDifference =
                                new Date() - new Date(element.videos.createdAt);
                              const minutes = Math.floor(
                                timeDifference / 60000
                              );
                              const hours = Math.floor(
                                timeDifference / 3600000
                              );
                              const days = Math.floor(
                                timeDifference / 86400000
                              );
                              const weeks = Math.floor(
                                timeDifference / 604800000
                              );
                              const years = Math.floor(
                                timeDifference / 31536000000
                              );

                              if (minutes < 1) {
                                return "just now";
                              } else if (minutes < 60) {
                                return `${minutes} mins ago`;
                              } else if (hours < 24) {
                                return `${hours} hours ago`;
                              } else if (days < 7) {
                                return `${days} days ago`;
                              } else if (weeks < 52) {
                                return `${weeks} weeks ago`;
                              } else {
                                return `${years} years ago`;
                              }
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Library;
