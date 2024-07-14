import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import nothing from "../../img/nothing.png";
import "../../Css/channel.css";
import { getAllChannelVideosById } from "../../redux/actions/dashboardAction.js";

const ChannelVideos = (props) => {
  const { id } = props;

  const dispatch = useDispatch();
  const AllVideo = useSelector((state) => state.dashboard.videosDetails);

  const token = localStorage.getItem("userToken");

  const [myVideos, setMyVideos] = useState([]);
  const [videosort, setVideoSort] = useState();
  const [loading, setLoading] = useState(true);
  const [showDiv, setShowDiv] = useState(false);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    function handleResize() {
      setShowDiv(window.innerWidth <= 600);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getAllChannelVideosById(id));
  }, [id]);

  useEffect(() => {
    setMyVideos(AllVideo);
  }, [AllVideo]);

  useEffect(() => {
    const sortVideos = () => {
      switch (videosort) {
        case "Latest":
          setMyVideos((prevVideos) =>
            [...prevVideos].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          );
          break;
        case "Popular":
          setMyVideos((prevVideos) =>
            [...prevVideos].sort((a, b) => b.views - a.views)
          );
          break;
        case "Oldest":
          setMyVideos((prevVideos) =>
            [...prevVideos].sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
          );
          break;
        default:
          break;
      }
    };

    sortVideos();
  }, [videosort]);

  return (
    <>
      <div className="allvideo-sectionn">
        <div className="video-sorting">
          <button
            className={
              videosort === "Latest"
                ? `latest-video ${theme ? "" : "btn-light-mode"} active${
                    theme ? "" : "-light"
                  }`
                : `latest-video ${theme ? "" : "btn-light-mode"}`
            }
            onClick={() => {
              setVideoSort("Latest");
            }}
          >
            Latest
          </button>
          <button
            className={
              videosort === "Popular"
                ? `Popular-video ${theme ? "" : "btn-light-mode"} active${
                    theme ? "" : "-light"
                  }`
                : `Popular-video ${theme ? "" : "btn-light-mode"}`
            }
            onClick={() => {
              setVideoSort("Popular");
            }}
          >
            Popular
          </button>
          <button
            className={
              videosort === "Oldest"
                ? `Oldest-video ${theme ? "" : "btn-light-mode"} active${
                    theme ? "" : "-light"
                  }`
                : `Oldest-video ${theme ? "" : "btn-light-mode"}`
            }
            onClick={() => {
              setVideoSort("Oldest");
            }}
          >
            Oldest
          </button>
        </div>
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div
            className="sk-uploadedvideos-sectionall"
            style={loading === true ? { display: "grid" } : { display: "none" }}
          >
            {myVideos.length > 0 &&
              myVideos.map((element, index) => {
                return (
                  <div
                    className="uploaded-video-contents sk-uploadcontent"
                    key={index}
                    style={{
                      display: element.isPublished === true ? "block" : "none",
                    }}
                  >
                    <Skeleton
                      count={1}
                      width={300}
                      height={169}
                      style={{ borderRadius: "10px" }}
                      className="sk-video-sec-thumbnail"
                    />
                    <div
                      className="videos-metadataa sk-videosmeta"
                      style={{ position: "relative", top: "15px" }}
                    >
                      <Skeleton
                        count={2}
                        width={280}
                        height={18}
                        style={{ borderRadius: "4px" }}
                        className="sk-video-sec-title"
                      />
                      <div className="views-and-time">
                        <Skeleton
                          count={1}
                          width={170}
                          height={15}
                          style={{ borderRadius: "4px" }}
                          className="sk-video-sec-extra"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            className="sk-uploadedvideos-sectionall2"
            style={
              loading === true && showDiv
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            {myVideos.length > 0 &&
              myVideos.map((element, index) => {
                return (
                  <div
                    className="uploaded-video-contents sk-uploadcontent"
                    key={index}
                    style={{
                      display: element.isPublished === true ? "block" : "none",
                    }}
                  >
                    <Skeleton
                      count={1}
                      width={300}
                      height={169}
                      style={{ borderRadius: "10px" }}
                      className="sk-video-sec-thumbnail"
                    />
                    <div
                      className="videos-metadataa sk-videosmeta"
                      style={{ position: "relative", top: "15px" }}
                    >
                      <Skeleton
                        count={2}
                        width={280}
                        height={18}
                        style={{ borderRadius: "4px" }}
                        className="sk-video-sec-title"
                      />
                      <div className="views-and-time">
                        <Skeleton
                          count={1}
                          width={170}
                          height={15}
                          style={{ borderRadius: "4px" }}
                          className="sk-video-sec-extra"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </SkeletonTheme>
        <div
          className="uploadedvideos-sectionall"
          style={
            loading === true
              ? { visibility: "hidden", display: "none" }
              : { visibility: "visible", display: "grid" }
          }
        >
          {myVideos.length > 0 ? (
            myVideos.map((element, index) => {
              return (
                <div
                  className={`${
                    element.isPublished === false
                      ? "not-thiss"
                      : "uploaded-video-contents"
                  }`}
                  key={index}
                  style={{
                    display: element.isPublished === true ? "block" : "none",
                  }}
                  onClick={() => {
                    if (token) {
                      setTimeout(() => {
                        navigate(`/video/${element._id}`);
                        window.location.reload();
                      }, 400);
                    } else {
                      navigate(`/video/${element._id}`);
                      window.location.reload();
                    }
                  }}
                >
                  <img
                    src={element.thumbnail.url}
                    alt="Thumbnail"
                    className="myvidthumbnail"
                    loading="lazy"
                  />
                  <p className="myvideo-duration2 duration-new">
                    {Math.floor(element.duration / 60) +
                      ":" +
                      (Math.round(element.duration % 60) < 10
                        ? "0" + Math.round(element.duration % 60)
                        : Math.round(element.duration % 60))}
                  </p>
                  <div
                    className={
                      theme
                        ? "videos-metadataa"
                        : "videos-metadataa text-light-mode"
                    }
                  >
                    <p>
                      {element.title.length <= 50
                        ? element.title
                        : `${element.title.slice(0, 50)}...`}
                    </p>
                    <div
                      className={
                        theme
                          ? "views-and-time"
                          : "views-and-time text-light-mode2"
                      }
                    >
                      <p className="myviews">
                        {element.views >= 1e9
                          ? `${(element.views / 1e9).toFixed(1)}B`
                          : element.views >= 1e6
                          ? `${(element.views / 1e6).toFixed(1)}M`
                          : element.views >= 1e3
                          ? `${(element.views / 1e3).toFixed(1)}K`
                          : element.views}{" "}
                        views
                      </p>
                      <p>&#x2022;</p>
                      <p className="video_published-date">
                        {(() => {
                          const timeDifference =
                            new Date() - new Date(element.createdAt);
                          const minutes = Math.floor(timeDifference / 60000);
                          const hours = Math.floor(timeDifference / 3600000);
                          const days = Math.floor(timeDifference / 86400000);
                          const weeks = Math.floor(timeDifference / 604800000);
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
            })
          ) : (
            <div className="PerrorVideo">
              <img src={nothing} alt="no results" className="nothing-found" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChannelVideos;
