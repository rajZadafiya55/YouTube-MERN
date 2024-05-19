import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import avatar from "../img/avatar.png";
import "../Css/studio.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Upload from "../img/upload.png";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SdIcon from "@mui/icons-material/Sd";
import HdIcon from "@mui/icons-material/Hd";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import LinkIcon from "@mui/icons-material/Link";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Dashboard from "./Studio/Dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { LiaUploadSolid } from "react-icons/lia";

//SOCIALS

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addVideoData } from "../redux/actions/videoAction.js";

function Studio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendURL = "http://localhost:3000";
  const [email, setEmail] = useState("");
  const [isChannel, setisChannel] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewImage, setPreviewImage] = useState(avatar);
  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [ChannelName, setChannelName] = useState();
  const [ChannelAbout, setChannelAbout] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [videoName, setVideoName] = useState("Upload videos");
  const [VideoURL, setVideoURL] = useState("");
  const [Progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [linksClicked, setLinksClicked] = useState(false);
  const [iconClicked, setIconClicked] = useState("");
  const [myVideos, setMyVideos] = useState([]);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [isThumbnailSelected, setIsThumbnailSelected] = useState(false);
  const [visibility, setVisibility] = useState("Private");
  const [isVisibilityClicked, setIsVisibilityClicked] = useState(false);

  //TOAST FUNCTIONS

  const CancelNotify = () =>
    toast.warning("Video upload was cancelled!", {
      position: "bottom-center",
      autoClose: 950,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  //USE EFFECTS

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setEmail(jwtDecode(token).email);
  }, []);

  useEffect(() => {
    if (theme === false && window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "#F9F9F9";
    } else if (theme === true && window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "rgb(31, 31, 31)";
    }
  }, [theme]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        if (email !== undefined) {
          const response = await fetch(`${backendURL}/getuservideos/${email}`);
          const data = await response.json();
          setMyVideos(data);
        }
      } catch (error) {
        // console.log(error.message);
      }
    };

    getVideos();
  }, [email]);

  useEffect(() => {
    const handleClick = () => {
      setIsClicked(true);
    };

    const uploadBtn = document.querySelector(".uploadnewone-video");
    if (uploadBtn) {
      uploadBtn.addEventListener("click", handleClick);

      return () => {
        if (uploadBtn) {
          uploadBtn.removeEventListener("click", handleClick);
        }
      };
    }
  }, []);

  useEffect(() => {
    const handleClick = () => {
      document.querySelector(".studio").classList.add("studio-dark");
    };

    const searchInp = document.getElementById("searchType2");

    if (searchInp) {
      searchInp.addEventListener("click", handleClick);
    }

    return () => {
      if (searchInp) {
        searchInp.removeEventListener("click", handleClick);
      }
    };
  });

  useEffect(() => {
    const handleClick = () => {
      document.querySelector(".studio").classList.remove("studio-dark");
    };

    const crossBtn = document.querySelector(".clear-search");

    if (crossBtn) {
      crossBtn.addEventListener("click", handleClick);
    }

    return () => {
      if (crossBtn) {
        crossBtn.removeEventListener("click", handleClick);
      }
    };
  });

  useEffect(() => {
    if (isChannel === false) {
      document.body.classList.add("bg-css");
    } else {
      document.body.classList.remove("bg-css");
    }
  }, [isChannel]);

  useEffect(() => {
    if (isClicked === true) {
      document.body.classList.add("bg-css");
    } else {
      document.body.classList.remove("bg-css");
    }
  }, [isClicked]);

  //GET CHANNEL'S DATA

  useEffect(() => {
    const ChannelAvailable = async () => {
      try {
        const response = await fetch(`${backendURL}/getchannel/${email}`);
        const { channel } = await response.json();
        setisChannel(channel);
      } catch (error) {
        // console.log(error.message);
      }
    };

    ChannelAvailable();
  }, [email]);

  //IMAGE UPLOAD

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChannelname = (e) => {
    setChannelName(e.target.value);
  };

  const handleChannelabout = (e) => {
    setChannelAbout(e.target.value);
  };

  
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

    await dispatch(addVideoData(formData, setLoading,setIsClicked));

    clearFormState();
  };

  return (
    <>
      <div className={theme ? "studio" : "studio studio-light"}>
        {/* video upload icon  */}
        <div
          className={theme ? "create-btn" : "create-btn create-btn-light"}
          onClick={() => setIsClicked(true)}
          style={isChannel === true ? { display: "flex" } : { display: "none" }}
        >
          <VideoCallOutlinedIcon
            className=""
            fontSize="large"
            style={{ color: "#FF4E45" }}
          />
          <p className={theme ? "" : "text-light-mode"}>CREATE</p>
        </div>

        <div
          style={
            myVideos && myVideos.message === "USER DOESN'T EXIST"
              ? { display: "block" }
              : { display: "none" }
          }
          className={theme ? "create-btn2" : "create-btn2 create-btn-light"}
          onClick={() => setIsClicked(true)}
        >
          CREATE
        </div>

        <div
          style={isChannel === true ? { display: "flex" } : { display: "none" }}
          className={theme ? "create-btn-short" : "create-btn-short light-mode"}
          onClick={() => setIsClicked(true)}
        >
          <LiaUploadSolid
            fontSize="22px"
            color={theme ? "#b1b1b1" : "#606060"}
          />
        </div>

        {/* create channel form  */}
        <div
          className={
            theme
              ? "create-channel"
              : "create-channel light-mode text-light-mode"
          }
          style={
            isChannel === false ? { display: "flex" } : { display: "none" }
          }
        >
          <ClearRoundedIcon
            fontSize="large"
            className={theme ? "close-channel" : "close-channel-light"}
            style={{ color: theme ? "rgb(170 170 170 / 50%)" : "#606060" }}
            onClick={() => {
              navigate("/");
            }}
          />
          <p className="channel-head">Create Your Channel</p>
          <p
            className={
              theme ? "channel-slogan" : "channel-slogan text-light-mode2"
            }
          >
            Share Your Story: Inspire and Connect with a YouTube Channel!
          </p>
          <form onSubmit="" className="channel-deatils">
            <div className="profile-pic-section">
              <img src={previewImage} alt="" className="selected-pic" />
              <div className="upload-btn-wrapper">
                <button className={theme ? "btn" : "btn text-dark-mode"}>
                  SELECT
                </button>
                <input
                  type="file"
                  name="myfile"
                  accept=".jpg, .png"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="channel-name">
              <input
                className={
                  theme
                    ? "channelName"
                    : "channelName light-mode text-light-mode new-light-border"
                }
                type="text"
                name="channelname"
                placeholder="Channel Name"
                maxLength={25}
                onChange={handleChannelname}
                required
              />
              <textarea
                className={
                  theme
                    ? "channelAbout"
                    : "channelAbout light-mode text-light-mode new-light-border"
                }
                type="text"
                name="channelAbout"
                placeholder="About channel"
                onChange={handleChannelabout}
                style={{ width: "93%", resize: "vertical" }}
                required
              />
              <Tooltip
                TransitionComponent={Zoom}
                title="Add links"
                placement="top"
              >
                <div
                  className={
                    theme
                      ? "add-links"
                      : "add-links light-mode new-light-border"
                  }
                  onClick={() => {
                    if (linksClicked === false) {
                      setLinksClicked(true);
                    } else {
                      setLinksClicked(false);
                    }
                  }}
                >
                  <LinkIcon
                    fontSize="medium"
                    style={{ color: theme ? "white" : "black" }}
                  />
                </div>
              </Tooltip>
              <div
                className={
                  theme
                    ? "social-icons-links"
                    : "social-icons-links add-social-light"
                }
                style={
                  linksClicked === true
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <FacebookIcon
                  fontSize="large"
                  className={theme ? "social_links" : "social_links-light"}
                  style={{
                    color: theme ? "white" : "#606060",
                    marginRight: "15px",
                  }}
                  onClick={() => {
                    if (iconClicked !== "Facebook") {
                      setIconClicked("Facebook");
                    } else {
                      setIconClicked("");
                    }
                  }}
                />
                <InstagramIcon
                  fontSize="large"
                  className={theme ? "social_links" : "social_links-light"}
                  style={{
                    color: theme ? "white" : "#606060",
                    marginRight: "15px",
                  }}
                  onClick={() => {
                    if (iconClicked !== "Instagram") {
                      setIconClicked("Instagram");
                    } else {
                      setIconClicked("");
                    }
                  }}
                />
                <TwitterIcon
                  fontSize="large"
                  className={theme ? "social_links" : "social_links-light"}
                  style={{
                    color: theme ? "white" : "#606060",
                    marginRight: "15px",
                  }}
                  onClick={() => {
                    if (iconClicked !== "Twitter") {
                      setIconClicked("Twitter");
                    } else {
                      setIconClicked("");
                    }
                  }}
                />
                <LanguageIcon
                  fontSize="large"
                  className={theme ? "social_links" : "social_links-light"}
                  style={{ color: theme ? "white" : "#606060" }}
                  onClick={() => {
                    if (iconClicked !== "Website") {
                      setIconClicked("Website");
                    } else {
                      setIconClicked("");
                    }
                  }}
                />
              </div>
            </div>
            {isLoading === false ? (
              <button
                className={
                  isLoading
                    ? `save-data-disable ${theme ? "" : "text-dark-mode"}`
                    : `save-data ${theme ? "" : "text-dark-mode"}`
                }
                type="submit"
                style={
                  linksClicked === true
                    ? { marginTop: 0 }
                    : { marginTop: "22px" }
                }
                disabled={isLoading ? true : false}
              >
                SAVE
              </button>
            ) : (
              <button
                className={isLoading ? "save-data-disable" : "save-data"}
                type="submit"
                style={
                  linksClicked === true
                    ? { marginTop: 0 }
                    : { marginTop: "22px" }
                }
                disabled={isLoading ? true : false}
              >
                <span className="loader4"></span>
              </button>
            )}
          </form>
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
            isChannel === true && isClicked === true
              ? { display: "flex" }
              : { display: "none" }
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
                  CancelNotify();
                  setIsClicked(false);

                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                } else if (
                  Progress === 100 &&
                  formData.isPublished === "true"
                ) {
                  CancelNotify();
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }
                if (isClicked === true) {
                  clearFormState();
                }
              }}
            />
          </div>

          <hr
            className={
              theme ? "seperate seperate2" : "seperate seperate2 seperate-light"
            }
          />
          <div
            className="middle-data"
            style={!isVideoSelected ? { display: "flex" } : { display: "none" }}
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
            style={isVideoSelected ? { display: "flex" } : { display: "none" }}
          >
            <div className="left-video-section">
              <form className="details-form">
                <div className="details-section">
                  <p>Details</p>
                  <input
                    type="text"
                    className={theme ? "video-title" : "video-title light-mode"}
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
                      theme ? "show-visibility" : "show-visibility studio-light"
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
                          target: { name: "isPublished", value: "public" },
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
                          target: { name: "isPublished", value: "private" },
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
                  disabled={loading === true || Progress !== 100 ? true : false}
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
                  disabled={loading === true || Progress !== 100 ? true : false}
                >
                  PUBLISH
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isChannel === true ? <Dashboard /> : ""}
    </>
  );
}

export default Studio;
