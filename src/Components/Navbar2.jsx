//MUI Icons
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "../Css/navbar.css";
import StudioLogo from "../img/studio.png";
import StudioLogo2 from "../img/studio2.png";
import { useEffect, useState, useRef } from "react";
import Uavatar from "../img/Uavatar.png";
// import AccountPop2 from "./AccountPop2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AccountPop from "./AccountPop";
import { avatar, _id } from "../constant/Api";

function Navbar2() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const [showPop, setShowPop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(false);
  const accountRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  return (
    <>
      <div className={theme ? "navbar2" : "navbar2 light-mode text-light-mode"}>
        {/*================  logo ================ */}
        <div className="left-bar">
          <MenuRoundedIcon
            className={theme ? "menu2" : "menu2 menu2-light"}
            fontSize="large"
            style={{ color: theme ? "white" : "black" }}
          />

          <img
            src={theme ? StudioLogo : StudioLogo2}
            alt="logo"
            className="youtubeLogo2"
            onClick={() => {
              navigate("/studio");
            }}
          />
        </div>

        {/*======================  searchBar ============ */}
        <div className="middle-bar2">
          <div className={"search2 search2-light light-mode text-light-mode"}>
            <SearchRoundedIcon
              className="search-icon2"
              fontSize="medium"
              style={{ color: "black" }}
            />
            <input
              type="text"
              placeholder="Search across your channel"
              id="searchType2"
              className={"light-mode text-light-mode"}
            />
            <CloseOutlinedIcon
              fontSize="medium"
              className={"clear-search clear-light"}
            />
          </div>
        </div>

        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div
            className="right-bar2 sk-right-bar2"
            style={loading ? { display: "block" } : { display: "none" }}
          >
            <Skeleton
              count={1}
              width={42}
              height={42}
              style={{ borderRadius: "100%" }}
            />
          </div>
        </SkeletonTheme>

        {/*==================== profile ============= */}
        <div
          className="right-bar2"
          style={
            !loading
              ? { visibility: "visible", display: "flex" }
              : { visibility: "hidden", display: "none" }
          }
        >
          <BiSearch
            fontSize="28px"
            color={theme ? "rgb(160, 160, 160)" : "black"}
            className="studio-searchh"
          />
          <img
            src={avatar || Uavatar}
            alt=""
            className="profile-pic2"
            style={token ? { display: "block" } : { display: "none" }}
            onClick={() => setShowPop(!showPop)}
          />
        </div>
      </div>

      <div
        className="ac-pop"
        ref={accountRef}
        style={showPop === true ? { display: "block" } : { display: "none" }}
      >
        {/* <AccountPop2 /> */}
        <AccountPop />
      </div>

      {/* MOBILE SEARCH BAR */}

      <div className="new-studio-search-section">
        <div
          className={
            theme ? "search2-new" : "search2-new light-mode text-light-mode"
          }
        >
          <SearchRoundedIcon
            className="search-icon2"
            fontSize="medium"
            style={{ color: theme ? "rgb(160, 160, 160)" : "black" }}
          />
        </div>
      </div>
    </>
  );
}

export default Navbar2;
