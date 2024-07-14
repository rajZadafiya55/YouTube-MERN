import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Plyr from "plyr";
import Share from "./Share";
import "../Css/videoSection.css";
import "plyr/dist/plyr.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Zoom from "@mui/material/Zoom";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { LiaDownloadSolid } from "react-icons/lia";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import Uavatar from "../img/avatar.png";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LeftPanel from "./LeftPanel";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideos,
  getSelectedVideo,
  toggleWatchLater,
  updateVideoViews,
} from "../redux/actions/videoAction";
import {
  createComment,
  deleteCommentsDetails,
  getSelectedComment,
} from "../redux/actions/commentAction";
import { APIHttp, EmptyMessage, avatar, email } from "../constant/Api";
import {
  getLikeCommentToggle,
  getLikeVideoToggle,
} from "../redux/actions/likeAction";
import {
  fetchSubscriptionsDetails,
  getSubscriptionToggle,
} from "../redux/actions/subscriptionAction";
import { getUserWatchHistory } from "../redux/actions/userAction";
import axios from "axios";
import { ThumbDown } from "@mui/icons-material";

const VideoSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get state
  const selectedVideo = useSelector((state) => state.videos.selectedVideo);
  const selectedComment = useSelector(
    (state) => state.comments.selectedComment
  );
  const listVideo = useSelector((state) => state.videos.videosDetails);

  const [listVideoDetails, setListVideoDetails] = useState([]);

  const isLikedComment = useSelector((state) => state.like.isLiked);

  const isWatchLater = useSelector((state) => state.videos.isWatchLater);

  const watchHistory = useSelector(
    (state) => state.user.watchHistory.watchHistory
  );

  const [isHistory, setIsHistory] = useState();
  const { id } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [loginEmail, setLoginEmail] = useState(email);
  const [Display, setDisplay] = useState("none");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [shareClicked, setShareClicked] = useState(false);
  const [isbtnClicked, setisbtnClicked] = useState(false);
  const videoRef = useRef(null);
  const [TagSelected, setTagSelected] = useState("All");
  const [checkTrending, setCheckTrending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendLoading, setRecommendLoading] = useState(true);
  const token = localStorage.getItem("userToken");
  const [likeLoading, setLikeLoading] = useState(false);
  const [seeDesc, setSeeDesc] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentOpacity, setCommentOpacity] = useState(1);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  // const [plyrInitialized, setPlyrInitialized] = useState(false);

  //EXTRAS
  const [createPlaylistClicked, setcreatePlaylistClicked] = useState(false);
  const [privacyClicked, setprivacyClicked] = useState(false);
  const [playlistClicked, setPlaylistClicked] = useState(false);
  const [privacy, setPrivacy] = useState("Public");
  const [playlistName, setPlaylistName] = useState("");
  const [UserPlaylist, setUserPlaylist] = useState([]);
  const [playlistID, setplaylistID] = useState([]);
  const [isHeart, setIsHeart] = useState([]);

  //Signup user Profile Pic
  const [userProfile, setUserProfile] = useState(avatar);

  // auto incriment views =====================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.patch(`${APIHttp}videos/views/${id}`);
      } catch (error) {
        console.error("=====> view error", error.message);
      }
    };

    fetchData();
  }, [id]);

  // videoID based patch view api
  useEffect(() => {
    dispatch(updateVideoViews(id));
  }, [dispatch, id]);

  // USE EFFECTS
  useEffect(() => {
    function handleResize() {
      window.innerWidth <= 1100;
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  useEffect(() => {
    const handleClick = () => {
      setShareClicked(false);
      document.body.classList.remove("bg-css");
    };

    const cancelShare = document.querySelector(".cancel-share");

    if (cancelShare) {
      cancelShare.addEventListener("click", handleClick);
    }

    return () => {
      if (cancelShare) {
        cancelShare.removeEventListener("click", handleClick);
      }
    };
  });

  // get videoData

  useEffect(() => {
    const getVideoData = async () => {
      try {
        if (id !== undefined) {
          dispatch(getSelectedVideo(id));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getVideoData();
  }, [dispatch, id]);

  useEffect(() => {
    setVideoData(selectedVideo);
  }, [selectedVideo]);

  useEffect(() => {
    dispatch(getAllVideos());
  }, []);

  useEffect(() => {
    setListVideoDetails(listVideo);
  }, [listVideo]);

  // get all comment
  useEffect(() => {
    const getComments = async () => {
      try {
        if (id !== undefined) {
          dispatch(getSelectedComment(id));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [id]);

  useEffect(() => {
    setComments(selectedComment);
  }, [selectedComment]);

  useEffect(() => {
    setTimeout(() => {
      setRecommendLoading(false);
    }, 1200);
  }, []);

  //POST REQUESTS
  const uploadComment = async (_id) => {
    try {
      setCommentLoading(true);
      dispatch(createComment(_id, comment));
      setCommentLoading(false);
      setComment("");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(getUserWatchHistory());
  }, []);

  useEffect(() => {
    if (videoData && watchHistory) {
      const matchingHistory = watchHistory.find(
        (element) => element._id === videoData._id
      );
      if (matchingHistory) {
        setIsHistory(matchingHistory.isWatchLater);
      } else {
        setIsHistory(false);
      }
    }
  }, [videoData, watchHistory]);

  useEffect(() => {
    if (videoData?.owner?._id) {
      dispatch(fetchSubscriptionsDetails(videoData.owner._id));
    }
  }, [dispatch, videoData?.owner?._id]);


  if (!videoData) {
    return (
      <>
        <div
          className={
            theme ? "main-video-section2" : "main-video-section2 light-mode"
          }
        >
          <div className="spin23">
            <span className={theme ? "loader2" : "loader2-light"}></span>
          </div>
        </div>
      </>
    );
  }

  const {
    _id,
    videoFile: videoURL,
    title,
    thumbnail: thumbnailURL,
    owner,
    description,
    views,
    likesCount,
    createdAt,
    isPublished,
    subscribersCount,
    isSubscribed,
    likeFlag,
  } = videoData;

  document.title =
    title && title !== undefined ? `${title} - YouTube` : "YouTube";

  const likeVideo = async () => {
    try {
      setLikeLoading(true);

      dispatch(getLikeVideoToggle(id, likeFlag));
      setLikeLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const LikeComment = async (commentId, id) => {
    try {
      dispatch(getLikeCommentToggle(commentId, isLikedComment, _id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const DeleteComment = async (commentId, _id) => {
    try {
      setCommentOpacity(0.34);
      dispatch(deleteCommentsDetails(commentId, _id));
      setCommentOpacity(1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const downloadVideo = () => {
    const link = document.createElement("a");
    link.href = videoURL?.url;
    link.target = "_blank";
    link.download = "video.mp4";
    link.click();
  };

  // watch later
  const saveVideo = async (_id) => {
    try {
      dispatch(toggleWatchLater(_id, isWatchLater));
    } catch (error) {
      console.log(error.message);
    }
  };

  const SubscribeChannel = async (id, channelId) => {
    try {
      await dispatch(getSubscriptionToggle(id, channelId, !isSubscribed));
      dispatch(getSelectedVideo(_id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const menu = document.querySelector(".menu");
  if (menu !== null) {
    menu.style.display = "none";
  }

  const menu2 = document.querySelector(".menu-light");
  if (menu2 !== null) {
    menu2.style.display = "none";
  }

  const formatDescriptionWithLinks = (description) => {
    const linkPattern = /(http|https):\/\/(www\.)?[^\s]+/g;
    const formattedDescription = description.replace(
      linkPattern,
      (match) => `<a href="${match}" target="_blank">${match}</a>`
    );
    return formattedDescription.replace(/\n/g, "<br>");
  };

  if (isPublished === false) {
    return (
      <>
        <Error />
      </>
    );
  }

  return (
    <>
      <div className="my-navbar">
        <Navbar />
      </div>
      <div className="my-panelbar">
        <LeftPanel />
      </div>
      <div
        className={
          theme ? "main-video-section" : "main-video-section light-mode"
        }
      >
        <div className="left-video-section2">
          <div className="videoframe">
            <video
              className="play-video"
              controls
              ref={videoRef}
              poster={thumbnailURL?.url}
            >
              <source src={videoURL?.url} type="video/mp4" />
            </video>
          </div>
          <p
            className={theme ? "trending-tag" : "trending-tag-light"}
            onClick={() => {
              navigate("/trending");
            }}
          >
            {checkTrending === true ? "#TRENDING" : ""}
          </p>
          <p className={theme ? "vid-title" : "vid-title text-light-mode"}>
            {title}
          </p>
          <div className="some-channel-data">
            <div
              className={
                theme
                  ? "channel-left-data"
                  : "channel-left-data text-light-mode"
              }
            >
              <img
                src={owner?.avatar}
                alt="channelDP"
                className="channelDP"
                loading="lazy"
                onClick={() => {
                  navigate(`/channel/${owner?._id}`);
                }}
              />

              <div className="channel-data2">
                <div className="creator">
                  <p
                    style={{ fontSize: "17px", cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/channel/${owner?._id}`);
                    }}
                  >
                    {owner?.username}
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
                <p
                  className={
                    theme ? "channel-subs" : "channel-subs text-light-mode2"
                  }
                >
                  {subscribersCount} subscribers
                </p>
              </div>

              {/* ===================== Subscribe toggle button ====================================== */}
              {!isSubscribed ? (
                <button
                  className={
                    theme
                      ? "subscribe"
                      : `subscribe-light ${
                          loginEmail === owner?.email ? "dull-subs" : ""
                        }`
                  }
                  disabled={loginEmail === owner?.email ? true : false}
                  onClick={() => {
                    SubscribeChannel(owner?._id, _id);
                  }}
                  style={
                    loginEmail === owner?.email
                      ? { cursor: "not-allowed", display: "none" }
                      : { cursor: "pointer", display: "block" }
                  }
                >
                  Subscribe
                </button>
              ) : (
                <button
                  className={
                    theme
                      ? "subscribe subscribe2"
                      : "subscribe subscribe2-light text-light-mode"
                  }
                  disabled={loginEmail === owner?.email ? true : false}
                  onClick={() => {
                    SubscribeChannel(owner?._id, _id);
                  }}
                >
                  Subscribed
                </button>
              )}
            </div>

            <div className="channel-right-data c-right1">
              <div
                className="like-dislike"
                style={
                  likeLoading
                    ? { opacity: 0.46, cursor: "wait", pointerEvents: "none" }
                    : { opacity: 1, cursor: "pointer", pointerEvents: "auto" }
                }
              >
                <Tooltip
                  TransitionComponent={Zoom}
                  title="I like this"
                  placement="top"
                >
                  <div
                    className={
                      theme
                        ? "like-data"
                        : "like-data like-data-light text-light-mode"
                    }
                    onClick={() => {
                      likeVideo();
                    }}
                  >
                    {likeFlag ? (
                      <ThumbUpIcon
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="like-icon"
                      />
                    ) : (
                      <ThumbUpAltOutlinedIcon
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="like-icon"
                      />
                    )}

                    <p className="like-count">{likesCount}</p>
                  </div>
                </Tooltip>
                <div className={theme ? "vl" : "vl-light"}></div>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="I dislike this"
                  placement="top"
                >
                  <div
                    className={`${
                      theme
                        ? "dislike-data"
                        : "dislike-data dislike-data-light text-light-mode"
                    } ${likeFlag ? "d-block" : "d-none"}`}
                    onClick={() => {
                      likeVideo();
                    }}
                  >
                    {likeFlag ? (
                      <ThumbDownOutlinedIcon
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="dislike-icon"
                      />
                    ) : (
                      <ThumbDown
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="dislike-icon"
                      />
                    )}
                  </div>
                </Tooltip>
              </div>
              <Tooltip
                TransitionComponent={Zoom}
                title="Share this video"
                placement="top"
              >
                <div
                  className={
                    theme ? "share" : "share share-light text-light-mode"
                  }
                  onClick={() => {
                    if (shareClicked === false) {
                      setShareClicked(true);
                      document.body.classList.add("bg-css");
                    } else {
                      setShareClicked(false);
                      document.body.classList.remove("bg-css");
                    }
                  }}
                >
                  <ReplyIcon
                    fontSize="medium"
                    style={{
                      color: theme ? "white" : "black",
                      transform: "rotateY(180deg)",
                    }}
                    className="sharee-icon"
                  />
                  <p className="share-txt">Share</p>
                </div>
              </Tooltip>
              <Tooltip
                TransitionComponent={Zoom}
                title="Download this video"
                placement="top"
              >
                <div
                  className={
                    theme
                      ? "download-btn"
                      : "download-btn download-btn-light text-light-mode"
                  }
                  onClick={downloadVideo}
                >
                  <h3>
                    <LiaDownloadSolid
                      className="download-icon"
                      color={theme ? "white" : "black"}
                    />
                  </h3>
                  <p className="download-txt">Download</p>
                </div>
              </Tooltip>
              <Tooltip
                TransitionComponent={Zoom}
                title="Watch Later"
                placement="top"
              >
                <div
                  className={
                    theme
                      ? "save-later"
                      : "save-later save-later-light text-light-mode"
                  }
                  onClick={() => {
                    saveVideo(_id);
                  }}
                >
                  {isHistory === true ? (
                    <BookmarkAddedIcon
                      fontSize="medium"
                      style={{ color: theme ? "white" : "black" }}
                      className="save-video-icon"
                    />
                  ) : (
                    <BookmarkAddOutlinedIcon
                      fontSize="medium"
                      style={{ color: theme ? "white" : "black" }}
                      className="save-video-icon"
                    />
                  )}
                  <p>Save</p>
                </div>
              </Tooltip>
            </div>

            <div className="channel-right-data c-right2">
              {/* ===================== like share download button ====================================== */}

              <div className="first-c-data">
                {/* =============== Like toggle button ================== */}

                <div
                  className="like-dislike"
                  style={
                    likeLoading === true
                      ? { opacity: 0.46, cursor: "wait", pointerEvents: "none" }
                      : { opacity: 1, cursor: "pointer", pointerEvents: "auto" }
                  }
                >
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="I like this"
                    placement="top"
                  >
                    <div
                      className={
                        theme
                          ? "like-data"
                          : "like-data like-data-light text-light-mode"
                      }
                      onClick={() => {
                        likeVideo();
                      }}
                    >
                      {likeFlag === true ? (
                        <ThumbUpIcon
                          fontSize="medium"
                          style={{ color: theme ? "white" : "black" }}
                          className="like-icon"
                        />
                      ) : (
                        <ThumbUpAltOutlinedIcon
                          fontSize="medium"
                          style={{ color: theme ? "white" : "black" }}
                          className="like-icon"
                        />
                      )}

                      <p className="like-count">{likesCount}</p>
                    </div>
                  </Tooltip>

                  <div className={theme ? "vl" : "vl-light"}></div>

                  <Tooltip
                    TransitionComponent={Zoom}
                    title="I dislike this"
                    placement="top"
                  >
                    <div
                      className={
                        theme
                          ? "dislike-data"
                          : "dislike-data dislike-data-light text-light-mode"
                      }
                      onClick={() => {
                        likeVideo();
                      }}
                    >
                      <ThumbDownOutlinedIcon
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="dislike-icon"
                      />
                    </div>
                  </Tooltip>
                </div>

                {/* ========= share button =========== */}

                <Tooltip
                  TransitionComponent={Zoom}
                  title="Share this video"
                  placement="top"
                >
                  <div
                    className={
                      theme ? "share" : "share share-light text-light-mode"
                    }
                    onClick={() => {
                      if (shareClicked === false) {
                        setShareClicked(true);
                        document.body.classList.add("bg-css");
                      } else {
                        setShareClicked(false);
                        document.body.classList.remove("bg-css");
                      }
                    }}
                  >
                    <ReplyIcon
                      fontSize="medium"
                      style={{
                        color: theme ? "white" : "black",
                        transform: "rotateY(180deg)",
                      }}
                      className="sharee-icon"
                    />
                    <p className="share-txt">Share</p>
                  </div>
                </Tooltip>

                {/* =============== Download button ============ */}

                <Tooltip
                  TransitionComponent={Zoom}
                  title="Download this video"
                  placement="top"
                >
                  <div
                    className={
                      theme
                        ? "download-btn"
                        : "download-btn download-btn-light text-light-mode"
                    }
                    onClick={downloadVideo}
                  >
                    <h3>
                      <LiaDownloadSolid className="download-icon" />
                    </h3>
                    <p className="download-txt">Download</p>
                  </div>
                </Tooltip>

                {/* ================= Watch Later button ================ */}

                <Tooltip
                  TransitionComponent={Zoom}
                  title="Watch Later"
                  placement="top"
                >
                  <div
                    className={
                      theme
                        ? "save-later"
                        : " save-later save-later-light text-light-mode"
                    }
                    onClick={() => {
                      saveVideo(_id);
                    }}
                  >
                    {isHistory === true ? (
                      <BookmarkAddedIcon
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="save-video-icon"
                      />
                    ) : (
                      <BookmarkAddOutlinedIcon
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="save-video-icon"
                      />
                    )}
                    <p>Save</p>
                  </div>
                </Tooltip>
              </div>

              <div className="firstt-c-data">
                <div
                  className="like-dislike"
                  style={
                    likeLoading === true
                      ? { opacity: 0.46, cursor: "wait", pointerEvents: "none" }
                      : { opacity: 1, cursor: "pointer", pointerEvents: "auto" }
                  }
                >
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="I like this"
                    placement="top"
                  >
                    <div
                      className={
                        theme
                          ? "like-data"
                          : "like-data like-data-light text-light-mode"
                      }
                      onClick={() => {
                        likeVideo();
                      }}
                    >
                      {likeFlag === true ? (
                        <ThumbUpIcon
                          fontSize="medium"
                          style={{ color: theme ? "white" : "black" }}
                          className="like-icon"
                        />
                      ) : (
                        <ThumbUpAltOutlinedIcon
                          fontSize="medium"
                          style={{ color: theme ? "white" : "black" }}
                          className="like-icon"
                        />
                      )}

                      <p className="like-count">{likesCount}</p>
                    </div>
                  </Tooltip>
                  <div className={theme ? "vl" : "vl-light"}></div>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="I dislike this"
                    placement="top"
                  >
                    <div
                      className={
                        theme
                          ? "dislike-data"
                          : "dislike-data dislike-data-light text-light-mode"
                      }
                      onClick={() => {
                        likeVideo();
                      }}
                    >
                      <ThumbDownOutlinedIcon
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="dislike-icon"
                      />
                    </div>
                  </Tooltip>
                </div>

                {/* ======= share button ============== */}

                <Tooltip
                  TransitionComponent={Zoom}
                  title="Share this video"
                  placement="top"
                >
                  <div
                    className={
                      theme ? "share" : "share share-light text-light-mode"
                    }
                    onClick={() => {
                      if (shareClicked === false) {
                        setShareClicked(true);
                        document.body.classList.add("bg-css");
                      } else {
                        setShareClicked(false);
                        document.body.classList.remove("bg-css");
                      }
                    }}
                  >
                    <ReplyIcon
                      fontSize="medium"
                      style={{
                        color: theme ? "white" : "black",
                        transform: "rotateY(180deg)",
                      }}
                      className="sharee-icon"
                    />
                    <p className="share-txt">Share</p>
                  </div>
                </Tooltip>

                {/* ======= Download button ============== */}

                <Tooltip
                  TransitionComponent={Zoom}
                  title="Download this video"
                  placement="top"
                >
                  <div
                    className={
                      theme
                        ? "download-btn"
                        : "download-btn download-btn-light text-light-mode"
                    }
                    onClick={downloadVideo}
                  >
                    <h3>
                      <LiaDownloadSolid className="download-icon" />
                    </h3>
                    <p className="download-txt">Download</p>
                  </div>
                </Tooltip>
              </div>

              {/* ===================== save-later button ====================================== */}

              <div className="third-c-data">
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Watch Later"
                  placement="top"
                >
                  <div
                    className={
                      theme
                        ? "save-later"
                        : "save-later save-later-light text-light-mode"
                    }
                    onClick={() => {
                      saveVideo(_id);
                    }}
                  >
                    {isHistory === true ? (
                      <BookmarkAddedIcon
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="save-video-icon"
                      />
                    ) : (
                      <BookmarkAddOutlinedIcon
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        className="save-video-icon"
                      />
                    )}
                    <p>Save</p>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* ===================== description-section ====================================== */}

          <div
            className={
              theme
                ? "description-section2"
                : "description-section2-light text-light-mode feature-light3"
            }
          >
            <div className="views-date" style={{ fontSize: "15.5px" }}>
              <p>
                {views >= 1e9
                  ? `${(views / 1e9).toFixed(1)}B`
                  : views >= 1e6
                  ? `${(views / 1e6).toFixed(1)}M`
                  : views >= 1e3
                  ? `${(views / 1e3).toFixed(1)}K`
                  : views}
                &nbsp; views
              </p>
              <p style={{ marginLeft: "10px" }}>
                {(() => {
                  const timeDifference = new Date() - new Date(createdAt);
                  const minutes = Math.floor(timeDifference / 60000);
                  const hours = Math.floor(timeDifference / 3600000);
                  const days = Math.floor(timeDifference / 86400000);
                  const weeks = Math.floor(timeDifference / 604800000);
                  const years = Math.floor(timeDifference / 31536000000);

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
            <div className="desc-data">
              <p
                style={
                  seeDesc === false
                    ? { marginTop: "20px" }
                    : { display: "none" }
                }
                className="videos-desc"
                dangerouslySetInnerHTML={{
                  __html:
                    description &&
                    formatDescriptionWithLinks(
                      description.length > 170
                        ? description.substring(0, 170) + "..."
                        : description
                    ),
                }}
              />
              <p
                style={
                  seeDesc === true ? { marginTop: "20px" } : { display: "none" }
                }
                className="videos-desc"
                dangerouslySetInnerHTML={{
                  __html:
                    description && formatDescriptionWithLinks(description),
                }}
              />
              {description && description.length > 170 ? (
                <p
                  className="desc-seemore"
                  onClick={() => setSeeDesc(!seeDesc)}
                  style={
                    seeDesc === false
                      ? { display: "block", cursor: "pointer" }
                      : { display: "none" }
                  }
                >
                  See more...
                </p>
              ) : null}
              {description && description.length > 170 ? (
                <p
                  className="desc-seemore"
                  onClick={() => setSeeDesc(!seeDesc)}
                  style={
                    seeDesc === true
                      ? { display: "block", cursor: "pointer" }
                      : { display: "none" }
                  }
                >
                  See less...
                </p>
              ) : null}
            </div>
          </div>

          {/* ===================== comments-section ====================================== */}

          <div className="comments-section first-one">
            <div
              className={
                theme ? "total-comments" : "total-comments text-light-mode"
              }
            >
              <p>
                {comments && comments.length}
                {comments && comments.length > 1
                  ? "\u00A0  Comments"
                  : "\u00A0  Comment"}
              </p>
            </div>

            {commentLoading === false ? (
              <div className="my-comment-area">
                <img
                  src={userProfile ? userProfile : Uavatar}
                  alt="channelDP"
                  className="channelDP"
                  loading="lazy"
                />
                <input
                  className={
                    theme ? "comment-input" : "comment-input text-light-mode"
                  }
                  type="text"
                  name="content"
                  placeholder="Add a comment..."
                  value={comment}
                  onClick={() => {
                    setDisplay((prevDisplay) =>
                      prevDisplay === "none" ? "block" : "block"
                    );
                  }}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
            ) : (
              <div
                className="my-comment-area"
                style={{
                  width: "-webkit-fill-available",
                  justifyContent: "center",
                }}
              >
                <div
                  className="spin22"
                  style={{ position: "relative", top: "20px" }}
                >
                  <div className={theme ? "loader2" : "loader2-light"}></div>
                </div>
              </div>
            )}
            {commentLoading === false ? (
              <div className="comment-btns" style={{ display: Display }}>
                <button
                  className={
                    theme ? "cancel-comment" : "cancel-comment text-light-mode"
                  }
                  onClick={() => {
                    setDisplay((prevDisplay) =>
                      prevDisplay === "none" ? "block" : "none"
                    );
                  }}
                >
                  Cancel
                </button>
                <button
                  className={theme ? "upload-comment" : "upload-comment-light"}
                  onClick={() => {
                    if (comment !== "") {
                      uploadComment(_id);
                    } else if (comment === "") {
                      EmptyMessage("Comment can't be empty");
                    } else {
                      setisbtnClicked(true);
                      document.body.classList.add("bg-css");
                    }
                  }}
                >
                  Comment
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="video-comments">
              {comments?.map((element, index) => {
                return (
                  <>
                    <div
                      className="comment-data"
                      key={index}
                      style={{
                        transition: "all 0.15s ease",
                        opacity: commentOpacity,
                      }}
                    >
                      <div className="comment-left-data">
                        <img
                          src={element.owner?.avatar}
                          alt="commentDP"
                          className="commentDP"
                          loading="lazy"
                          onClick={() => {
                            if (element.owner?._id !== undefined) {
                              navigate(`/channel/${element.owner?._id}`);
                            }
                          }}
                        />
                      </div>
                      <div
                        className={
                          theme
                            ? "comment-right-data"
                            : "comment-right-data text-light-mode"
                        }
                      >
                        <div className="comment-row1">
                          <p
                            onClick={() => {
                              if (element.owner?._id !== undefined) {
                                navigate(`/channel/${element.owner?._id}`);
                              }
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {element.owner?.username}
                          </p>
                          <p className="comment-time">
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
                        <p className="main-comment">{element.content}</p>

                        {/*==================== comment like ====================  */}
                        <div className="comment-interaction">
                          <ThumbUpIcon
                            fontSize="small"
                            style={{
                              color: theme ? "white" : "black",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              LikeComment(element._id, _id);
                            }}
                            className="comment-like"
                          />

                          <p style={{ marginLeft: "16px" }}>
                            {element.likes}
                          </p>

                          {isHeart[index] === false ? (
                            <FavoriteBorderOutlinedIcon
                              fontSize="small"
                              style={
                                loginEmail === owner?.email
                                  ? {
                                      color: theme ? "white" : "black",
                                      marginLeft: "20px",
                                      cursor: "pointer",
                                    }
                                  : { display: "none" }
                              }
                              className="heart-comment"
                            />
                          ) : (
                            <Tooltip
                              TransitionComponent={Zoom}
                              title="Liked!"
                              placement="bottom"
                            >
                              <div
                                className="heart-liked"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={owner?.avatar}
                                  alt="commentDP"
                                  className="heartDP"
                                  loading="lazy"
                                />
                                <FavoriteIcon
                                  fontSize="100px"
                                  style={{ color: "rgb(220, 2, 2)" }}
                                  className="comment-heart"
                                />
                              </div>
                            </Tooltip>
                          )}

                          {element.owner?.email === loginEmail ||
                          loginEmail === owner?.email ? (
                            <button
                              className={
                                theme
                                  ? "delete-comment-btn"
                                  : "delete-comment-btn-light text-dark-mode"
                              }
                              style={{ marginLeft: "17px" }}
                              onClick={() => DeleteComment(element._id, _id)}
                            >
                              Delete
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================== recommend videos ====================================== */}

        {recommendLoading === true && (
          <SkeletonTheme
            baseColor={theme ? "#353535" : "#aaaaaa"}
            highlightColor={theme ? "#444" : "#b6b6b6"}
          >
            <div className="recommended-section">
              {/* ============ recommend-tag ================= */}
              <div className="recommend-tags">
                <div
                  className={
                    TagSelected === "All"
                      ? `top-tags tag-one ${
                          theme ? "tag-color" : "tag-color-light"
                        }`
                      : `top-tags tag-one ${theme ? "" : "tagcolor-newlight"}`
                  }
                >
                  <p onClick={() => setTagSelected("All")}>All</p>
                </div>
                <div
                  className={
                    TagSelected === owner?.username
                      ? `top-tags tag-two ${
                          theme ? "tag-color" : "tag-color-light"
                        }`
                      : `top-tags tag-two ${theme ? "" : "tagcolor-newlight"}`
                  }
                  style={{ marginLeft: "10px" }}
                >
                  <p onClick={() => setTagSelected(`${owner?.username}`)}>
                    From {owner?.username}
                  </p>
                </div>
              </div>

              {/* ============ video-section ================= */}

              <div className="video-section2">
                {Array.from({ length: 10 }).map(() => (
                  <>
                    <div
                      className="video-data123"
                      style={{ marginTop: "10px" }}
                    >
                      <div className="video-left-side">
                        <Skeleton
                          count={1}
                          width={190}
                          height={107}
                          style={{ borderRadius: "12px" }}
                          className="sk-recommend-vid"
                        />
                      </div>
                      <div
                        className="video-right-side sk-right"
                        style={{ marginTop: "5px" }}
                      >
                        <Skeleton
                          count={1}
                          width={250}
                          height={32}
                          className="sk-recommend-title"
                        />
                        <Skeleton
                          count={1}
                          width={250}
                          height={15}
                          style={{ position: "relative", top: "10px" }}
                          className="sk-recommend-basic1"
                        />
                        <Skeleton
                          count={1}
                          width={150}
                          height={15}
                          style={{ position: "relative", top: "15px" }}
                          className="sk-recommend-basic2"
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </SkeletonTheme>
        )}

        {/* right side video list section  */}
        <div
          className="recommended-section"
          style={
            recommendLoading === true
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
        >
          <div className="recommend-tags">
            <div
              className={
                TagSelected === "All"
                  ? `top-tags tag-one ${
                      theme ? "tag-color" : "tag-color-light"
                    }`
                  : `top-tags tag-one ${theme ? "" : "tagcolor-newlight"}`
              }
            >
              <p onClick={() => setTagSelected("All")}>All</p>
            </div>
            <div
              className={
                TagSelected === owner?.username
                  ? `top-tags tag-two ${
                      theme ? "tag-color" : "tag-color-light"
                    }`
                  : `top-tags tag-two ${theme ? "" : "tagcolor-newlight"}`
              }
              style={{ marginLeft: "10px" }}
            >
              <p onClick={() => setTagSelected(`${owner?.username}`)}>
                From {owner?.username}
              </p>
            </div>
          </div>

          <div
            className="video-section2"
            style={
              TagSelected === "All" ? { display: "flex" } : { display: "none" }
            }
          >
            {listVideoDetails &&
              listVideoDetails?.map((element, index) => {
                return (
                  <div
                    className="video-data12"
                    style={
                      element === thumbnailURL?.url
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                    key={index}
                    onClick={() => {
                      navigate(`/video/${element._id}`);
                      window.location.reload();
                    }}
                  >
                    <div className="video-left-side">
                      <img
                        src={element.thumbnail?.url}
                        alt=""
                        className="recommend-thumbnails"
                        loading="lazy"
                      />
                      <p className="duration duration2">
                        {Math.floor(element.duration / 60) +
                          ":" +
                          (Math.round(element.duration % 60) < 10
                            ? "0" + Math.round(element.duration % 60)
                            : Math.round(element.duration % 60))}
                      </p>
                    </div>
                    <div className="video-right-side">
                      <p
                        className={
                          theme
                            ? "recommend-vid-title"
                            : "recommend-vid-title text-light-mode"
                        }
                      >
                        {element.title}
                      </p>
                      <div
                        className={
                          theme
                            ? "recommend-uploader"
                            : "recommend-uploader text-light-mode2"
                        }
                      >
                        <p
                          className={
                            theme
                              ? "recommend-vid-uploader uploader"
                              : "recommend-vid-uploader uploader nohover"
                          }
                        >
                          {element.owner[0]?.username}
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
                      <div className="view-time">
                        <p className="views">
                          {element.views >= 1e9
                            ? `${(element.views / 1e9).toFixed(1)}B`
                            : element.views >= 1e6
                            ? `${(element.views / 1e6).toFixed(1)}M`
                            : element.views >= 1e3
                            ? `${(element.views / 1e3).toFixed(1)}K`
                            : element.views}
                          &nbsp; views
                        </p>
                        <p
                          className="upload-time"
                          style={{ marginLeft: "4px" }}
                        >
                          &#x2022;
                          {(() => {
                            const timeDifference =
                              new Date() - new Date(element.createdAt);
                            const minutes = Math.floor(timeDifference / 60000);
                            const hours = Math.floor(timeDifference / 3600000);
                            const days = Math.floor(timeDifference / 86400000);
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
                );
              })}
          </div>

          <div
            className="video-section23 userVideos"
            style={
              TagSelected !== "All" ? { display: "flex" } : { display: "none" }
            }
          >
            {listVideoDetails &&
              listVideoDetails.length > 0 &&
              listVideoDetails.map((element, index) => {
                if (owner?.username === element.owner[0]?.username) {
                  return (
                    <div
                      className="video-data12"
                      style={
                        element.thumbnailURL === thumbnailURL?.url
                          ? { display: "none" }
                          : { display: "flex" }
                      }
                      key={index}
                      onClick={() => {
                        navigate(`/video/${element._id}`);
                        window.location.reload();
                      }}
                    >
                      <div className="video-left-side">
                        <img
                          src={element.thumbnail?.url}
                          alt=""
                          className="recommend-thumbnails"
                          loading="lazy"
                        />
                        <p className="duration duration2">
                          {Math.floor(element.duration / 60) +
                            ":" +
                            (Math.round(element.duration % 60) < 10
                              ? "0" + Math.round(element.duration % 60)
                              : Math.round(element.duration % 60))}
                        </p>
                      </div>
                      <div className="video-right-side">
                        <p
                          className={
                            theme
                              ? "recommend-vid-title"
                              : "recommend-vid-title text-light-mode"
                          }
                        >
                          {element.title}
                        </p>
                        <div
                          className={
                            theme
                              ? "recommend-uploader"
                              : "recommend-uploader text-light-mode2"
                          }
                        >
                          <p
                            className={
                              theme
                                ? "recommend-vid-uploader uploader"
                                : "recommend-vid-uploader uploader nohover"
                            }
                          >
                            {element.owner[0]?.username}
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
                        <div className="view-time">
                          <p className="views">
                            {element.views >= 1e9
                              ? `${(element.views / 1e9).toFixed(1)}B`
                              : element.views >= 1e6
                              ? `${(element.views / 1e6).toFixed(1)}M`
                              : element.views >= 1e3
                              ? `${(element.views / 1e3).toFixed(1)}K`
                              : element.views}
                            &nbsp; views
                          </p>
                          <p
                            className="upload-time"
                            style={{ marginLeft: "4px" }}
                          >
                            &#x2022;
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
                  );
                } else {
                  return null;
                }
              })}
          </div>

          {/* SECOND COMMENT OPTIONS  */}

          <div className="comments-section second-one">
            <div
              className={
                theme ? "total-comments" : "total-comments text-light-mode"
              }
            >
              <p>
                {comments && comments.length}
                {comments && comments.length > 1
                  ? "\u00A0 Comments"
                  : "\u00A0 Comment"}
              </p>
            </div>
            {commentLoading === false ? (
              <div className="my-comment-area">
                <img
                  src={userProfile ? userProfile : Uavatar}
                  alt="channelDP"
                  className="channelDP"
                  loading="lazy"
                />
                <input
                  className={
                    theme ? "comment-input" : "comment-input text-light-mode"
                  }
                  type="text"
                  name="myComment"
                  placeholder="Add a comment..."
                  value={comment}
                  onClick={() => {
                    setDisplay((prevDisplay) =>
                      prevDisplay === "none" ? "block" : "block"
                    );
                  }}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
            ) : (
              <div
                className="my-comment-area"
                style={{
                  width: "-webkit-fill-available",
                  justifyContent: "center",
                }}
              >
                <div
                  className="spin22"
                  style={{ position: "relative", top: "20px" }}
                >
                  <div className={theme ? "loader2" : "loader2-light"}></div>
                </div>
              </div>
            )}
            {commentLoading === false ? (
              <div className="comment-btns" style={{ display: Display }}>
                <button
                  className={
                    theme ? "cancel-comment" : "cancel-comment text-light-mode"
                  }
                  onClick={() => {
                    setDisplay((prevDisplay) =>
                      prevDisplay === "none" ? "block" : "none"
                    );
                  }}
                >
                  Cancel
                </button>
                <button
                  className={theme ? "upload-comment" : "upload-comment-light"}
                  onClick={() => {
                    if (comment !== "") {
                      uploadComment(_id);
                    } else if (comment === "") {
                      EmptyMessage("Comment can't be empty");
                    } else {
                      setisbtnClicked(true);
                      document.body.classList.add("bg-css");
                    }
                  }}
                >
                  Comment
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="video-comments">
              {comments?.map((element, index) => {
                return (
                  <>
                    <div
                      className="comment-data"
                      key={index}
                      style={{
                        transition: "all 0.15s ease",
                        opacity: commentOpacity,
                      }}
                    >
                      <div className="comment-left-data">
                        <img
                          src={element.owner?.avatar}
                          alt="commentDP"
                          className="commentDP"
                          loading="lazy"
                          onClick={() => {
                            if (element.cowner?._id !== undefined) {
                              navigate(`/channel/${element.owner?._id}`);
                            }
                          }}
                        />
                      </div>
                      <div
                        className={
                          theme
                            ? "comment-right-data"
                            : "comment-right-data text-light-mode"
                        }
                      >
                        <div className="comment-row1">
                          <p
                            onClick={() => {
                              if (element.channel_id !== undefined) {
                                navigate(`/channel/${element.owner?._id}`);
                              }
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {element.owner?.username}
                          </p>
                          <p className="comment-time">
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
                        <p className="main-comment">{element.content}</p>

                        {/*====================== comment like =========================== */}
                        <div className="comment-interaction">
                          <ThumbUpIcon
                            fontSize="small"
                            style={{
                              color: theme ? "white" : "black",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              LikeComment(element._id, _id);
                            }}
                            className="comment-like"
                          />

                          <p style={{ marginLeft: "16px" }}>
                            {element.likes}
                          </p>

                          {isHeart[index] === false ? (
                            <FavoriteBorderOutlinedIcon
                              fontSize="small"
                              style={
                                loginEmail === owner?.email
                                  ? {
                                      color: theme ? "white" : "black",
                                      marginLeft: "20px",
                                      cursor: "pointer",
                                    }
                                  : { display: "none" }
                              }
                              className="heart-comment"
                            />
                          ) : (
                            <Tooltip
                              TransitionComponent={Zoom}
                              title="Liked!"
                              placement="bottom"
                            >
                              <div
                                className="heart-liked"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={owner?.avatar}
                                  alt="commentDP"
                                  className="heartDP"
                                  loading="lazy"
                                />
                                <FavoriteIcon
                                  fontSize="100px"
                                  style={{ color: "rgb(220, 2, 2)" }}
                                  className="comment-heart"
                                />
                              </div>
                            </Tooltip>
                          )}

                          {element.owner?.email === loginEmail ||
                          loginEmail === owner?.email ? (
                            <button
                              className={
                                theme
                                  ? "delete-comment-btn"
                                  : "delete-comment-btn-light text-dark-mode"
                              }
                              style={{ marginLeft: "17px" }}
                              onClick={() => DeleteComment(element._id, _id)}
                            >
                              Delete
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="share-clicked"
        style={
          shareClicked === true ? { display: "block" } : { display: "none" }
        }
      >
        <Share />
      </div>
    </>
  );
};

export default VideoSection;
