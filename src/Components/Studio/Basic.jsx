import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Basic() {
  const backendURL = "http://localhost:3000";
  const [Email, setEmail] = useState("");
  const [channelName, setChannelName] = useState();
  const [channelDescription, setChannelDescription] = useState();
  const [channelID, setChannelID] = useState("");
  const channelUrl = "https://shubho-youtube-mern.netlify.app/channel";
  const channelIDInputRef = useRef(null);
  const [Basicchanges, setBasicChanges] = useState(false);
  const [Linkchanges, setLinkChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [instalink, setInstaLink] = useState("");
  const [fblink, setfbLink] = useState("");
  const [twitterlink, settwitterLink] = useState("");
  const [weblink, setwebLink] = useState("");
  const [copy, setCopy] = useState(false);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  //TOASTS

  const CopiedNotify = () =>
    toast.success("Link Copied!", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const ErrorNotify = () =>
    toast.error("Input fields can't be empty.", {
      position: "top-center",
      autoClose: 1200,
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
    if (token) {
      setEmail(jwtDecode(token).email);
    }
  }, []);

  const handleChannelIDClick = () => {
    if (channelIDInputRef.current) {
      channelIDInputRef.current.select();
    }
  };

  useEffect(() => {
    const getChannelData = async () => {
      try {
        const response = await fetch(`${backendURL}/getchannel/${Email}`);
        const { ChannelName } = await response.json();
        setChannelName(ChannelName);
      } catch (error) {
        // console.log(error.message);
      }
    };

    const getChannelData2 = async () => {
      try {
        const response = await fetch(`${backendURL}/getchannelid/${Email}`);
        const data = await response.json();
        const { channelDescription, channelID, links } = data;
        setChannelDescription(channelDescription);
        setChannelID(channelID);
        // setLinks(links);
        setInstaLink(links[0].instagram ? links[0].instagram : "");
        setfbLink(links[0].facebook ? links[0].facebook : "");
        settwitterLink(links[0].twitter ? links[0].twitter : "");
        setwebLink(links[0].website ? links[0].website : "");
      } catch (error) {
        // console.log(error.message);
      }
    };

    getChannelData();
    getChannelData2();
  }, [Email]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${channelUrl}/${channelID}`)
      .then(() => {
        handleChannelIDClick();
        CopiedNotify();
      })
      .catch((error) => {
        console.log("Error copying link to clipboard:", error);
      });
  };

  useEffect(() => {
    function handleResize() {
      setCopy(window.innerWidth <= 930);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //POST REQUEST

  const SaveLinksData = async () => {
    try {
      setLoading(true);

      if (Email !== undefined) {
        const data = {
          fblink: fblink,
          instalink: instalink,
          twitterlink: twitterlink,
          websitelink: weblink,
          channelID: channelID,
        };
        const response = await fetch(`${backendURL}/savelinksdata/${Email}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await response.json();
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  const saveData = async () => {
    try {
      setLoading(true);
      if (
        Email !== undefined &&
        channelName !== undefined &&
        channelDescription !== undefined &&
        channelID !== undefined
      ) {
        const data = {
          channelName,
          channelDescription,
          channelID,
        };
        const response = await fetch(
          `${backendURL}/updatechanneldata/${Email}`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        await response.json();
      }
    } catch (error) {
      setLoading(false);
      // console.log(error.message);
    }
  };

  useEffect(() => {
    const publishBtn = document.querySelector(".save-customize");

    const handleMenuButtonClick = () => {
      if (channelDescription === "" || channelName === "") {
        ErrorNotify();
      } else {
        if (Basicchanges) {
          saveData();
        }
        if (Linkchanges) {
          SaveLinksData();
        }

        setTimeout(() => {
          setLoading(false);
          setBasicChanges(false);
          setLinkChanges(false);
          window.location.reload();
        }, 3800);
      }
    };

    if ((Basicchanges === false && Linkchanges === false) || loading) {
      publishBtn.classList.add("disable-btn");
    } else {
      publishBtn.classList.remove("disable-btn");

      publishBtn.addEventListener("click", handleMenuButtonClick);

      return () => {
        publishBtn.removeEventListener("click", handleMenuButtonClick);
      };
    }
  });

  return (
    <>
      <div
        className="basic-info-section"
        style={{
          opacity: loading ? "0.35" : "1",
          transition: "opacity .15s ease",
          cursor: loading ? "wait" : "auto",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <div className="basic-name-section">
          <p
            className={
              theme ? "basic-name-head" : "basic-name-head text-light-mode"
            }
          >
            Name
          </p>
          <p
            className={
              theme ? "basic-name-desc" : "basic-name-desc text-light-mode2"
            }
          >
            Choose a channel name that represents you and your content. Changes
            made to your name and picture are visible only on YouTube.
          </p>
          {channelName === undefined ? (
            <input
              type="text"
              className={
                theme ? "channel-name-inp" : "channel-name-inp text-light-mode"
              }
              value="Loading..."
              style={{ pointerEvents: "none", cursor: "wait" }}
              placeholder="Enter channel name"
            />
          ) : (
            <input
              type="text"
              className={
                theme ? "channel-name-inp" : "channel-name-inp text-light-mode"
              }
              value={channelName}
              required
              placeholder="Enter channel name"
              onChange={(e) => {
                setChannelName(e.target.value);
                setBasicChanges(true);
              }}
            />
          )}
        </div>
        <div className="basic-description-section">
          <p
            className={
              theme ? "basic-desc-head" : "basic-desc-head text-light-mode"
            }
          >
            Description
          </p>
          {channelDescription === undefined ? (
            <textarea
              name="channel-desc"
              className={
                theme
                  ? "basic-channel-desc"
                  : "basic-channel-desc text-light-mode"
              }
              style={{ pointerEvents: "none", cursor: "wait" }}
              value="Loading..."
              cols="30"
              rows="10"
              maxLength={1000}
            ></textarea>
          ) : (
            <textarea
              name="channel-desc"
              className={
                theme
                  ? "basic-channel-desc"
                  : "basic-channel-desc text-light-mode"
              }
              required
              value={channelDescription}
              style={{
                height: channelDescription === "" ? "80px" : "max-content",
                cursor: channelName === undefined ? "not-allowed" : "auto",
              }}
              onChange={(e) => {
                if (channelName !== undefined) {
                  setChannelDescription(e.target.value);
                  setBasicChanges(true);
                }
              }}
              cols="30"
              rows="10"
              maxLength={1000}
              placeholder="Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places."
            ></textarea>
          )}
        </div>
        <div className="basic-channelurl-section">
          <p
            className={
              theme
                ? "basic-channelurl-head"
                : "basic-channelurl-head text-light-mode"
            }
          >
            Channel URL
          </p>
          <p
            className={
              theme
                ? "basic-channelurl-desc"
                : "basic-channelurl-desc text-light-mode2"
            }
          >
            This is the standard web address for your channel. It includes your
            unique channel ID, which is the numbers and letters at the end of
            the URL.
          </p>
          {channelID === "" || channelID === "undefined" ? (
            <input
              type="text"
              className={
                theme
                  ? "channel-name-inp2"
                  : "channel-name-inp2 text-light-mode preview-light"
              }
              value="Loading..."
              style={{ pointerEvents: "none" }}
            />
          ) : (
            <>
              <div className="channellink-copy">
                <input
                  type="text"
                  className={
                    theme
                      ? "channel-name-inp2"
                      : "channel-name-inp2 text-light-mode preview-light"
                  }
                  value={`${channelUrl}/${
                    copy
                      ? channelID.length >= 30
                        ? channelID
                        : `${channelID.slice(0, 10)}...`
                      : channelID
                  }`}
                  onClick={handleCopyLink}
                  ref={channelIDInputRef}
                />
                <ContentCopyOutlinedIcon
                  className={theme ? "coppy-id" : "coppy-id-light"}
                  onClick={handleCopyLink}
                  fontSize="medium"
                  style={{ color: theme ? "white" : "#606060" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Basic;
