import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import nothing from "../../img/nothing.png";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import "../../Css/channel.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Subscription(prop) {
  const navigate = useNavigate();
  const backendURL = "http://localhost:3000";
  const [addChannelClicked, setAddChannelClicked] = useState(false);
  const [Subscriptions, setSubscriptions] = useState([]);
  const [featuredChannelsData, setFeaturedChannelsData] = useState([]);

  const token = localStorage.getItem("userToken");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  // UseEffects

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        if (prop.newmail !== undefined) {
          const response = await fetch(
            `${backendURL}/getsubscriptions/${prop.newmail}`
          );
          const result = await response.json();
          setSubscriptions(result);
        }
      } catch (error) {
        // console.log(error.message);
      }
    };
    getSubscriptions();
  }, [prop.newmail]);

  useEffect(() => {
    const getFeaturedChannels = async () => {
      try {
        const response = await fetch(
          `${backendURL}/getfeaturedchannels/${prop.newmail}`
        );
        const featuredChannelData = await response.json();
        setFeaturedChannelsData(featuredChannelData);
      } catch (error) {
        // console.log(error.message);
      }
    };
    const interval = setInterval(getFeaturedChannels, 100);

    return () => clearInterval(interval);
  }, [prop.newmail]);

  //POST REQUESTS

  if (featuredChannelsData === "No channels" && addChannelClicked === false) {
    return (
      <>
        <div className="featured-channels-sections"></div>
        <div
          className="no-playlists"
          style={
            addChannelClicked === true
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <img src={nothing} alt="no results" className="nothing-found" />
          <p
            className={
              theme
                ? "no-results no-channel"
                : "no-results no-channel text-light-mode"
            }
          >
            No channels found!
          </p>
        </div>
      </>
    );
  }
}

export default Subscription;
