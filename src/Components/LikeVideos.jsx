import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import nothing from "../img/nothing.png";
import "../Css/likevideos.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllLikedVideos } from "../redux/actions/likeAction";
import { Tooltip, Zoom } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatDate } from "../constant/Api";

function LikeVideos() {
  const dispatch = useDispatch();
  const likeVideosFromRedux = useSelector((state) => state.like.videosDetails);

  const [likeVideos, setLikedVideos] = useState([]);

  const navigate = useNavigate();
  const [name, setName] = useState();
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  const token = localStorage.getItem("userToken");
  document.title = "Liked videos - YouTube";

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setName(jwtDecode(token).name);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    localStorage.setItem("menuClicked", JSON.stringify(menuClicked));
  }, [menuClicked]);

  useEffect(() => {
    dispatch(getAllLikedVideos());
  }, []);

  useEffect(() => {
    setLikedVideos(likeVideosFromRedux);
  }, [likeVideosFromRedux]);

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

  if (
    !Array.isArray(likeVideos) ||
    likeVideos.length === 0 ||
    likeVideos === "NO DATA"
  ) {
    return (
      <>
        <div className="searched-content">
          <img src={nothing} alt="no results" className="nothing-found" />
          <p className={theme ? "no-results" : "no-results text-light-mode"}>
            No videos found!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={
          theme
            ? "liked-video-data"
            : "liked-video-data light-mode text-light-mode"
        }
      >
        {likeVideos.length > 0 ? (
          <div
            className="like-video-sections"
            style={menuClicked === false ? { left: "80px" } : { left: "255px" }}
          >
            <div
              className={
                theme ? "like-left-section" : "like-left-section-light"
              }
              style={{
                backgroundImage: `url(${likeVideos[0]?.videos.thumbnail.url})`,
              }}
            >
              <div className="page-cover">
                {likeVideos && (
                  <div
                    className="firstvideo-thumbnail"
                    onClick={() => {
                      if (token) {
                        setTimeout(() => {
                          navigate(`/video/${likeVideos[0].videos._id}`);
                        }, 400);
                      } else {
                        navigate(`/video/${likeVideos[0].videos._id}`);
                      }
                    }}
                  >
                    <SkeletonTheme
                      baseColor={theme ? "#353535" : "#aaaaaa"}
                      highlightColor={theme ? "#444" : "#b6b6b6"}
                    >
                      <div
                        className="thisimggg"
                        style={
                          loading === true
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <Skeleton
                          count={1}
                          width={310}
                          height={174}
                          style={{ borderRadius: "12px" }}
                          className="sk-watch-bigimg"
                        />
                      </div>
                    </SkeletonTheme>
                    <img
                      src={likeVideos[0]?.videos.thumbnail.url}
                      alt="first-like-thumbnail"
                      className="first-thumbnail"
                      loading="lazy"
                      style={
                        loading === true
                          ? { visibility: "hidden", display: "none" }
                          : { visibility: "visible", display: "block" }
                      }
                    />
                    <p
                      className="sample-play"
                      style={{ pointerEvents: "none" }}
                    >
                      &#9654; PLAY ALL
                    </p>
                  </div>
                )}
                <div className="last-like-section">
                  <p className="like-head">Liked videos</p>
                  <div className="last-like2">
                    <p className="like-username">{name}</p>
                    <p className="like-total-videos">
                      {likeVideos.length} videos
                    </p>
                  </div>
                </div>
                <div
                  className="playvideo-btn"
                  onClick={() => {
                    if (token) {
                      setTimeout(() => {
                        navigate(`/video/${likeVideos[0].videos._id}`);
                      }, 400);
                    } else {
                      navigate(`/video/${likeVideos[0].videos._id}`);
                    }
                  }}
                >
                  <PlayArrowIcon fontSize="medium" style={{ color: "black" }} />
                  <p className="play-all">Play all</p>
                </div>
              </div>
            </div>
            <SkeletonTheme
              baseColor={theme ? "#353535" : "#aaaaaa"}
              highlightColor={theme ? "#444" : "#b6b6b6"}
            >
              <div
                className="like-right-section sk-right-like"
                style={
                  loading === true ? { display: "block" } : { display: "none" }
                }
              >
                {likeVideos.length > 0
                  ? likeVideos?.map((element, index) => {
                      return (
                        <div
                          className={
                            theme
                              ? "liked-all-videos"
                              : "liked-all-videos liked-all-videos-light text-light-mode"
                          }
                          key={index}
                          style={{
                            display:
                              element.isPublished === true ? "flex" : "none",
                          }}
                        >
                          <div className="liked-videos-all-data">
                            <Skeleton
                              count={1}
                              width={180}
                              height={101}
                              style={{ borderRadius: "12px" }}
                              className="sk-watch-thumbnail"
                            />
                            <div
                              className="its-content"
                              style={{
                                position: "relative",
                                left: "10px",
                                top: "6px",
                              }}
                            >
                              <Skeleton
                                count={1}
                                width={450}
                                height={20}
                                className="sk-watch-title"
                              />
                              <Skeleton
                                count={1}
                                width={250}
                                height={16}
                                style={{ position: "relative", top: "10px" }}
                                className="sk-watch-channel"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </SkeletonTheme>
            <div
              className="like-right-section"
              style={
                loading === true
                  ? { visibility: "hidden", display: "none" }
                  : { visibility: "visible", display: "block" }
              }
            >
              {likeVideos.length > 0
                ? likeVideos?.map((element, index) => {
                    return (
                      <div
                        className={
                          theme
                            ? "liked-all-videos"
                            : "liked-all-videos liked-all-videos-light text-light-mode"
                        }
                        key={index}
                        style={{
                          display:
                            element.videos.isPublished === true
                              ? "flex"
                              : "none",
                        }}
                      >
                        <p style={{ color: "#aaa" }}>{index + 1}</p>
                        <div
                          className="liked-videos-all-data"
                          onClick={() => {
                            if (token) {
                              setTimeout(() => {
                                navigate(`/video/${element.videos._id}`);
                              }, 400);
                            } else {
                              navigate(`/video/${element.videos._id}`);
                            }
                          }}
                        >
                          <img
                            src={element.videos.thumbnail.url}
                            alt="first-like-thumbnail"
                            loading="lazy"
                          />
                          <p
                            className={
                              theme ? "durationn3" : "durationn3 text-dark-mode"
                            }
                          >
                            {Math.floor(element.videos.duration / 60) +
                              ":" +
                              (Math.round(element.videos.duration % 60) < 10
                                ? "0" + Math.round(element.videos.duration % 60)
                                : Math.round(element.videos.duration % 60))}
                          </p>
                          <div className="its-content">
                            {window.innerWidth <= 1000 ? (
                              <p>{element.videos.title}</p>
                            ) : (
                              <p>{element.videos.title}</p>
                            )}

                            <div
                              className={
                                theme
                                  ? "thisvide-oneliner-1"
                                  : "thisvide-oneliner-1 text-light-mode2"
                              }
                            >
                              <p className="">
                                {element.videos.owner.username}
                              </p>
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

                            <p className="liked-views">
                              {element.videos.views} views &#183;{" "}
                              {formatDate(element.videos.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        ) : (
          <div className="main-trending-section">
            <div className="spin23" style={{ top: "200px" }}>
              <span className={theme ? "loader2" : "loader2-light"}></span>
            </div>
          </div>
        )}
      </div>

      {/* SECONDARY WATCH LATER */}

      <div
        className={
          theme
            ? "liked-video-data-new"
            : "liked-video-data-new text-light-mode light-mode"
        }
      >
        {likeVideos.length > 0 ? (
          <div
            className="like-video-sections2"
            style={menuClicked === false ? { left: "80px" } : { left: "255px" }}
          >
            <div
              className={
                theme ? "like-left-section2" : "like-left-section2-light"
              }
              style={{
                backgroundImage: `url(${likeVideos[0]?.videos.thumbnail.url})`,
              }}
            >
              <div className="page-cover2">
                <div className="inside-cover">
                  {likeVideos && (
                    <div
                      className="firstvideo-thumbnail"
                      onClick={() => {
                        if (token) {
                          setTimeout(() => {
                            navigate(`/video/${likeVideos[0].videos._id}`);
                          }, 400);
                        } else {
                          navigate(`/video/${likeVideos[0].videos._id}`);
                        }
                      }}
                    >
                      <SkeletonTheme
                        baseColor={theme ? "#353535" : "#aaaaaa"}
                        highlightColor={theme ? "#444" : "#b6b6b6"}
                      >
                        <div
                          className="thisimggg"
                          style={
                            loading === true
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <Skeleton
                            count={1}
                            width={310}
                            height={174}
                            style={{ borderRadius: "12px" }}
                            className="sk-watch-bigimg"
                          />
                        </div>
                      </SkeletonTheme>
                      <img
                        src={likeVideos[0]?.videos.thumbnail.url}
                        alt="first-like-thumbnail"
                        className="first-thumbnail2"
                        loading="lazy"
                        style={
                          loading === true
                            ? { visibility: "hidden", display: "none" }
                            : { visibility: "visible", display: "block" }
                        }
                      />
                      <p
                        className="sample-play"
                        style={{ pointerEvents: "none" }}
                      >
                        &#9654; PLAY ALL
                      </p>
                    </div>
                  )}
                  <div className="last-like-section2">
                    <p className="like-head">Liked videos</p>
                    <div className="last-like2">
                      <p className="like-username">{name}</p>
                      <p className="like-total-videos">
                        {likeVideos.length} videos
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="playvideo-btn"
                  onClick={() => {
                    if (token) {
                      setTimeout(() => {
                        navigate(`/video/${likeVideos[0].videos._id}`);
                      }, 400);
                    } else {
                      navigate(`/video/${likeVideos[0].videos._id}`);
                    }
                  }}
                >
                  <PlayArrowIcon fontSize="medium" style={{ color: "black" }} />
                  <p className="play-all">Play all</p>
                </div>
              </div>
            </div>
            <SkeletonTheme
              baseColor={theme ? "#353535" : "#aaaaaa"}
              highlightColor={theme ? "#444" : "#b6b6b6"}
            >
              <div
                className="like-right-section2  sk-right-like"
                style={
                  loading === true ? { display: "block" } : { display: "none" }
                }
              >
                {likeVideos.length > 0
                  ? likeVideos?.map((element, index) => {
                      return (
                        <div
                          className={
                            theme
                              ? "liked-all-videos"
                              : "liked-all-videos liked-all-videos-light text-light-mode"
                          }
                          key={index}
                          style={{
                            display:
                              element.videos.isPublished === true
                                ? "flex"
                                : "none",
                          }}
                        >
                          <div className="liked-videos-all-data">
                            <Skeleton
                              count={1}
                              width={180}
                              height={101}
                              style={{ borderRadius: "12px" }}
                              className="sk-watch-thumbnail"
                            />
                            <div
                              className="its-content"
                              style={{
                                position: "relative",
                                left: "10px",
                                top: "6px",
                              }}
                            >
                              <Skeleton
                                count={1}
                                width={450}
                                height={20}
                                className="sk-watch-title"
                              />
                              <Skeleton
                                count={1}
                                width={250}
                                height={16}
                                style={{ position: "relative", top: "10px" }}
                                className="sk-watch-channel"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </SkeletonTheme>
            <div
              className="like-right-section2"
              style={
                loading === true
                  ? { visibility: "hidden", display: "none" }
                  : { visibility: "visible", display: "block" }
              }
            >
              {likeVideos.length > 0
                ? likeVideos?.map((element, index) => {
                    return (
                      <div
                        className={
                          theme
                            ? "liked-all-videos"
                            : "liked-all-videos liked-all-videos-light text-light-mode"
                        }
                        key={index}
                        style={{
                          display:
                            element.videos.isPublished === true
                              ? "flex"
                              : "none",
                        }}
                      >
                        <p style={{ color: "#aaa" }}>{index + 1}</p>
                        <div
                          className="liked-videos-all-data2"
                          onClick={() => {
                            if (token) {
                              setTimeout(() => {
                                navigate(`/video/${element.videos._id}`);
                              }, 400);
                            } else {
                              navigate(`/video/${element.videos._id}`);
                            }
                          }}
                        >
                          <img
                            src={element.videos.thumbnail.url}
                            alt="first-like-thumbnail"
                            loading="lazy"
                          />
                          <p
                            className={
                              theme ? "durationn3" : "durationn3 text-dark-mode"
                            }
                          >
                            {Math.floor(element.videos.duration / 60) +
                              ":" +
                              (Math.round(element.videos.duration % 60) < 10
                                ? "0" + Math.round(element.videos.duration % 60)
                                : Math.round(element.videos.duration % 60))}
                          </p>
                          <div className="its-content2">
                            {window.innerWidth <= 1000 ? (
                              <p>{element.videos.title}</p>
                            ) : (
                              <p>{element.videos.title}</p>
                            )}

                            <div
                              className={
                                theme
                                  ? "thisvide-oneliner-1"
                                  : "thisvide-oneliner-1 text-light-mode2"
                              }
                            >
                              <p className="">
                                {element.videos.owner.username}
                              </p>
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
                            <p className="liked-views">
                              {element.videos.views} views &#183;{" "}
                              {formatDate(element.videos.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        ) : (
          <div className="main-trending-section">
            <div className="spin23" style={{ top: "200px" }}>
              <span className={theme ? "loader2" : "loader2-light"}></span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LikeVideos;
