import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
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
import { getAllVideos, getSelectedVideo } from "../redux/actions/videoAction";
import {
  createComment,
  deleteCommentsDetails,
  getSelectedComment,
} from "../redux/actions/commentAction";
import { EmptyMessage, avatar, commonNotify, email } from "../constant/Api";
import {
  getLikeCommentToggle,
  getLikeVideoToggle,
} from "../redux/actions/likeAction";
import { getSubscriptionToggle } from "../redux/actions/subscriptionAction";

const VideoSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get state
  const selectedVideo = useSelector((state) => state.videos.selectedVideo);
  const selectedComment = useSelector(
    (state) => state.comments.selectedComment
  );
  const listVideo = useSelector((state) => state.videos.videosDetails);

  const isLikedStatus = useSelector((state) => state.like.isLiked);

  const [listVideoDetails, setListVideoDetails] = useState([]);

  const isLikedComment = useSelector((state) => state.like.isLiked);

  const isSubscribe = useSelector((state) => state.subscription.isSubscribed);

  const backendURL = "http://localhost:3000";
  const { id } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [loginEmail, setLoginEmail] = useState(email);
  const [plyrInitialized, setPlyrInitialized] = useState(false);
  const [Display, setDisplay] = useState("none");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [shareClicked, setShareClicked] = useState(false);
  const [usermail, setUserMail] = useState();
  const [isbtnClicked, setisbtnClicked] = useState(false);
  // const videoRef = useRef(null);
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

  //EXTRAS
  const [isSaved, setIsSaved] = useState();
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

  // trending api
  // useEffect(() => {
  //   const getTrendingData = async () => {
  //     try {
  //       if (id !== undefined) {
  //         const response = await fetch(`${backendURL}/gettrendingdata/${id}`);
  //         const data = await response.json();
  //         setCheckTrending(data);
  //       }
  //     } catch (error) {
  //       //console.log(error.message);
  //     }
  //   };
  //   getTrendingData();
  // }, []);

  // useEffect(() => {
  //   const PushTrending = async () => {
  //     try {
  //       if (id !== undefined && usermail !== undefined) {
  //         const response = await fetch(
  //           `${backendURL}/checktrending/${id}/${usermail}`
  //         );
  //         await response.json();
  //       }
  //     } catch (error) {
  //       //console.log(error.message);
  //     }
  //   };
  //   PushTrending();
  // }, [id, usermail]);

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
  console.log("video Data ", videoData);

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

  // get user videos

  // playlist
  // useEffect(() => {
  //   const initializePlyr = () => {
  //     if (!plyrInitialized && videoRef.current) {
  //       const player = new Plyr(videoRef.current, {
  //         background: "red",
  //         ratio: null,
  //       });
  //       setPlyrInitialized(true);
  //     }
  //   };

  //   if (videoData && videoData.VideoData) {
  //     initializePlyr();
  //   }
  // }, [plyrInitialized, videoData]);

  // like  setVideoLikes(likes) amma get video mathi likeCount aave che te set kervanu che
  // useEffect(() => {
  //   const getLikes = async () => {
  //     try {
  //       if (id !== undefined) {
  //         const response = await fetch(`${backendURL}/getlike/${id}/`);
  //         const likes = await response.json();
  //         setVideoLikes(likes);
  //       }
  //     } catch (error) {
  //       //console.log(error.message);
  //     }
  //   };

  //   const interval = setInterval(getLikes, 300);

  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const LikeExists = async () => {
  //     try {
  //       if (id !== undefined && email !== undefined) {
  //         const response = await fetch(
  //           `${backendURL}/getuserlikes/${id}/${email}`
  //         );
  //         const { existingLikedVideo } = await response.json();
  //         if (!existingLikedVideo) {
  //           setIsLiked(false);
  //         } else {
  //           setIsLiked(true);
  //         }
  //       }
  //     } catch (error) {
  //       //console.log(error.message);
  //     }
  //   };
  //   const interval = setInterval(LikeExists, 200);

  //   return () => clearInterval(interval);
  // }, []);

  // watch later history
  // useEffect(() => {
  //   const getWatchlater = async () => {
  //     try {
  //       if (id !== undefined && email !== undefined) {
  //         const response = await fetch(
  //           `${backendURL}/checkwatchlater/${id}/${email}`
  //         );
  //         const data = await response.json();
  //         if (data === "Found") {
  //           setIsSaved(true);
  //         } else {
  //           setIsSaved(false);
  //         }
  //       }
  //     } catch (error) {
  //       //console.log(error.message);
  //     }
  //   };

  //   const interval = setInterval(getWatchlater, 200);

  //   return () => clearInterval(interval);
  // }, []);

  // get playlist
  // useEffect(() => {
  //   const getPlaylists = async () => {
  //     try {
  //       if (email !== undefined) {
  //         const response = await fetch(
  //           `${backendURL}/getplaylistdata/${email}`
  //         );
  //         const playlists = await response.json();
  //         setUserPlaylist(playlists);
  //       }
  //     } catch (error) {
  //       //console.log(error.message);
  //     }
  //   };

  //   const interval = setInterval(getPlaylists, 400);

  //   return () => clearInterval(interval);
  // }, []);

  // video availble in playlist
  // useEffect(() => {
  //   const getVideoAvailableInPlaylist = async () => {
  //     try {
  //       if (id !== undefined && email !== undefined) {
  //         const response = await fetch(
  //           `${backendURL}/getvideodataplaylist/${email}/${id}`
  //         );
  //         const playlistIdsWithVideo = await response.json();
  //         setplaylistID(playlistIdsWithVideo);
  //       }
  //     } catch (error) {
  //       //console.log(error.message);
  //     }
  //   };

  //   const interval = setInterval(getVideoAvailableInPlaylist, 400);

  //   return () => clearInterval(interval);
  // }, []);

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
    likes,
    createdAt,
    isPublished,
    subscribersCount,
  } = videoData;

  document.title =
    title && title !== undefined ? `${title} - YouTube` : "YouTube";

  const likeVideo = async () => {
    try {
      setLikeLoading(true);

      dispatch(getLikeVideoToggle(id, isLikedStatus));
      setLikeLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const LikeComment = async (commentId, _id) => {
    try {
      dispatch(getLikeCommentToggle(commentId, _id, isLikedComment));
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

  const saveVideo = async () => {
    try {
      if (id !== undefined) {
        const response = await fetch(
          `${backendURL}/watchlater/${id}/${usermail}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data === "Saved") {
          commonNotify("Video saved to watch later!");
        }
      }
    } catch (error) {
      //console.log(error.message);
    }
  };

  const SubscribeChannel = async (id, channelId) => {
    try {
      dispatch(getSubscriptionToggle(id, channelId, isSubscribe));
    } catch (error) {
      console.log(error.message);
    }
  };

  //ADD PLAYLIST

  // const AddPlaylist = async () => {
  //   try {
  //     setLoading(true);
  //     if (email !== undefined) {
  //       const currentDate = new Date().toISOString();
  //       const data = {
  //         playlist_name: playlistName,
  //         playlist_privacy: privacy,
  //         playlist_date: currentDate,
  //         playlist_owner: channelName,
  //         thumbnail: thumbnailURL,
  //         title: Title,
  //         videoID: id,
  //         description: description,
  //         videolength: videoLength,
  //         video_uploader: owner?.username,
  //         video_date: createdAt,
  //         video_views: views,
  //         videoprivacy: isPublished,
  //       };

  //       const response = await fetch(`${backendURL}/addplaylist/${email}`, {
  //         method: "POST",
  //         body: JSON.stringify(data),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const Data = await response.json();
  //       if (Data) {
  //         setLoading(false);
  //         commonNotify("Video added to the playlist!");
  //         window.location.reload();
  //       }
  //     }
  //   } catch (error) {
  //     //console.log(error.message);
  //     setLoading(true);
  //   }
  // };

  // const AddVideoToExistingPlaylist = async (Id) => {
  //   try {
  //     if (email !== undefined && Id !== undefined) {
  //       const data = {
  //         Id,
  //         thumbnail: thumbnailURL,
  //         title: Title,
  //         videoID: id,
  //         description: description,
  //         videolength: videoLength,
  //         video_uploader: owner?.username,
  //         video_date: createdAt,
  //         video_views: views,
  //         videoprivacy: isPublished,
  //       };

  //       const response = await fetch(
  //         `${backendURL}/addvideotoplaylist/${email}`,
  //         {
  //           method: "POST",
  //           body: JSON.stringify(data),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       await response.json();
  //       playlistNotify();
  //     }
  //   } catch (error) {
  //     //console.log(error.message);
  //   }
  // };

  //REMOVE VIDEO FROM PLAYLIST

  // const RemoveVideo = async (playlistID) => {
  //   try {
  //     if (email !== undefined && id !== undefined && playlistID !== undefined) {
  //       const response = await fetch(
  //         `${backendURL}/removevideo/${email}/${id}/${playlistID}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       await response.json();
  //     }
  //   } catch (error) {
  //     //console.log(error.message);
  //   }
  // };

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

  if (email !== usermail && isPublished === false) {
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
              // ref={videoRef}
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
              {isSubscribe === false ? (
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
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
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
                    {isLikedStatus === true ? (
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

                    <p className="like-count">{likes}</p>
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
                    } ${isLikedStatus ? "d-block" : "d-none"}`}
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
                    saveVideo();
                  }}
                >
                  {isSaved === true ? (
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
              <Tooltip
                TransitionComponent={Zoom}
                title="Add to playlist"
                placement="top"
              >
                <div
                  className={
                    theme
                      ? "add-playlist"
                      : "add-playlist add-playlist-light text-light-mode"
                  }
                  onClick={() => {
                    if (playlistClicked === false) {
                      setPlaylistClicked(true);
                      document.body.classList.add("bg-css");
                    } else if (!token) {
                      setisbtnClicked(true);
                      document.body.classList.add("bg-css");
                    }
                  }}
                >
                  <PlaylistAddIcon
                    fontSize="medium"
                    style={{ color: theme ? "white" : "black" }}
                    className="playlist-iconn"
                  />

                  <p>Playlist</p>
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
                      {isLikedStatus === true ? (
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

                      <p className="like-count">{likes}</p>
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
                      saveVideo();
                    }}
                  >
                    {isSaved === true ? (
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
                      {isLikedStatus === true ? (
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

                      <p className="like-count">{likes}</p>
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

              {/* ===================== add playlist button ====================================== */}
              <div className="second-c-data">
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Add to playlist"
                  placement="top"
                >
                  <div
                    className={
                      theme
                        ? "add-playlist"
                        : "add-playlist add-playlist-light text-light-mode"
                    }
                    onClick={() => {
                      if (playlistClicked === false && token) {
                        setPlaylistClicked(true);
                        document.body.classList.add("bg-css");
                      } else if (!token) {
                        setisbtnClicked(true);
                        document.body.classList.add("bg-css");
                      }
                    }}
                  >
                    <PlaylistAddIcon
                      fontSize="medium"
                      style={{ color: theme ? "white" : "black" }}
                    />

                    <p>Playlist</p>
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
                      saveVideo();
                    }}
                  >
                    {isSaved === true ? (
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
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Add to playlist"
                  placement="top"
                >
                  {/* playlist  */}
                  <div
                    className={
                      theme
                        ? "add-playlist"
                        : "add-playlist add-playlist-light text-light-mode"
                    }
                    onClick={() => {
                      if (playlistClicked === false && token) {
                        setPlaylistClicked(true);
                        document.body.classList.add("bg-css");
                      } else if (!token) {
                        setisbtnClicked(true);
                        document.body.classList.add("bg-css");
                      }
                    }}
                  >
                    <PlaylistAddIcon
                      fontSize="medium"
                      style={{ color: theme ? "white" : "black" }}
                    />

                    <p>Playlist</p>
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
                {"\u00A0"} views
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

                          <p style={{ marginLeft: "16px" }}>{element.likes}</p>

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
                      dispatch(getSelectedVideo(element._id));
                      setVideoData([selectedVideo]);
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
                          views
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
                            views
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

                          <p style={{ marginLeft: "16px" }}>{element.likes}</p>

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

      {/*================================= PLAYLIST POPUP ================================= */}

      <div
        className={
          theme ? "playlist-pop" : "playlist-pop light-mode text-light-mode"
        }
        style={{
          minHeight: createPlaylistClicked === false ? "262px" : "420px",
          display: playlistClicked === true ? "block" : "none",
          width:
            UserPlaylist && !UserPlaylist.includes("No playlists available...")
              ? "270px"
              : "270px",
        }}
      >
        <div className="this-top-section">
          <p>Save video to...</p>
          <ClearRoundedIcon
            className="close-playlist-pop"
            fontSize="medium"
            style={{ color: theme ? "white" : "black", cursor: "pointer" }}
            onClick={() => {
              setPlaylistClicked(false);
              setcreatePlaylistClicked(false);
              document.body.classList.remove("bg-css");
            }}
          />
        </div>
        <div
          className="this-middle-section"
          style={
            createPlaylistClicked === true ? { top: "38%" } : { top: "50%" }
          }
        >
          {!UserPlaylist ||
          UserPlaylist.includes("No playlists available...") ? (
            <p>No Playlists available...</p>
          ) : (
            ""
          )}
        </div>
        <div className="this-middle-section2">
          <div className="show-playlists">
            {UserPlaylist &&
              !UserPlaylist.includes("No playlists available...") &&
              UserPlaylist.map((element, index) => {
                return (
                  <div className="all-playlists" key={index}>
                    {(playlistID &&
                      playlistID.length > 0 &&
                      playlistID.includes(element._id) === false) ||
                    playlistID === "Video doesn't exist in any playlist" ? (
                      <CheckBoxOutlineBlankIcon
                        className="tick-box"
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        onClick={() => {
                          // AddVideoToExistingPlaylist(element._id);
                        }}
                      />
                    ) : (
                      <CheckBoxIcon
                        className="tick-box"
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                        // onClick={() => RemoveVideo(element._id)}
                      />
                    )}
                    {element.playlist_name.length <= 16
                      ? element.playlist_name
                      : `${element.playlist_name.slice(0, 16)}..`}
                    {element.playlist_privacy === "Public" ? (
                      <PublicOutlinedIcon
                        className="new-privacy"
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                      />
                    ) : (
                      ""
                    )}
                    {element.playlist_privacy === "Private" ? (
                      <LockOutlinedIcon
                        className="new-privacy"
                        fontSize="medium"
                        style={{ color: theme ? "white" : "black" }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className="this-bottom-section"
          onClick={() => {
            if (createPlaylistClicked === false) {
              setcreatePlaylistClicked(true);
            }
          }}
          style={
            createPlaylistClicked === false
              ? { display: "flex" }
              : { display: "none" }
          }
        >
          <AddToPhotosOutlinedIcon
            fontSize="medium"
            style={{ color: theme ? "white" : "black" }}
          />
          <p style={{ marginLeft: "12px" }}>Create new playlist</p>
        </div>
        <div
          className="create-playlist-section"
          style={
            createPlaylistClicked === true
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <div className="first-que">
            <p>Name</p>
            <input
              type="text"
              name="playlist_name"
              className={
                theme
                  ? "playlist-name"
                  : "playlist-name playlist-name-light light-mode text-light-mode"
              }
              placeholder="Enter playlist name..."
              value={playlistName}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
            />
          </div>
          <div className="second-que">
            <p>Privacy</p>
            <div
              className="combine2"
              onClick={() => {
                if (privacyClicked === false) {
                  setprivacyClicked(true);
                }
              }}
            >
              <p>{privacy}</p>
              <hr className="bottom-line" />
            </div>
          </div>
          <div
            className={
              theme
                ? "choose-privacy"
                : "choose-privacy light-mode text-light-mode"
            }
            style={
              privacyClicked === true
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <div
              className={
                theme ? "first-privacy" : "first-privacy feature-light"
              }
              onClick={() => {
                setPrivacy("Public");
                setprivacyClicked(false);
              }}
            >
              <PublicOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
              <div className="right-privacy">
                <p>Public</p>
                <p className={theme ? "" : "text-light-mode2"}>
                  Anyone can view
                </p>
              </div>
            </div>
            <div
              className={
                theme ? "second-privacy" : "second-privacy feature-light"
              }
              onClick={() => {
                setPrivacy("Private");
                setprivacyClicked(false);
              }}
            >
              <LockOutlinedIcon
                fontSize="medium"
                style={{ color: theme ? "white" : "black" }}
              />
              <div className="right-privacy">
                <p>Private</p>
                <p className={theme ? "" : "text-light-mode2"}>
                  Only you can view
                </p>
              </div>
            </div>
          </div>
          <div
            className="playlist-create-btn"
            style={
              loading === true
                ? { pointerEvents: "none" }
                : { pointerEvents: "auto" }
            }
            onClick={() => {
              if (playlistName !== "" || privacy !== "") {
                // AddPlaylist();
              } else {
                EmptyMessage("Input fileds can't be empty");
              }
            }}
          >
            {loading === true ? <p>Loading...</p> : <p>Create</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoSection;
