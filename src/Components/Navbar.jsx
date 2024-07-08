//MUI Icons
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import AccountPop from "./AccountPop";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../Css/navbar.css";
import Logo from "../img/logo1.png";
import Logo2 from "../img/logo2.png";
import { useEffect, useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { FiSearch } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import Uavatar from "../img/Uavatar.png";
import { avatar, accessToken, showLoginToast } from "../constant/Api";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/actions/videoAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = accessToken;

  const [isbtnClicked, setisbtnClicked] = useState(false);
  const [isSwitch, setisSwitched] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [searchedData, setSearchedData] = useState();
  const [loading, setLoading] = useState(true);
  const [newSearch, setNewSearch] = useState(false);

  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const handleSearch = (e) => {
    setSearchedData(e.target.value);
    dispatch(setSearch(e.target.value));
  };

  return (
    <>
      <div className={theme === true ? "navbar" : "navbar light-mode"}>
        <div className="left-bar">
          <MenuRoundedIcon
            className={theme ? "menu" : "menu-light"}
            fontSize="large"
            style={{ color: theme ? "white" : "black" }}
          />
          <img
            src={theme ? Logo : Logo2}
            alt="logo"
            loading="lazy"
            className="youtubeLogo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="middle-bar">
          <div className={theme ? "search" : "search light-mode light-border"}>
            <input
              type="text"
              placeholder="Type to search"
              id={theme ? "searchType" : "searchType-light-mode"}
              value={searchedData}
              onChange={handleSearch}
            />
            <IoIosSearch
              className={theme ? "search-icon" : "search-light-icon"}
              fontSize="28px"
              style={{ color: theme ? "rgb(160, 160, 160)" : "black" }}
              onClick={(e) => {
                dispatch(setSearch(e.target.value));
              }}
            />
          </div>
        </div>

        <div
          className="right-bar"
          style={
            token
              ? { justifyContent: "space-evenly", paddingRight: "0px" }
              : { justifyContent: "space-evenly", paddingRight: "25px" }
          }
        >
          <FiSearch
            fontSize="24px"
            color={theme ? "#aaa" : "black"}
            className="second-search"
            onClick={() => setNewSearch(true)}
          />
          <Tooltip
            TransitionComponent={Zoom}
            title="YouTube studio"
            placement="bottom"
          >
            <AiOutlineVideoCameraAdd
              className={theme ? "icon-btns videocreate" : "video-light"}
              fontSize="24px"
              style={{ color: theme ? "white" : "black" }}
              onClick={() => {
                if (token) {
                  navigate("/studio");
                } else {
                  showLoginToast();
                }
              }}
            />
          </Tooltip>
          {/*  ============ log-in button ====================== */}
          <button
            onClick={() => {
              if (isbtnClicked === false) {
                setisbtnClicked(true);
                document.body.classList.add("bg-css");
              } else {
                setisbtnClicked(false);
                document.body.classList.remove("bg-css");
              }
            }}
            className={theme ? "signin" : "signin signin-light"}
            style={token ? { display: "none" } : { display: "flex" }}
          >
            <AccountCircleOutlinedIcon
              fontSize="medium"
              style={{ color: "rgb(0, 162, 255)" }}
              className="user-avatar"
            />
            <p>Signin</p>
          </button>
          <SkeletonTheme
            baseColor={theme ? "#353535" : "#aaaaaa"}
            highlightColor={theme ? "#444" : "#b6b6b6"}
          >
            <div
              className="navimg"
              style={
                loading === true && token
                  ? { visibility: "visible" }
                  : { visibility: "hidden", display: "none" }
              }
            >
              <Skeleton
                count={1}
                width={42}
                height={42}
                style={{ borderRadius: "100%" }}
                className="sk-profile"
              />
            </div>
          </SkeletonTheme>
          <img
            src={avatar ? avatar : Uavatar}
            alt="user profile pic"
            loading="lazy"
            className="profile-pic"
            style={
              token && loading === false
                ? { display: "block" }
                : { display: "none" }
            }
            onClick={() => {
              if (showPop === false) {
                setShowPop(true);
              } else {
                setShowPop(false);
              }
            }}
          />
        </div>
      </div>

      {/* ================(Log-in form)============================================ */}

      <div
      id="LoginFRM"
        className={
          theme ? "auth-popup" : "auth-popup light-mode text-light-mode"
        }
        style={
          isbtnClicked === true ? { display: "block" } : { display: "none" }
        }
      >
        <ClearRoundedIcon
          onClick={() => {
            if (isbtnClicked === false) {
              setisbtnClicked(true);
            } else {
              setisbtnClicked(false);
              setisSwitched(false);
              document.body.classList.remove("bg-css");
            }
          }}
          className="cancel"
          fontSize="large"
          style={{ color: "gray" }}
        />
        {/* ========(Registration form)========================================== */}
        <div
          className="signup-last"
          style={
            isSwitch === false ? { display: "block" } : { display: "none" }
          }
        >
          <Signin close={isbtnClicked} switch={isSwitch} />

          <div className="already">
            <p>Don&apos;t have an account?</p>
            <p
              onClick={() => {
                if (isSwitch === false) {
                  setisSwitched(true);
                } else {
                  setisSwitched(false);
                }
              }}
            >
              Signup
            </p>
          </div>
        </div>

        {/* ========(Registration form)========================================== */}
        <div
          className="signin-last"
          style={isSwitch === true ? { display: "block" } : { display: "none" }}
        >
          <Signup />

          <div className="already">
            <p>Already have an account?</p>
            <p
              onClick={() => {
                if (isSwitch === false) {
                  setisSwitched(true);
                } else {
                  setisSwitched(false);
                }
              }}
            >
              Signin
            </p>
          </div>
        </div>
      </div>
      <div
        className="ac-pop"
        // ref={profileRef}
        style={showPop === true ? { display: "block" } : { display: "none" }}
      >
        <AccountPop />
      </div>

      {/* ================ small screen search ================ */}
      <div
        className={theme ? "new-searchbar" : "new-searchbar2"}
        style={{
          display: newSearch && window.innerWidth <= 940 ? "flex" : "none",
        }}
      >
        <div
          className="new-searchbar-component"
          // ref={searchRef}
          style={{
            display: newSearch && window.innerWidth <= 940 ? "flex" : "none",
          }}
        >
          <FiSearch fontSize="28px" color="#aaa" />
          <input
            type="text"
            name="search-content"
            placeholder="Type to search..."
            className="extra-search"
            value={searchedData}
            onChange={handleSearch}
          />
          <RxCross1
            fontSize="26px"
            color="#aaa"
            className="cancel-newsearch"
            onClick={() => setNewSearch(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
