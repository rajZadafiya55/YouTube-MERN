import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LeftPanel from "../LeftPanel";
import "../../Css/channel.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Zoom from "@mui/material/Zoom";
import { RiUserSettingsLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import BasicTabs from "./BasicTabs";
import { coverImage, email, username } from "../../constant/Api";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelProfile } from "../../redux/actions/userAction";
import { getSubscriptionToggle } from "../../redux/actions/subscriptionAction";

function OtherChannel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const channelData = useSelector((state) => state.user.channelDetails);

  const isSubscribe = useSelector((state) => state.subscription.isSubscribed);

  const { id } = useParams();
  const [Email, setEmail] = useState(email);
  const [channelName, setChannelname] = useState(username);
  const [myVideos, setMyVideos] = useState([]);
  const [isbtnClicked, setisbtnClicked] = useState(false);
  const [Section, setSection] = useState(
    localStorage.getItem("Section") || "Videos"
  );
  const token = localStorage.getItem("userToken");
  // const [isSubscribed, setIsSubscribed] = useState();
  const [Top, setTop] = useState("155px");
  const [coverIMG, setCoverIMG] = useState(coverImage);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  const [userProfile, setUserProfile] = useState([]);
  //USE EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  document.title =
    channelName && channelName !== undefined
      ? `${channelName} - YouTube`
      : "YouTube";

  useEffect(() => {
    if (Section === "Videos" && coverIMG !== "No data") {
      setTop("31%");
    } else if (Section === "Videos" && coverIMG === "No data") {
      setTop("2%");
    } else if (Section !== "Videos" && coverIMG === "No data") {
      setTop("2%");
    } else if (Section !== "Videos" && coverIMG !== "No data") {
      setTop("31%");
    }
  }, [Section, coverIMG]);

  useEffect(() => {
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  //POST REQUESTS

  const SubscribeChannel = async (id,channelId) => {
    try {
      dispatch(getSubscriptionToggle(id,channelId, isSubscribe));
    } catch (error) {
      console.log(error.message);
    }
  };

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
    if (channelData) {
      setUserProfile(Array.isArray(channelData) ? channelData : [channelData]);
    }
  }, [channelData]);

  return (
    <>
      <LeftPanel />

      {userProfile?.map((element, index) => (
        <div key={index}>
          {element.coverImage !== "No data" ? (
            <div className="channel-cover">
              <img
                src={element.coverImage}
                alt="Banner"
                loading="lazy"
                className="channel-cover-img"
              />
            </div>
          ) : (
            ""
          )}
          {element.avatar ? (
            <div
              className={
                Top === "2%" 
                  ? "channel-main-content-nocover"
                  : "channel-main-content"
              }
              style={{ top: Top }}
            >
              <SkeletonTheme
                baseColor={theme ? "#353535" : "#aaaaaa"}
                highlightColor={theme ? "#444" : "#b6b6b6"}
              >
                <div
                  className="channel-top-content"
                  style={
                    loading === true ? { display: "flex" } : { display: "none" }
                  }
                >
                  <div className="channel-left-content">
                    <Skeleton
                      count={1}
                      width={130}
                      height={130}
                      style={{ borderRadius: "100%" }}
                      className="sk-channel-profile"
                    />
                    <div className="channel-topleft-data">
                      <div className="channel-left">
                        <div className="channel-name-verified">
                          <Skeleton
                            count={1}
                            width={200}
                            height={20}
                            style={{ borderRadius: "4px" }}
                            className="sk-channel-main-name"
                          />
                        </div>
                        <div className="channel-extra">
                          <Skeleton
                            count={1}
                            width={220}
                            height={15}
                            style={{ borderRadius: "4px" }}
                            className="sk-channel-liner"
                          />
                        </div>
                        <div className="more-about">
                          <Skeleton
                            count={1}
                            width={200}
                            height={14}
                            style={{ borderRadius: "4px" }}
                            className="sk-channel-more"
                          />
                        </div>
                      </div>
                      {element.email === Email ? (
                        <div className="channel-right-content channel-dualbtns">
                          <Skeleton
                            count={1}
                            width={160}
                            height={38}
                            style={{ borderRadius: "20px" }}
                            className="sk-channel-customize"
                          />
                          <Skeleton
                            count={1}
                            width={160}
                            height={38}
                            style={{
                              borderRadius: "20px",
                              position: "relative",
                              left: "25px",
                            }}
                            className="sk-channel-manage"
                          />
                        </div>
                      ) : (
                        <div className="channel-right-content">
                          <Skeleton
                            count={1}
                            width={125}
                            height={38}
                            style={{ borderRadius: "20px" }}
                            className="sk-channel-subscribe"
                          />
                        </div>
                      )}
                    </div>
                  </div>
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
                            isSubscribe === true
                              ? { display: "none" }
                              : { display: "block" }
                          }
                          onClick={() => {
                            SubscribeChannel(element._id,id);
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
                            isSubscribe === true
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          onClick={() => {
                            SubscribeChannel(element?._id,id);
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
