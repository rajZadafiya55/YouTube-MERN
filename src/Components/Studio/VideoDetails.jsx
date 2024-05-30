import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../../Css/Studio/videodetails.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HdIcon from "@mui/icons-material/Hd";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import WestIcon from "@mui/icons-material/West";

import "react-toastify/dist/ReactToastify.css";
import { GrUndo } from "react-icons/gr";
import { APIHttp, commonNotify } from "../../constant/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedVideo,
  updateVideoData,
} from "../../redux/actions/videoAction";

function VideoDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedVideos = useSelector((state) => state.videos.selectedVideo);

  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    thumbnailURL: "",
    videoURL: "",
    visibility: "",
  });

  const videolink = `${APIHttp}videos`;
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailSelected, setThumbnailSelected] = useState(false);

  const [OptionClicked, setOptionClicked] = useState(false);
  const [changes, setChanges] = useState(false);
  const [privacyClicked, setprivacyClicked] = useState(false);
  const [updatePrivacy, setprivacy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [fakeLoading, setFakeLoading] = useState(true);
  const [menu, setmenu] = useState(() => {
    const menu = localStorage.getItem("studioMenuClicked2");
    return menu ? JSON.parse(menu) : false;
  });
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  const optionRef = useRef();

  document.title = "Video details - YouTube Studio";

  //USE EFFECTS

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setmenu((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu2");
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
    if (theme === false && window.location.href.includes("/studio/video")) {
      document.body.style.backgroundColor = "white";
    } else if (
      theme === true &&
      window.location.href.includes("/studio/video")
    ) {
      document.body.style.backgroundColor = "#282828";
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("studioMenuClicked2", JSON.stringify(menu));
  }, [menu]);

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
    if (selectedVideos) {
      setVideoData({
        title: selectedVideos.title,
        description: selectedVideos.description,
        thumbnailURL: selectedVideos.thumbnail.url,
        videoURL: selectedVideos.videoFile.url,
        visibility: selectedVideos.isPublished == true ? "Public" : "Private",
      });
    }
  }, [selectedVideos]);

  useEffect(() => {
    setTimeout(() => {
      setFakeLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    if (loading === true) {
      setOpacity(0.4);
    } else {
      setOpacity(1);
    }
  }, [loading]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${videolink}/${id}`)
      .then(() => {
        commonNotify("Link Copied!");
      })
      .catch((error) => {
        console.log("Error copying link to clipboard:", error);
      });
  };

  useEffect(() => {
    const handleClick = () => {
      document
        .querySelector(".main-video-details-section")
        .classList.add("channel-dark");
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
      document
        .querySelector(".main-video-details-section")
        .classList.remove("channel-dark");
    };

    const clearBtn = document.querySelector(".clear-search");

    if (clearBtn) {
      clearBtn.addEventListener("click", handleClick);
    }

    return () => {
      if (clearBtn) {
        clearBtn.removeEventListener("click", handleClick);
      }
    };
  });

  const handleThumbnailDownload = () => {
    if (thumbnailImage) {
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(thumbnailImage);
      anchor.download = "thumbnail.png"; 
      anchor.click();
    }
  };

  const confirmReload = () => {
    if (changes) {
      const userConfirmation = window.confirm(
        "Changes you made may not be saved. Do you want to continue?"
      );
      if (userConfirmation) {
        window.location.reload();
      } else {
        // User clicked on "Cancel", do nothing
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setChanges(true);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setVideoData({
      ...videoData,
      thumbnail: file,
    });
    setThumbnailImage(file);
    setThumbnailSelected(true);
    setChanges(true);
  };

  const SaveData = async () => {
    try {
      setLoading(true);

      const updatedVideoData = {
        title: videoData.title,
        description: videoData.description,
        thumbnail:  thumbnailImage ? thumbnailImage : videoData.thumbnailURL,
        videoFile: videoData.videoURL,
        isPublished: updatePrivacy === "Public" ? true : false,
      };

      dispatch(updateVideoData(id, updatedVideoData, navigate));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
console.log("videodata",videoData)
  return (
    <>
      <div className="back-menu-edit" onClick={() => navigate("/studio/video")}>
        <WestIcon fontSize="medium" style={{ color: "#aaa" }} />
      </div>

      <div
        className="main-video-details-section"
        style={{
          opacity: opacity,
          pointerEvents: loading ? "none" : "auto",
          left: menu ? "115px" : "300px",
          transition: menu ? "all .12s ease" : "none",
          cursor: loading ? "wait" : "auto",
        }}
      >
        {/*======================  undo and save button ====================== */}
        <div className="current-editvideodata">
          <p
            className={
              theme ? "current-tophead" : "current-tophead text-light-mode"
            }
          >
            Video details
          </p>
          <div className="thissection-btns">
            <button
              className={changes === false ? "disabled-btn" : "video-editbtnss"}
              disabled={changes === false ? true : false}
              onClick={confirmReload}
            >
              UNDO CHANGES
            </button>
            <GrUndo
              fontSize="24px"
              color="white"
              className="undo-edit"
              onClick={confirmReload}
            />
            <button
              className={
                changes === false ? "disabled-btn2" : "video-editbtnss"
              }
              onClick={() => {
                SaveData();
              }}
              disabled={changes === false ? true : false}
            >
              SAVE
            </button>
          </div>
        </div>

        <div className="current-editvideo-data">
          {/*======================  video form ====================== */}
          <div className="video-details-left">
            <div className="current-video-editable-section">
              <div className="currentvideo-title">
                <input
                  type="text"
                  name="title"
                  className={
                    theme
                      ? "currentvideo-title-inp"
                      : "currentvideo-title-inp text-light-mode new-light-border"
                  }
                  value={videoData.title}
                  required
                  onChange={handleInputChange}
                  placeholder="Add a title that describes your video"
                  maxLength={100}
                />
                <p className="title-sample-txt">Title (required)</p>
              </div>
              <div className="currentvideo-desc">
                <textarea
                  type="text"
                  name="description"
                  required
                  className={
                    theme
                      ? "currentvideo-desc-inp"
                      : "currentvideo-desc-inp new-light-border text-light-mode"
                  }
                  onChange={handleInputChange}
                  placeholder="Tell viewers about your video"
                  value={videoData.description}
                  maxLength={5000}
                />
                <p
                  className={
                    theme
                      ? "desc-sample-txt"
                      : "desc-sample-txt desc-light-mode"
                  }
                >
                  Description
                </p>
              </div>
              <div className="currentvideo-thumbnailedit">
                <p className={theme ? "" : "text-light-mode"}>Thumbnail</p>
                <p className={theme ? "" : "text-light-mode2"}>
                  Select or upload a picture that shows what&apos;s in your
                  video. A good thumbnail stands out and draws viewers&apos;
                  attention.
                </p>
                <div className="mythumbnails-sectionn">
                  {thumbnailImage ? (
                    <div
                      className="currentthumbnail-data choosed-one"
                      style={{ bottom: thumbnailSelected ? "25px" : "0px" }}
                    >
                      <img
                        src={URL.createObjectURL(thumbnailImage)}
                        alt="thumbnail"
                        className="currnt-tbimg2"
                        style={
                          thumbnailSelected === true && videoData
                            ? {
                                border: `2.2px solid ${
                                  theme ? "white" : "#606060"
                                }`,
                                borderRadius: "3px",
                                opacity: "1",
                              }
                            : { border: "none", opacity: ".4" }
                        }
                        onClick={() => {
                          setThumbnailSelected(true);
                          setThumbnailImage(thumbnailImage);
                        }}
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="thumbnail-upload"
                      className={
                        theme
                          ? "uploadnew-thumbnaill"
                          : "uploadnew-thumbnaill new-light-border2"
                      }
                    >
                      <AddPhotoAlternateOutlinedIcon
                        fontSize="medium"
                        style={{ color: "#aaa" }}
                      />
                      <p>Upload thumbnail</p>
                    </label>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id="thumbnail-upload"
                    style={{ display: "none" }}
                    onChange={handleThumbnailChange}
                  />
                  <div className="currentthumbnail-data">
                    {fakeLoading === true ? (
                      <div
                        className="spin32"
                        style={{
                          position: "relative",
                          left: "50px",
                          top: "10px",
                        }}
                      >
                        <span
                          className={theme ? "loader2" : "loader2-light"}
                        ></span>
                      </div>
                    ) : (
                      <img
                        src={videoData && videoData.thumbnailURL}
                        alt="thumbnail"
                        className="currnt-tbimg"
                        style={
                          videoData && thumbnailSelected === false
                            ? {
                                border: `2.2px solid ${
                                  theme ? "white" : "#606060"
                                }`,
                                borderRadius: "3px",
                                opacity: "1",
                              }
                            : { border: "none", opacity: ".4" }
                        }
                        onClick={() => {
                          setThumbnailSelected(false);
                          setThumbnailImage(videoData.thumbnailURL);
                        }}
                      />
                    )}
                    <div
                      className="img-optionss"
                      style={
                        thumbnailImage && thumbnailSelected === true
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      onClick={() => setOptionClicked(!OptionClicked)}
                    >
                      <MoreVertOutlinedIcon
                        fontSize="small"
                        className="extra-optn"
                        style={{ color: "white" }}
                      />
                    </div>

                    {/* ========== updated tubmnail in three dot click so open card details ============= */}
                    <div
                      className="extra-img-options"
                      ref={optionRef}
                      style={
                        OptionClicked === true
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                    >
                      <label
                        htmlFor="thumbnail-upload"
                        className="change-thumbnail-img"
                        onClick={() => setOptionClicked(false)}
                      >
                        <AddPhotoAlternateOutlinedIcon
                          fontSize="medium"
                          style={{ color: "#aaa" }}
                        />
                        <p>Change</p>
                      </label>
                      <div
                        className="download-thumbnail"
                        onClick={() => {
                          handleThumbnailDownload();
                          setOptionClicked(false);
                        }}
                      >
                        <KeyboardTabOutlinedIcon
                          className="video-edit-icons"
                          fontSize="medium"
                          style={{
                            color: "#aaa",
                            transform: "rotate(90deg)",
                          }}
                        />
                        <p>Download</p>
                      </div>
                      <div
                        className="undo-thumbnail"
                        onClick={() => {
                          setThumbnailImage(null);
                          setOptionClicked(false);
                          setThumbnailSelected(false);
                        }}
                      >
                        <UndoOutlinedIcon
                          fontSize="medium"
                          style={{ color: "#aaa" }}
                        />
                        <p>Undo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*===============  Video show , link ============= */}
          <div className="video-details-right">
            <div className="preview-current-video">
              <iframe
                width="360"
                height="220"
                className="playable-videoedit"
                src={videoData && videoData.videoURL}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <div
                className={
                  theme
                    ? "preview-data-details"
                    : "preview-data-details preview-light2 text-light-mode"
                }
              >
                <div className="preview-part1">
                  <div className="video-linkleft">
                    <p className={theme ? "" : "text-light-mode2"}>
                      Video link
                    </p>
                    <p
                      className="current-videolink"
                      onClick={() => {
                        if (videoData) {
                          navigate(`${videolink}/${videoData._id}`);
                        }
                      }}
                    >
                      {videolink +
                        `/${
                          id
                            ? id.length <= 5
                              ? id
                              : id.substring(0, 5) + "..."
                            : ""
                        }`}
                    </p>
                  </div>
                  <ContentCopyIcon
                    fontSize="medium"
                    className={
                      theme ? "copythis-btn" : "copy-light-btn copybtn,"
                    }
                    style={{ color: "#aaaaaab0" }}
                    onClick={handleCopyLink}
                  />
                  <div className="copyvideokalink">
                    <ContentCopyIcon
                      fontSize="medium"
                      className={theme ? "copythis-btn-new" : "copy-light-btn2"}
                      style={{ color: "#aaaaaab0" }}
                      onClick={handleCopyLink}
                    />
                    <p>Copy Link</p>
                  </div>
                </div>

                <div className="preview-part3">
                  <p className={theme ? "" : "text-light-mode2"}>
                    Video quality
                  </p>
                  <HdIcon
                    fontSize="large"
                    style={{ color: "#3ea6ff", marginTop: "6px" }}
                  />
                </div>
              </div>
            </div>

            <div
              className={
                theme
                  ? "video-visibility-section"
                  : "video-visibility-section new-light-border"
              }
              onClick={() => {
                setprivacyClicked(!privacyClicked);
              }}
            >
              <p className={theme ? "" : "text-light-mode2"}>Visibility</p>
              <div className="visibility-current-data">
                <div className="privacy-current">
                  {updatePrivacy === "Public" ||
                  (updatePrivacy === null &&
                    videoData &&
                    videoData.visibility === "Public") ? (
                    <RemoveRedEyeOutlinedIcon
                      fontSize="small"
                      style={{ color: "#2ba640" }}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      fontSize="small"
                      style={{
                        color: theme ? "rgb(170 170 170 / 53%)" : "#606060",
                      }}
                    />
                  )}

                  {updatePrivacy === null ? (
                    <p className={theme ? "" : "text-light-mode"}>
                      {videoData && videoData.visibility}
                    </p>
                  ) : (
                    <p className={theme ? "" : "text-light-mode"}>
                      {updatePrivacy}
                    </p>
                  )}
                </div>
                <ArrowDropDownOutlinedIcon
                  fontSize="medium"
                  style={{ color: "#aaa" }}
                />
              </div>
            </div>

            <div
              className={
                theme
                  ? "select-any-visibility"
                  : "select-any-visibility light-mode"
              }
              style={
                privacyClicked === true
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <div
                className={
                  theme
                    ? "thispublic-visibility"
                    : "thispublic-visibility preview-lightt"
                }
                onClick={() => {
                  setprivacy("Public");
                  setprivacyClicked(false);
                  setChanges(true);
                }}
              >
                <RemoveRedEyeOutlinedIcon
                  fontSize="small"
                  style={{ color: "#2ba640" }}
                />
                <p className={theme ? "" : "text-light-mode"}>Public</p>
              </div>
              <div
                className={
                  theme
                    ? "thisprivate-visibility"
                    : "thisprivate-visibility preview-lightt"
                }
                onClick={() => {
                  setprivacy("Private");
                  setprivacyClicked(false);
                  setChanges(true);
                }}
              >
                <VisibilityOffOutlinedIcon
                  fontSize="small"
                  style={{
                    color: theme ? "rgb(170 170 170 / 53%)" : "#606060",
                  }}
                />
                <p className={theme ? "" : "text-light-mode"}>Private</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
