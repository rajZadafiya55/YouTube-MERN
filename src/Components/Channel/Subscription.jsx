import { useEffect, useState } from "react";
import "../../Css/subscriptions.css";
import nothing from "../../img/nothing.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { _id } from "../../constant/Api";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelToSubScribeMe } from "../../redux/actions/subscriptionAction";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channelSubscriber } = useSelector((state) => state.subscription);

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
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    dispatch(fetchChannelToSubScribeMe(_id));
  }, [dispatch, _id]);

  useEffect(() => {
    setSubscriptions(channelSubscriber);
  }, [channelSubscriber]);

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
      <div className="NO_SUB">
        <p>No subscriptions found...😅</p>
      </div>
    );
  }

  return (
    <>
      <div className={"text-light-mode"}>
        <p>A user who subscribed to me</p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {subscriptions?.map((subscriber, index) => (
            <div
              className={theme ? "sub-channels" : "sub-channels2"}
              key={index}
              onClick={() => navigate(`/channel/${subscriber._id}`)}
            >
              <img
                src={subscriber?.avatar}
                alt="channelDP"
                className="sub-channelDP"
              />
              <p
                className={
                  theme ? "sub-channelname" : "sub-channelname text-light-mode"
                }
              >
                {subscriber?.username}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
