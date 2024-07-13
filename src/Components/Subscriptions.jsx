import { useEffect, useState } from "react";
import nothing from "../img/nothing.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptionsDetails } from "../redux/actions/subscriptionAction";
import { _id } from "../constant/Api";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subscriptions } = useSelector((state) => state.subscription);

  const [subscriptionsData, setSubscriptionsData] = useState([]);
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
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    dispatch(fetchSubscriptionsDetails(_id));
  }, [dispatch]);

  useEffect(() => {
    setSubscriptionsData(subscriptions);
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem("menuClicked", JSON.stringify(menuClicked));
  }, [menuClicked]);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu");
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
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu-light");
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
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "#0f0f0f";
    }
  }, [theme]);

  if (subscriptionsData?.length === 0) {
    return (
      <div className="searched-content">
        <img src={nothing} alt="no results" className="nothing-found" />
        <p className={theme ? "no-results" : "no-results text-light-mode"}>
          No Data found!
        </p>
      </div>
    );
  }

  return (
    <div className="subscription-content">
      <div
        className="all-subs-dataaa"
        style={
          menuClicked === false
            ? { left: "150px", width: "85%" }
            : { left: "300px", width: "76%" }
        }
      >
        <div className="subscribed-channels">
          <p className={theme ? "main-txxt" : "main-txxt text-light-mode"}>
            Channels
          </p>
          <SkeletonTheme
            baseColor={theme ? "#353535" : "#aaaaaa"}
            highlightColor={theme ? "#444" : "#b6b6b6"}
          >
            <div
              className="channels-full-list"
              style={
                loading === true ? { display: "flex" } : { display: "none" }
              }
            >
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  className={theme ? "sub-channels" : "sub-channels2"}
                  key={index}
                >
                  <Skeleton
                    count={1}
                    width={100}
                    height={100}
                    style={{ borderRadius: "100%" }}
                    className="sk-channelDP"
                  />
                  <Skeleton
                    count={1}
                    width={120}
                    height={22}
                    style={{ position: "relative", top: "20px" }}
                    className="sk-channelname"
                  />
                </div>
              ))}
            </div>
          </SkeletonTheme>
          <div
            className="channels-full-list"
            style={
              loading === true
                ? { visibility: "hidden", display: "none" }
                : { visibility: "visible", display: "flex" }
            }
          >
            {subscriptionsData?.length > 0 &&
              subscriptionsData?.map((subscriber, index) => (
                <div
                  className={theme ? "sub-channels" : "sub-channels2"}
                  key={index}
                  onClick={() => {
                    navigate(`/channel/${subscriber._id}`);
                  }}
                >
                  <img
                    src={subscriber?.avatar}
                    alt="channelDP"
                    className="sub-channelDP"
                  />
                  <p
                    className={
                      theme
                        ? "sub-channelname"
                        : "sub-channelname text-light-mode"
                    }
                  >
                    {subscriber?.username}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
