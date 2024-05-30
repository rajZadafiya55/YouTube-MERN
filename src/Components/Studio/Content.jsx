import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import LeftPanel from "../LeftPanel";
import "../../Css/channel.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicTabs from "../../Components/Channel/BasicTabs";
import { coverImage, email, username } from "../../constant/Api";
import { useDispatch, useSelector } from "react-redux";
import { getAllChannelVideos } from "../../redux/actions/dashboardAction";
import {
  addVideoData,
  deleteVideoDetails,
  getSelectedVideo,
} from "../../redux/actions/videoAction";
import { APIHttp, avatar } from "../../constant/Api";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SdIcon from "@mui/icons-material/Sd";
import HdIcon from "@mui/icons-material/Hd";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import Upload from "../../img/upload.png";

const Content = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const channelData = useSelector((state) => state.user.channelDetails);

  const { id } = useParams();
  const [Email, setEmail] = useState(email);
  const [channelName, setChannelname] = useState(username);
  const [myVideos, setMyVideos] = useState([]);
  const [isbtnClicked, setisbtnClicked] = useState(false);
  const [Section, setSection] = useState(
    localStorage.getItem("Section") || "Videos"
  );
  const token = localStorage.getItem("userToken");
  const [isSubscribed, setIsSubscribed] = useState();
  const [Subscribers, setSubscribers] = useState();
  const [Top, setTop] = useState("155px");
  const [coverIMG, setCoverIMG] = useState(coverImage);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  // upload video
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoName, setVideoName] = useState("Upload videos");
  const [VideoURL, setVideoURL] = useState("");
  const [Progress, setProgress] = useState(0);
  const [previewThumbnail, setPreviewThumbnail] = useState(null);

  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [isThumbnailSelected, setIsThumbnailSelected] = useState(false);
  const [visibility, setVisibility] = useState("Private");
  const [isVisibilityClicked, setIsVisibilityClicked] = useState(false);

  document.title = "Channel content - YouTube Studio";

  useEffect(() => {
    if (isChannel === false) {
      document.body.classList.add("bg-css");
    } else {
      document.body.classList.remove("bg-css");
    }
  }, [isChannel]);

  //TOASTS

  const CopiedNotify = () =>
    toast.success("Link Copied!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  //USE EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const clearFormState = () => {
    setFormData({
      title: "",
      description: "",
      videoFile: null,
      thumbnail: null,
      isPublished: false,
    });
    setIsVideoSelected(false);
    setIsThumbnailSelected(false);
    setVisibility("Private");
    setIsVisibilityClicked(false);
    setIsClicked(false);
    setisChannel(true);
  };

  //ON VIDEO DROP

  const handleUploadImageClick = () => {
    const fileInput = document.getElementById("videoFileInput");
    fileInput.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > 30) {
      alert("Please select a video file with a size of up to 30MB.");
      return;
    }

    setSelectedVideo(file);
    setIsVideoSelected(true);
    const fileName = file.name;
    setVideoName(fileName.substring(0, fileName.lastIndexOf(".")));
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
    isPublished: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "isPublished") {
      // Update isPublished based on visibility
      setFormData({
        ...formData,
        visibility: value,
        isPublished: value === "public" ? true : false,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      videoFile: file,
    });
    setIsVideoSelected(true);
    setVideoName(file.name);
    setSelectedVideo(file);
    setProgress(100);

    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      thumbnail: file,
    });
    setIsThumbnailSelected(!!file);
    setPreviewThumbnail(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewThumbnail(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const PublishData = async (e) => {
    e.preventDefault();

    await dispatch(addVideoData(formData, setLoading, setIsClicked));

    clearFormState();
  };

  useEffect(() => {
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  // useEffect(() => {
  //   const checkSubscription = async () => {
  //     try {
  //       const response = await fetch(
  //         `${backendURL}/checksubscription/${id}/${newEmail}`
  //       );
  //       const { existingChannelID } = await response.json();
  //       if (existingChannelID !== undefined) {
  //         setIsSubscribed(true);
  //       } else {
  //         setIsSubscribed(false);
  //       }
  //     } catch (error) {
  //       // console.log(error.message);
  //     }
  //   };

  //   const interval = setInterval(checkSubscription, 200);

  //   return () => clearInterval(interval);
  // }, [id, newEmail]);

  //POST REQUESTS

  // const SubscribeChannel = async () => {
  //   try {
  //     const channelData = {
  //       youtuberName: channelName,
  //       youtuberProfile: ChannelProfile,
  //       youtubeChannelID: id,
  //     };

  //     const response = await fetch(
  //       `${backendURL}/subscribe/${id}/${newEmail}/${Email}`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify(channelData),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     if (data === "Subscribed") {
  //       SubscribeNotify();
  //     }
  //   } catch (error) {
  //     // console.log(error.message);
  //   }
  // };

  // Function to handle tab changes
  const handleTabChange = (newSection) => {
    setSection(newSection);
    localStorage.setItem("Section", newSection);
  };

  useEffect(() => {
    if (id != undefined) {
      dispatch(getUserChannelProfile(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(getAllChannelVideos());
  }, []);

  useEffect(() => {
    setUserVideos(AllVideos);
  }, [AllVideos]);

  useEffect(() => {
    const GetDeleteVideoData = async () => {
      try {
        if (DeleteVideoID !== undefined) {
          dispatch(getSelectedVideo(DeleteVideoID));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    GetDeleteVideoData();
  }, [DeleteVideoID]);

  useEffect(() => {
    setDeleteVideoData(selectedVideos);
  }, [selectedVideos]);

  const handleSortByDate = () => {
    setSortByDateAsc((prevState) => !prevState);
    setChangeSort(!changeSort);
  };

  const sortedUserVideos =
    userVideos &&
    userVideos.length > 0 &&
    userVideos.sort((a, b) => {
      if (sortByDateAsc) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  //POST REQUESTS
  const DeleteVideo = async (id) => {
    try {
      if (id !== undefined) {
        await dispatch(deleteVideoDetails(id));
        setIsDeleteClicked(false);
        document.body.classList.remove("bg-css2");
        dispatch(getAllChannelVideos());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCopyLink = (id) => {
    navigator.clipboard
      .writeText(`${videoUrl}/${id}`)
      .then(() => {
        CopiedNotify();
      })
      .catch((error) => {
        console.log("Error copying link to clipboard:", error);
      });
  };

  const downloadVideo = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = "video.mp4";
    link.click();
  };

  const DeleteVideoUploadDate = new Date(
    DeleteVideoData && DeleteVideoData.createdAt
  );

  return (
    <>
      <div className={theme ? "studio" : "studio studio-light"}>
        <div className="channel-content-section">
          <div className="d-flex flex-column">
            <div
              className="channel-content-top"
              style={{ left: menu ? "125px" : "310px" }}
            >
              <p className={theme ? "" : "text-light-mode"}>Channel content</p>

              <p
                className={
                  theme ? "channel-videosss" : "channel-videosss blue-txt"
                }
              >
                Videos
              </p>
            </div>

            {/* create video section */}

            <div
              className={theme ? "create-btn" : "create-btn create-btn-light"}
              onClick={() => {
                setIsClicked(true);
                setisChannel(false);
              }}
            >
              <VideoCallOutlinedIcon
                className=""
                fontSize="large"
                style={{ color: "#FF4E45" }}
              />
              <p className={theme ? "" : "text-light-mode"}>CREATE</p>
            </div>
            <div
              className={theme ? "create-btn2" : "create-btn2 create-btn-light"}
              onClick={() => {
                setIsClicked(true);
                setisChannel(false);
              }}
            >
              CREATE
            </div>

            <div
              style={
                isChannel === true ? { display: "flex" } : { display: "none" }
              }
              className={
                theme ? "create-btn-short" : "create-btn-short light-mode"
              }
              onClick={() => setIsClicked(true)}
            >
              <LiaUploadSolid
                fontSize="22px"
                color={theme ? "#b1b1b1" : "#606060"}
              />
            </div>
          </div>

          {/* ============================== video upload form ============================= */}

          <div
            className={
              theme
                ? "upload-content"
                : "upload-content light-mode text-light-mode"
            }
            id="modal"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={
              isClicked === true ? { display: "flex" } : { display: "none" }
            }
          >
            <div className="top-head">
              {videoName.length <= 70
                ? videoName
                : `${videoName.slice(0, 40)}...`}{" "}
              <CloseRoundedIcon
                className="close"
                fontSize="large"
                style={{ color: "gray" }}
                onClick={() => {
                  if (Progress !== 100) {
                    setIsClicked(false);
                    setisChannel(true);
                  } else if (
                    Progress === 100 &&
                    formData.isPublished === "true"
                  ) {
                  }
                  if (isClicked === true) {
                    clearFormState();
                  }
                }}
              />
            </div>

            <hr
              className={
                theme
                  ? "seperate seperate2"
                  : "seperate seperate2 seperate-light"
              }
            />
            <div
              className="middle-data"
              style={
                !isVideoSelected ? { display: "flex" } : { display: "none" }
              }
            >
              <img
                src={Upload}
                className={theme ? "upload-img" : "upload-img upload-img-light"}
                onClick={handleUploadImageClick}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              />
              <p>Drag and drop video files to upload</p>
              <p>Your videos will be private until you publish them.</p>
              <div className="upload-btn-wrapper">
                <button className={theme ? "btn" : "btn text-dark-mode"}>
                  SELECT FILES
                </button>
                <input
                  id="videoFileInput"
                  type="file"
                  name="videoFile"
                  accept="video/mp4"
                  onChange={handleVideoChange}
                />
              </div>
            </div>

            {/* =================== video details section ================== */}
            <div
              className="uploading-video-data"
              style={
                isVideoSelected ? { display: "flex" } : { display: "none" }
              }
            >
              <div className="left-video-section">
                <form className="details-form">
                  <div className="details-section">
                    <p>Details</p>
                    <input
                      type="text"
                      className={
                        theme ? "video-title" : "video-title light-mode"
                      }
                      name="title"
                      value={formData.title}
                      placeholder="Title (required)"
                      required
                      onChange={handleInputChange}
                    />
                    <textarea
                      className={
                        theme
                          ? "video-description"
                          : "video-description light-mode"
                      }
                      name="description"
                      placeholder="Description"
                      onChange={handleInputChange}
                      spellCheck="true"
                      value={formData.description}
                    />
                  </div>
                </form>

                <div
                  className="thumbnail-section"
                  style={
                    !isThumbnailSelected
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  <p>Thumbnail</p>
                  <p>
                    Select or upload a picture that shows what&apos;s in your
                    video. A good thumbnail stands out and draws viewer&apos;s
                    attention.
                  </p>
                  <label htmlFor="thumbnail-input" className="upload-thumbnail">
                    <AddPhotoAlternateOutlinedIcon
                      fontSize="medium"
                      style={{ color: "#808080" }}
                    />
                    <p>Upload thumbnail</p>
                  </label>
                  <input
                    id="thumbnail-input"
                    type="file"
                    name="thumbnail"
                    accept=".jpg, .png"
                    style={{ display: "none" }}
                    onChange={handleThumbnailChange}
                  />
                </div>
                <div
                  className="thumbnail-section thumb2"
                  style={
                    isThumbnailSelected
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  <p>Thumbnail</p>
                  <p>
                    Select or upload a picture that shows what&apos;s in your
                    video. A good thumbnail stands out and draws viewer&apos;s
                    attention.
                  </p>
                  <div className="thumb2-img">
                    <CloseRoundedIcon
                      className="close close2"
                      fontSize="medium"
                      style={{ color: theme ? "gray" : "white" }}
                      onClick={() => {
                        setIsThumbnailSelected(false);
                      }}
                    />
                    <img
                      className="prevThumbnail"
                      src={previewThumbnail}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="right-video-section">
                <div
                  className={
                    theme ? "preview-video" : "preview-video preview-light"
                  }
                >
                  <div
                    className="preview-img"
                    style={
                      Progress === 100 && VideoURL !== ""
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    <p className={theme ? "" : "text-light-mode"}>
                      Uploading video...
                    </p>
                  </div>
                  {Progress === 100 && VideoURL !== "" ? (
                    <video controls width="280" height="240">
                      <source
                        src={URL.createObjectURL(selectedVideo)}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                </div>

                <div
                  className={
                    theme ? "preview-bottom" : "preview-bottom preview-light2"
                  }
                >
                  <div className="file-details">
                    <p>Filename</p>
                    <p>{videoName}</p>
                  </div>
                </div>

                <div className="video-visibility">
                  <p>Visibility</p>
                  <div
                    className={
                      theme
                        ? "selected-visibility"
                        : "selected-visibility text-light-mode"
                    }
                    onClick={() => {
                      setIsVisibilityClicked(!isVisibilityClicked);
                    }}
                  >
                    <p>{visibility}</p>
                    <ArrowDropDownRoundedIcon
                      fontSize="large"
                      style={{ color: theme ? "white" : "black" }}
                    />
                  </div>
                  {isVisibilityClicked && (
                    <div
                      className={
                        theme
                          ? "show-visibility"
                          : "show-visibility studio-light"
                      }
                    >
                      <p
                        className="public"
                        style={
                          visibility === "Public"
                            ? { backgroundColor: "rgba(255, 255, 255, 0.134)" }
                            : { backgroundColor: "rgba(255, 255, 255, 0)" }
                        }
                        onClick={() => {
                          setVisibility("Public");
                          setIsVisibilityClicked(false);
                          handleInputChange({
                            target: { name: "isPublished", value: true },
                          });
                        }}
                      >
                        Public
                      </p>
                      <hr className="separatee" />
                      <p
                        className="private"
                        style={
                          visibility === "Private"
                            ? { backgroundColor: "rgba(255, 255, 255, 0.134)" }
                            : { backgroundColor: "rgba(255, 255, 255, 0)" }
                        }
                        onClick={() => {
                          setVisibility("Private");
                          setIsVisibilityClicked(false);
                          handleInputChange({
                            target: { name: "isPublished", value: false },
                          });
                        }}
                      >
                        Private
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="last-segment"
              style={
                isVideoSelected === true
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <hr
                className={
                  theme
                    ? "seperate seperate2"
                    : "seperate seperate2 seperate-light"
                }
              />
              <div className="last-btn">
                <div className="left-icons">
                  <CloudUploadIcon
                    className="left-ic"
                    fontSize="large"
                    style={
                      Progress === 100
                        ? { display: "none" }
                        : { color: "gray", marginRight: "6px" }
                    }
                  />
                  <SdIcon
                    className="left-ic"
                    fontSize="large"
                    style={
                      Progress >= 60
                        ? { display: "none" }
                        : { color: "gray", marginLeft: "6px" }
                    }
                  />
                  <CloudDoneRoundedIcon
                    className="left-ic"
                    fontSize="large"
                    style={
                      Progress === 100
                        ? {
                            display: "block",
                            color: "#3ea6ff",
                            marginRight: "6px",
                            animation: "none",
                          }
                        : { display: "none" }
                    }
                  />
                  <HdIcon
                    className="left-ic"
                    fontSize="large"
                    style={
                      Progress >= 60
                        ? {
                            display: "block",
                            color: "#3ea6ff",
                            marginLeft: "6px",
                            animation: "none",
                          }
                        : { display: "none" }
                    }
                  />
                  <p
                    style={
                      Progress === 100
                        ? { display: "none" }
                        : { marginLeft: "12px" }
                    }
                  >
                    Uploading {Progress}% ...
                  </p>
                  <p
                    style={
                      Progress === 100
                        ? { marginLeft: "12px" }
                        : { display: "none" }
                    }
                  >
                    Video uploaded
                  </p>
                </div>
                {loading ? (
                  <button
                    className={
                      loading || Progress !== 100
                        ? "save-video-data-disable"
                        : "save-video-data"
                    }
                    onClick={PublishData}
                    disabled={
                      loading === true || Progress !== 100 ? true : false
                    }
                  >
                    <span className="loader3"></span>
                  </button>
                ) : (
                  <button
                    className={
                      loading || Progress !== 100
                        ? `save-video-data-disable ${
                            theme ? "" : "text-dark-mode"
                          }`
                        : `save-video-data ${theme ? "" : "text-dark-mode"}`
                    }
                    onClick={PublishData}
                    disabled={
                      loading === true || Progress !== 100 ? true : false
                    }
                  >
                    PUBLISH
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* video table list section  */}
          <hr
            className="breakk2 breakkk"
            style={{ left: menu ? "88px" : "262px" }}
          />
          <div
            className="channels-uploaded-videos-section"
            style={{ left: menu ? "90px" : "270px" }}
          >
            {sortedUserVideos && sortedUserVideos.length > 0 && (
              <table className="videos-table">
                <thead>
                  <tr
                    style={{
                      color: theme ? "#aaa" : "black",
                      fontSize: "14px",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        paddingLeft: "40px",
                        width: "45%",
                      }}
                    >
                      Video
                    </th>
                    <th>Visibility</th>
                    <th onClick={handleSortByDate} className="date-table-head">
                      <div className="table-row">
                        <p className={theme ? "" : "text-light-mode"}>Date</p>
                        {changeSort === false ? (
                          <SouthIcon
                            fontSize="200px"
                            style={{
                              color: theme ? "white" : "black",
                              marginLeft: "5px",
                            }}
                          />
                        ) : (
                          <NorthOutlinedIcon
                            fontSize="200px"
                            style={{
                              color: theme ? "white" : "black",
                              marginLeft: "5px",
                            }}
                          />
                        )}
                      </div>
                    </th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Likes</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUserVideos.map((element, index) => {
                    const uploaded = new Date(element.createdAt);
                    return (
                      <tr
                        key={index}
                        className={
                          theme ? "table-roww" : "table-roww preview-lightt"
                        }
                        style={
                          loading === true
                            ? { pointerEvents: "none" }
                            : { pointerEvents: "auto" }
                        }
                      >
                        <td className="video-cell">
                          <SkeletonTheme
                            baseColor={theme ? "#353535" : "#aaaaaa"}
                            highlightColor={theme ? "#444" : "#b6b6b6"}
                          >
                            <div
                              className="no-skeleton"
                              style={
                                loading === true
                                  ? { display: "flex" }
                                  : { display: "none" }
                              }
                            >
                              <Skeleton
                                count={1}
                                width={150}
                                height={84}
                                style={{ marginLeft: "30px" }}
                              />
                            </div>
                          </SkeletonTheme>
                          <div
                            className="no-skeleton"
                            style={
                              loading === true
                                ? { visibility: "hidden", display: "none" }
                                : { visibility: "visible", display: "flex" }
                            }
                          >
                            <img
                              src={element.thumbnail.url}
                              alt="thumbnail"
                              className="studio-video-thumbnail"
                              onClick={() => {
                                navigate(`/studio/video/edit/${element._id}`);
                              }}
                            />
                            <p className="video-left-duration">
                              {Math.floor(element.duration / 60) +
                                ":" +
                                (Math.round(element.duration % 60) < 10
                                  ? "0" + Math.round(element.duration % 60)
                                  : Math.round(element.duration % 60))}
                            </p>
                          </div>
                          <div className="studio-video-details">
                            <SkeletonTheme
                              baseColor={theme ? "#353535" : "#aaaaaa"}
                              highlightColor={theme ? "#444" : "#b6b6b6"}
                            >
                              <div
                                className="no-skeleton2"
                                style={
                                  loading === true
                                    ? { display: "flex" }
                                    : { display: "none" }
                                }
                              >
                                <Skeleton
                                  count={1}
                                  width={250}
                                  height={14}
                                  style={{
                                    borderRadius: "3px",
                                    position: "relative",
                                    left: "25px",
                                  }}
                                />
                                <Skeleton
                                  count={1}
                                  width={180}
                                  height={10}
                                  style={{
                                    borderRadius: "3px",
                                    position: "relative",
                                    top: "15px",
                                    left: "25px",
                                  }}
                                />
                                <Skeleton
                                  count={1}
                                  width={140}
                                  height={10}
                                  style={{
                                    borderRadius: "3px",
                                    position: "relative",
                                    top: "18px",
                                    left: "25px",
                                  }}
                                />
                              </div>
                            </SkeletonTheme>

              <div
                className="channel-top-content"
                style={
                  loading === true
                    ? { visibility: "hidden", display: "none" }
                    : { visibility: "visible", display: "flex" }
                }
              >
                <div
                  className={
                    theme
                      ? "channel-left-content"
                      : "channel-left-content text-light-mode"
                  }
                >
                  <img
                    src={element.avatar}
                    alt="channelDP"
                    className="channel_profile"
                  />
                  <div className="channel-topleft-data">
                    <div className="channel-left">
                      <div className="channel-name-verified">
                        <p className="channelname">{element.username}</p>
                        <Tooltip
                          TransitionComponent={Zoom}
                          title="Verified"
                          placement="right"
                        >
                          <CheckCircleIcon
                            fontSize="small"
                            style={{
                              color: "rgb(138, 138, 138)",
                              marginLeft: "6px",
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div
                        className={
                          theme
                            ? "channel-extra"
                            : "channel-extra text-light-mode2"
                        }
                      >
                        <p className="channeluser">@{element.username}</p>
                        <p className="my-subs">
                          {element.subscribersCount} subscribers
                        </p>
                        {myVideos &&
                        myVideos.message !== "USER DOESN'T EXIST" ? (
                          <p className="my-videoscount">
                            {/* {myVideos && myVideos.length} videos */}
                          </p>
                        ) : (
                          <p className="my-videoscount">0 videos</p>
                        )}
                      </div>

                      <div
                        className={
                          theme ? "more-about" : "more-about text-light-mode2"
                        }
                        onClick={() => {
                          localStorage.setItem("Section", "About");
                          window.location.reload();
                        }}
                      >
                        <p className="more-text">More about this channel</p>
                        <ArrowForwardIosIcon
                          fontSize="15px"
                          style={{ color: "#aaa", marginLeft: "7px" }}
                        />
                      </div>
                    </div>
                    {element.email === Email ? (
                      <div className="channel-right-content channel-dualbtns">
                        <button
                          className={
                            theme
                              ? "customize-channel"
                              : "customize-channel btn-light-mode"
                          }
                          onClick={() => {
                            navigate("/studio/customize");
                          }}
                        >
                          Customize channel
                        </button>
                        <button
                          className={
                            theme
                              ? "manage-videos"
                              : "manage-videos btn-light-mode"
                          }
                          onClick={() => {
                            navigate("/studio/video");
                          }}
                        >
                          Manage videos
                        </button>
                        <div
                          className="setting-btn"
                          onClick={() => {
                            navigate("/studio/video");
                          }}
                        >
                          <RiUserSettingsLine
                            fontSize="28px"
                            color={theme ? "white" : "black"}
                            className={
                              theme
                                ? "channel-settings"
                                : "channel-settings channel-settings-light"
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="channel-right-content">
                        <button
                          className={
                            theme
                              ? "subscribethis-channel"
                              : "subscribethis-channel-light text-dark-mode"
                          }
                          style={
                            isSubscribed === true
                              ? { display: "none" }
                              : { display: "block" }
                          }
                          onClick={() => {
                            if (token) {
                              // SubscribeChannel();
                            } else {
                              setisbtnClicked(true);
                              document.body.classList.add("bg-css");
                            }
                          }}
                        >
                          Subscribe
                        </button>
                        <button
                          className={
                            theme
                              ? "subscribethis-channel2"
                              : "subscribethis-channel2-light"
                          }
                          style={
                            isSubscribed === true
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          onClick={() => {
                            if (token) {
                              // SubscribeChannel();
                            } else {
                              setisbtnClicked(true);
                              document.body.classList.add("bg-css");
                            }
                          }}
                        >
                          Subscribed
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="channel-mid-content">
                <BasicTabs
                  section={Section}
                  handleTabChange={handleTabChange}
                  newemail={element.email}
                />
              </div>
              <br />
            </div>
          ) : (
            <div className="main-trending-section">
              <div className="spin23" style={{ top: "200px" }}>
                <span className={theme ? "loader2" : "loader2-light"}></span>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default OtherChannel;
