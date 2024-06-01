import { useEffect, useState } from "react";
import axios from "axios";
import "../../Css/subscriptions.css";
import nothing from "../../img/nothing.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { APIHttp, Header, _id } from "../../constant/Api";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  document.title = "Subscriptions - YouTube";

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${APIHttp}subscriptions/c/${_id}`,
          Header
        );
        const result = response.data;
        if (result.success && result.data.length > 0) {
          setSubscriptions(result.data[0].subscriberDetails);
        } else {
          setSubscriptions([]);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getSubscriptions();
  }, []);

  useEffect(() => {
    localStorage.setItem("menuClicked", JSON.stringify(menuClicked));
  }, [menuClicked]);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu");
    const menuLightButton = document.querySelector(".menu-light");

    if (menuButton) menuButton.addEventListener("click", handleMenuButtonClick);
    if (menuLightButton)
      menuLightButton.addEventListener("click", handleMenuButtonClick);

    return () => {
      if (menuButton)
        menuButton.removeEventListener("click", handleMenuButtonClick);
      if (menuLightButton)
        menuLightButton.removeEventListener("click", handleMenuButtonClick);
    };
  }, []);

  useEffect(() => {
    if (!window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = theme ? "#0f0f0f" : "white";
    }
  }, [theme]);

  if (loading) {
    return (
      <div>
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div style={{ display: "flex" }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                className={theme ? "sub-channels" : "sub-channels2"}
                key={index}
              >
                <Skeleton
                  width={100}
                  height={100}
                  style={{ borderRadius: "100%" }}
                />
                <Skeleton
                  width={120}
                  height={22}
                  style={{ marginTop: "20px" }}
                />
              </div>
            ))}
          </div>
        </SkeletonTheme>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="searched-content">
        <img src={nothing} alt="no results" className="nothing-found" />
        <p className={theme ? "no-results" : "no-results text-light-mode"}>
          No subscriptions found!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={"text-light-mode"}>
        <p>A user who subscribed to me</p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {subscriptions.map((subscriber, index) => (
            <div
              className={theme ? "sub-channels" : "sub-channels2"}
              key={index}
              onClick={() => navigate(`/channel/${subscriber._id}`)}
            >
              <img
                src={subscriber.avatar}
                alt="channelDP"
                className="sub-channelDP"
              />
              <p
                className={
                  theme ? "sub-channelname" : "sub-channelname text-light-mode"
                }
              >
                {subscriber.username}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
