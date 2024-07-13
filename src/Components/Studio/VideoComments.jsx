import "../../Css/Studio/comments.css";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Tooltip from "@mui/material/Tooltip";
import WestIcon from "@mui/icons-material/West";
import Zoom from "@mui/material/Zoom";
import noImage from "../../img/no-comment.png";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentsDetails,
  getSelectedComment,
} from "../../redux/actions/commentAction";
import { getLikeCommentToggle } from "../../redux/actions/likeAction";

function VideoComments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedComment = useSelector(
    (state) => state.comments.selectedComment
  );

  const isLiked = useSelector((state) => state.like.isLiked);

  const { id } = useParams();
  const [Email, setEmail] = useState();
  const [videoComments, setVideoComments] = useState([]);
  const [filterComment, setFilterComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [menu, setmenu] = useState(() => {
    const menu = localStorage.getItem("studioMenuClicked2");
    return menu ? JSON.parse(menu) : false;
  });
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  document.title = "Video comments - YouTube Studio";

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
    const token = localStorage.getItem("userToken");
    setEmail(jwtDecode(token).email);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      document
        .querySelector(".video-all-comments-section")
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
        .querySelector(".video-all-comments-section")
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

  useEffect(() => {
    const getComment = async () => {
      try {
        if (id !== undefined) {
          dispatch(getSelectedComment(id));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComment();
  }, [id]);

  useEffect(() => {
    setVideoComments(selectedComment);
  }, [selectedComment]);

  const LikeComment = async (_id, id) => {
    try {
      if (id !== undefined) {
        dispatch(getLikeCommentToggle(_id, isLiked, id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const DeleteComment = async (commentId, id) => {
    try {
      dispatch(deleteCommentsDetails(commentId, id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterComments =
    videoComments &&
    videoComments.filter(
      (item) =>
        (item.content &&
          item.content.toLowerCase().includes(filterComment.toLowerCase())) ||
        (item.owner.username &&
          item.owner.username
            .toLowerCase()
            .includes(filterComment.toLowerCase()))
    );

  return (
    <>
      <div
        className="back-menu-edit"
        onClick={() => navigate("/studio/comments")}
      >
        <WestIcon fontSize="medium" style={{ color: "#aaa" }} />
      </div>

      <div className="video-all-comments-section">
        <div
          className="vid-comments-top"
          style={{ left: menu ? "125px" : "310px" }}
        >
          <p className={theme ? "" : "text-light-mode"}>Video comments</p>
        </div>
        <div
          className="vid-comments-mid"
          style={{ left: menu ? "130px" : "312px" }}
        >
          <p className={theme ? "" : "blue-txt"}>Comments</p>
        </div>
        <hr
          className="breakkk breakk-vid-comment"
          style={{ left: menu ? "88px" : "262px" }}
        />
        <div
          className="vid-filter-comments"
          style={{ left: menu ? "90px" : "270px" }}
        >
          <FilterListOutlinedIcon
            fontSize="medium"
            style={{ color: theme ? "#aaa" : "#606060", cursor: "pointer" }}
          />

          <input
            type="text"
            name="comment-search"
            className={theme ? "" : "text-light-mode"}
            value={filterComment}
            placeholder="Filter"
            onChange={(e) => setFilterComment(e.target.value)}
          />
        </div>

        <div
          className="vid-comments-list"
          style={{ left: menu ? "90px" : "270px" }}
        >
          <div className="overall-comments">
            {videoComments &&
              videoComments.length > 0 &&
              filterComment === "" &&
              videoComments.map((element, index) => {
                return (
                  <>
                    {/* START HERE  */}
                    <SkeletonTheme
                      baseColor={theme ? "#353535" : "#aaaaaa"}
                      highlightColor={theme ? "#444" : "#b6b6b6"}
                    >
                      <div
                        className={
                          theme
                            ? "user-comment-data"
                            : "user-comment-data preview-lightt"
                        }
                        key={index}
                        style={
                          loading === true
                            ? { display: "flex" }
                            : { display: "none" }
                        }
                      >
                        <div className="leftside-viddata">
                          <Skeleton
                            count={1}
                            width={45}
                            height={45}
                            style={{
                              borderRadius: "100%",
                            }}
                          />
                          <div className="comment-rightt-data">
                            <div
                              className={
                                theme
                                  ? "name-time"
                                  : "name-time text-light-mode2"
                              }
                            >
                              <Skeleton
                                count={1}
                                width={200}
                                height={15}
                                style={{
                                  borderRadius: "3px",
                                  position: "relative",
                                }}
                              />
                            </div>
                            <Skeleton
                              count={1}
                              width={180}
                              height={22}
                              style={{
                                borderRadius: "3px",
                                position: "relative",
                                top: "6px",
                              }}
                            />
                            <div className="comment-all-btns">
                              <div className="cmmt-like">
                                <Tooltip
                                  TransitionComponent={Zoom}
                                  title="Like/Unlike"
                                  placement="bottom"
                                >
                                  <ThumbUpIcon
                                    fontSize="small"
                                    className="thiscomment-like-btn"
                                    style={{
                                      color: theme ? "white" : "#606060",
                                    }}
                                  />
                                </Tooltip>
                              </div>
                              <Tooltip
                                TransitionComponent={Zoom}
                                title="Delete"
                                placement="bottom"
                              >
                                <DeleteOutlineOutlinedIcon
                                  fontSize="small"
                                  style={{ color: theme ? "#aaa" : "#606060" }}
                                  className="deletethis-cmmt"
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SkeletonTheme>

                    {/* END HERE  */}

                    {/*===================  comment deatils ================== */}
                    <div
                      className={
                        theme
                          ? "user-comment-data"
                          : "user-comment-data preview-lightt"
                      }
                      key={index}
                      style={
                        loading === false
                          ? { visibility: "visible", display: "flex" }
                          : { visibility: "hidden", display: "none" }
                      }
                    >
                      <div className="leftside-viddata">
                        <img
                          src={element.owner.avatar}
                          alt="profile"
                          className="user-channelprofileee"
                        />
                        <div className="comment-rightt-data">
                          <div
                            className={
                              theme ? "name-time" : "name-time text-light-mode2"
                            }
                          >
                            <p>{element.owner.username}</p>
                            <FiberManualRecordIcon
                              className="dot-seperate"
                              style={{
                                color: "#aaa",
                                marginLeft: "6px",
                                marginRight: "6px",
                              }}
                            />
                            <p>
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
                          <p
                            className={theme ? "" : "text-light-mode"}
                            style={{ marginTop: "8px" }}
                          >
                            {element.content}
                          </p>
                          <div className="comment-all-btns">
                            <div className="cmmt-like">
                              <Tooltip
                                TransitionComponent={Zoom}
                                title="Like/Unlike"
                                placement="bottom"
                              >
                                <ThumbUpIcon
                                  fontSize="small"
                                  className="thiscomment-like-btn"
                                  style={{ color: theme ? "white" : "#606060" }}
                                  onClick={() => {
                                    LikeComment(element._id, id);
                                  }}
                                />
                              </Tooltip>
                              <p
                                className={theme ? "" : "text-light-mode"}
                                style={{ marginLeft: "10px" }}
                              >
                                {element.likes}
                              </p>
                            </div>

                            <Tooltip
                              TransitionComponent={Zoom}
                              title="Delete"
                              placement="bottom"
                            >
                              <DeleteOutlineOutlinedIcon
                                fontSize="small"
                                style={{ color: theme ? "#aaa" : "#606060" }}
                                className="deletethis-cmmt"
                                onClick={() => {
                                  DeleteComment(element._id, id);
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

            {filterComments &&
              filterComment !== "" &&
              filterComments.length > 0 &&
              filterComments.map((element, index) => {
                return (
                  <div
                    className={
                      theme
                        ? "user-comment-data"
                        : "user-comment-data preview-lightt"
                    }
                    key={index}
                  >
                    <div className="leftside-viddata">
                      <img
                        src={element.owner.avatar}
                        alt="profile"
                        className="user-channelprofileee"
                      />
                      <div className="comment-rightt-data">
                        <div
                          className={
                            theme ? "name-time" : "name-time text-light-mode2"
                          }
                        >
                          <p>{element.owner.username}</p>
                          <FiberManualRecordIcon
                            className="dot-seperate"
                            style={{
                              color: "#aaa",
                              marginLeft: "6px",
                              marginRight: "6px",
                            }}
                          />
                          <p>
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
                        <p
                          className={theme ? "" : "text-light-mode"}
                          style={{ marginTop: "8px" }}
                        >
                          {element.content}
                        </p>
                        <div className="comment-all-btns">
                          <div className="cmmt-like">
                            <Tooltip
                              TransitionComponent={Zoom}
                              title="Like/Unlike"
                              placement="bottom"
                            >
                              <ThumbUpIcon
                                fontSize="small"
                                className="thiscomment-like-btn"
                                style={{ color: theme ? "white" : "#606060" }}
                                onClick={() => {
                                  LikeComment(element._id, id);
                                }}
                              />
                            </Tooltip>
                            <p style={{ marginLeft: "10px" }}>
                              {element.likes}
                            </p>
                          </div>

                          <Tooltip
                            TransitionComponent={Zoom}
                            title="Delete"
                            placement="bottom"
                          >
                            <DeleteOutlineOutlinedIcon
                              fontSize="small"
                              style={{ color: theme ? "#aaa" : "#606060" }}
                              className="deletethis-cmmt"
                              onClick={() => {
                                DeleteComment(element._id, id);
                              }}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {filterComments &&
              filterComment !== "" &&
              filterComments.length === 0 && (
                <div className="user-comment-data2">
                  <div className="no-comment-found">
                    <img src={noImage} alt="no-comment" className="nocmmt" />
                    <p className={theme ? "" : "text-light-mode2"}>
                      No comments found. Try searching for something else.
                    </p>
                  </div>
                </div>
              )}

            {loading === false &&
              videoComments &&
              videoComments.length === 0 &&
              filterComment === "" && (
                <div className="user-comment-data2">
                  <div className="no-comment-found">
                    <img src={noImage} alt="no-comment" className="nocmmt" />
                    <p className={theme ? "" : "text-light-mode2"}>
                      No comments found.
                    </p>
                  </div>
                </div>
              )}

            {loading === true &&
              videoComments &&
              videoComments.length === 0 && (
                <div className="user-comment-data2" style={{ top: "60px" }}>
                  <div className="no-comment-found">
                    <div className="spin23">
                      <span
                        className={theme ? "loader2" : "loader2-light"}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoComments;
