import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import nothing from "../img/nothing.png";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import "../Css/likevideos.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylistById } from "../redux/actions/playlistAction";
import { commonNotify, email, formatDate } from "../constant/Api";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Playlists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playlists = useSelector((state) => state.playlist.playlists);

  const { id } = useParams();
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  const [Email, setEmail] = useState(email);
  const [playlistsVideos, setPlaylistsVideos] = useState([]);
  const [playlistDetails, setplaylistDetails] = useState();
  const [isEditmode, setIsEditmode] = useState(false);
  const [PlaylistName, setPlaylistName] = useState("");
  const token = localStorage.getItem("userToken");

  //USE EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    localStorage.setItem("menuClicked", JSON.stringify(menuClicked));
  }, [menuClicked]);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchPlaylistById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setplaylistDetails(playlists);
    setPlaylistName(playlists[0]?.name);
    setPlaylistsVideos(playlists[0]?.videos);
  }, [playlists]);

  document.title =
    PlaylistName && PlaylistName !== undefined
      ? `${PlaylistName} - YouTube`
      : "YouTube";

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

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        commonNotify("Link Copied!");
      })
      .catch((error) => {
        console.log("Error copying link to clipboard:", error);
      });
  };

  if (
    playlistsVideos === "No Playlists Found" ||
    (playlistsVideos && playlistsVideos?.length === 0)
  ) {
    return (
      <>
        <div className="searched-content">
          <img src={nothing} alt="no results" className="nothing-found" />
          <p className="no-results">No videos found!</p>
        </div>
      </>
    );
  }

  if (
    playlistDetails &&
    playlistDetails.owner?.email !== Email &&
    playlistsVideos !== "No Playlists Found" &&
    playlistDetails.playlist_privacy === "Private"
  ) {
    return (
      <>
        <div className="searched-content">
          <img src={nothing} alt="no results" className="nothing-found" />
          <p
            className={
              theme ? "no-results text-dark-mode" : "no-results text-light-mode"
            }
            style={{ fontSize: "16.8px" }}
          >
            This playlist is set to private by the user!
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
        {playlistsVideos && playlistsVideos?.length > 0 ? (
          <div
            className="like-video-sections"
            style={menuClicked === false ? { left: "80px" } : { left: "255px" }}
          >
            <div
              className={
                theme ? "like-left-section" : "like-left-section-light"
              }
              style={{
                backgroundImage: `url(${playlistsVideos[0]?.thumbnail?.url})`,
              }}
            >
              <div className="page-cover">
                {playlistsVideos && (
                  <div
                    className="firstvideo-thumbnail"
                    onClick={() => {
                      if (token) {
                        navigate(`/video/${playlistsVideos[0]._id}`);
                        window.location.reload();
                      } else {
                        navigate(`/video/${playlistsVideos[0]._id}`);
                        window.location.reload();
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
                      src={playlistsVideos[0]?.thumbnail?.url}
                      alt="first-like-thumbnail"
                      className="first-thumbnail playlist-first-thumbnail"
                      loading="lazy"
                      style={
                        loading === true
                          ? { visibility: "hidden", display: "none" }
                          : { visibility: "visible", display: "block" }
                      }
                    />
                    <p className="sample-play">&#9654; PLAY ALL</p>
                  </div>
                )}
                <div className="last-like-section">
                  <div
                    className="like-div"
                    style={
                      isEditmode === false
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                  >
                    <p className="like-head playlist-name-edit">
                      {playlistDetails[0]?.name?.length <= 15
                        ? playlistDetails[0]?.name
                        : `${playlistDetails[0]?.name?.slice(0, 15)}..`}
                    </p>
                  </div>

                  <div
                    className="last-like2"
                    style={
                      isEditmode === true
                        ? { marginTop: "65px" }
                        : { marginTop: "15px" }
                    }
                  >
                    <p
                      className="like-username"
                      onClick={() =>
                        navigate(
                          `/channel/${playlistDetails[0]?.owner[0]?._id}`
                        )
                      }
                    >
                      {playlistDetails?.[0]?.owner?.[0]?.username || " "}
                    </p>

                    <p className="like-total-videos">
                      {playlistsVideos?.length} videos
                    </p>
                  </div>

                  <div className="playlist-btns">
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Share"
                      placement="bottom"
                    >
                      <ReplyOutlinedIcon
                        className="share-playlist"
                        fontSize="medium"
                        style={{ color: "white" }}
                        onClick={handleCopyLink}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div
                  className="playvideo-btn"
                  onClick={() => {
                    if (token) {
                      navigate(`/video/${playlistsVideos[0]._id}`);
                      window.location.reload();
                    } else {
                      navigate(`/video/${playlistsVideos[0]._id}`);
                      window.location.reload();
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
                className="like-right-section"
                style={
                  loading === true ? { display: "block" } : { display: "none" }
                }
              >
                {playlistsVideos?.length > 0
                  ? playlistsVideos?.map((element, index) => {
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
              {playlistsVideos?.length > 0
                ? playlistsVideos?.map((element, index) => {
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
                        <p style={{ color: "#aaa" }}>{index + 1}</p>
                        <div
                          className="liked-videos-all-data playlistvideos"
                          onClick={() => {
                            if (token) {
                              navigate(`/video/${element._id}`);
                            } else {
                              navigate(`/video/${element._id}`);
                            }
                          }}
                        >
                          <img
                            src={element.thumbnail?.url}
                            alt="first-like-thumbnail"
                            loading="lazy"
                          />
                          <p
                            className={
                              theme
                                ? "durationn3 playlist-duration"
                                : "durationn3 playlist-duration text-dark-mode"
                            }
                          >
                            {Math.floor(element.duration / 60) +
                              ":" +
                              (Math.round(element.duration % 60) < 10
                                ? "0" + Math.round(element.duration % 60)
                                : Math.round(element.duration % 60))}
                          </p>
                          <div className="its-content playlist-contentt">
                            {window.innerWidth <= 1000 ? (
                              <p>
                                {element.title?.length <= 50
                                  ? element.title
                                  : `${element.title?.slice(0, 50)}..`}
                              </p>
                            ) : (
                              <p>{element.title}</p>
                            )}

                            <div
                              className={
                                theme
                                  ? "thisvide-oneliner-1"
                                  : "thisvide-oneliner-1 text-light-mode2"
                              }
                            >
                              <p>{element?.owner?.username}</p>

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

                            <p className="liked-views ">
                              {element?.views} views &#183;{" "}
                              {formatDate(element?.createdAt)}
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

      {/* SECONDARY PLAYLIST  */}

      <div
        className={
          theme
            ? "liked-video-data-new"
            : "liked-video-data-new light-mode text-light-mode"
        }
      >
        {playlistsVideos && playlistsVideos?.length > 0 ? (
          <div
            className="like-video-sections2"
            style={menuClicked === false ? { left: "80px" } : { left: "255px" }}
          >
            <div
              className={
                theme ? "like-left-section2" : "like-left-section2-light"
              }
              style={{
                backgroundImage: `url(${playlistsVideos[0]?.thumbnail?.url})`,
              }}
            >
              <div className="page-cover2">
                <div className="playlist-tools">
                  {playlistsVideos && (
                    <div
                      className="firstvideo-thumbnail"
                      onClick={() => {
                        if (token) {
                          navigate(`/video/${playlistsVideos[0]._id}`);
                          window.location.reload();
                        } else {
                          navigate(`/video/${playlistsVideos[0]._id}`);
                          window.location.reload();
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
                        src={playlistsVideos[0].thumbnail?.url}
                        alt="first-like-thumbnail"
                        className="first-thumbnail2 playlist-first-thumbnail"
                        loading="lazy"
                        style={
                          loading === true
                            ? { visibility: "hidden", display: "none" }
                            : { visibility: "visible", display: "block" }
                        }
                      />
                      <p className="sample-play">&#9654; PLAY ALL</p>
                    </div>
                  )}
                  <div className="last-like-section2 playlist-edit-tools">
                    <div
                      className="like-div"
                      style={
                        isEditmode === false
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                    >
                      <p className="like-head playlist-name-edit">
                        {playlistDetails[0].name?.length <= 15
                          ? playlistDetails[0].name
                          : `${playlistDetails[0].name?.slice(0, 15)}..`}
                      </p>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Edit"
                        placement="bottom"
                      >
                        <EditOutlinedIcon
                          className="edit-name-btn"
                          fontSize="medium"
                          style={
                            playlistDetails?.[0]?.owner?.[0]?.email === Email
                              ? { color: "white" }
                              : { display: "none" }
                          }
                          onClick={() => {
                            navigate("/studio/playlist");
                          }}
                        />
                      </Tooltip>
                    </div>

                    <div
                      className="last-like2"
                      style={
                        isEditmode === true
                          ? { marginTop: "65px" }
                          : { marginTop: "15px" }
                      }
                    >
                      <p
                        className="like-username"
                        onClick={() =>
                          navigate(
                            `/channel/${playlistDetails[0]?.owner[0]?._id}`
                          )
                        }
                      >
                        {playlistDetails?.[0]?.owner?.[0]?.username || ""}
                      </p>

                      <p className="like-total-videos">
                        {playlistsVideos?.length} videos
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="playvideo-btn"
                  onClick={() => {
                    if (token) {
                      navigate(`/video/${playlistsVideos[0]._id}`);
                      window.location.reload();
                    } else {
                      navigate(`/video/${playlistsVideos[0]._id}`);
                      window.location.reload();
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
                className="like-right-section2"
                style={
                  loading === true ? { display: "block" } : { display: "none" }
                }
              >
                {playlistsVideos?.length > 0
                  ? playlistsVideos?.map((element, index) => {
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
              className="like-right-section2"
              style={
                loading === true
                  ? { visibility: "hidden", display: "none" }
                  : { visibility: "visible", display: "block" }
              }
            >
              {playlistsVideos?.length > 0
                ? playlistsVideos?.map((element, index) => {
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
                        <p style={{ color: "#aaa" }}>{index + 1}</p>
                        <div
                          className="liked-videos-all-data playlistvideos"
                          onClick={() => {
                            if (token) {
                              navigate(`/video/${element._id}`);
                            } else {
                              navigate(`/video/${element._id}`);
                            }
                          }}
                        >
                          <img
                            src={element.thumbnail?.url}
                            alt="first-like-thumbnail"
                            loading="lazy"
                          />
                          <p
                            className={
                              theme
                                ? "durationn3 playlist-duration"
                                : "durationn3 playlist-duration text-dark-mode"
                            }
                          >
                            {Math.floor(element.duration / 60) +
                              ":" +
                              (Math.round(element.duration % 60) < 10
                                ? "0" + Math.round(element.duration % 60)
                                : Math.round(element.duration % 60))}
                          </p>
                          <div className="its-content playlist-contentt">
                            {window.innerWidth <= 1000 ? (
                              <p>
                                {element.title?.length <= 50
                                  ? element.title
                                  : `${element.title?.slice(0, 50)}..`}
                              </p>
                            ) : (
                              <p>{element.title}</p>
                            )}

                            <div
                              className={
                                theme
                                  ? "thisvide-oneliner-1"
                                  : "thisvide-oneliner-1 text-light-mode2"
                              }
                            >
                              <p>{element?.owner?.username}</p>

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

                            <p className="liked-views ">
                              {element?.views} views &#183;{" "}
                              {formatDate(element?.createdAt)}
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
};

export default Playlists;
