import "../../Css/Studio/customize.css";
import Branding from "./Branding";
import Basic from "./Basic";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { _id } from "../../constant/Api";

function Customization() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("branding");
  const [theme, setTheme] = useState(false);

  document.title = "Channel customization - YouTube Studio";

  // Check if the theme is false and the URL contains "/studio/customize"
  if (theme === false && window.location.href.includes("/studio/customize")) {
    document.body.style.backgroundColor = "white";
  }

  return (
    <div className="channel-customize">
      <div
        className="channel-customize-section"
        style={{
          left: "270px",
          transition: "none",
        }}
      >
        <div className="customize-header">
          <p className={theme ? "" : "text-light-mode"}>
            Channel customization
          </p>
        </div>

        {/* Tab view */}
        <div className="redirectss">
          <div className="left-redirects">
            <p
              className={
                currentTab === "branding"
                  ? `branding-txt1 ${theme ? "" : "text-light-mode2"}`
                  : `branding-txt ${theme ? "" : "text-light-mode2"}`
              }
              onClick={() => setCurrentTab("branding")}
            >
              Branding
            </p>
            <p
              className={
                currentTab === "basic"
                  ? `basic-txt1 ${theme ? "" : "text-light-mode2"}`
                  : `basic-txt ${theme ? "" : "text-light-mode2"}`
              }
              style={{ marginLeft: "40px" }}
              onClick={() => setCurrentTab("basic")}
            >
              Basic info
            </p>
          </div>

          {/* View channel and publish button */}
          <div className="right-redirects">
            <p
              onClick={() => {
                if (_id !== undefined) {
                  navigate(`/channel/${_id}`);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              VIEW CHANNEL
            </p>
          </div>
        </div>
        <hr className="breakk" />
        <div className="customize-data-section">
          {currentTab === "branding" ? <Branding /> : <Basic />}
        </div>
      </div>
    </div>
  );
}

export default Customization;
