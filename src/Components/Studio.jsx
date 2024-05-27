import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import avatar from "../img/avatar.png";
import "../Css/studio.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Upload from "../img/upload.png";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SdIcon from "@mui/icons-material/Sd";
import HdIcon from "@mui/icons-material/Hd";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import LinkIcon from "@mui/icons-material/Link";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Dashboard from "./Studio/Dashboard";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { LiaUploadSolid } from "react-icons/lia";

//SOCIALS

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addVideoData } from "../redux/actions/videoAction.js";

function Studio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendURL = "http://localhost:3000";
  const [email, setEmail] = useState("");
  const [isChannel, setisChannel] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewImage, setPreviewImage] = useState(avatar);
  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [ChannelName, setChannelName] = useState();
  const [ChannelAbout, setChannelAbout] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [videoName, setVideoName] = useState("Upload videos");
  const [VideoURL, setVideoURL] = useState("");
  const [Progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [linksClicked, setLinksClicked] = useState(false);
  const [iconClicked, setIconClicked] = useState("");
  const [myVideos, setMyVideos] = useState([]);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [isThumbnailSelected, setIsThumbnailSelected] = useState(false);
  const [visibility, setVisibility] = useState("Private");
  const [isVisibilityClicked, setIsVisibilityClicked] = useState(false);

  //TOAST FUNCTIONS

  const CancelNotify = () =>
    toast.warning("Video upload was cancelled!", {
      position: "bottom-center",
      autoClose: 950,
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
    setEmail(jwtDecode(token).email);
  }, []);

  useEffect(() => {
    if (theme === false && window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "#F9F9F9";
    } else if (theme === true && window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "rgb(31, 31, 31)";
    }
  }, [theme]);

  useEffect(() => {
    const handleClick = () => {
      setIsClicked(true);
    };

    const uploadBtn = document.querySelector(".uploadnewone-video");
    if (uploadBtn) {
      uploadBtn.addEventListener("click", handleClick);

      return () => {
        if (uploadBtn) {
          uploadBtn.removeEventListener("click", handleClick);
        }
      };
    }
  }, []);

  
  useEffect(() => {
    const handleClick = () => {
      document.querySelector(".studio").classList.add("studio-dark");
    };

    const searchInp = document.getElementById("searchType2");

    if (searchInp) {
      searchInp.addEventListener("click", handleClick);
    }

    return () => {
      if (searchInp) {
        searchInp.removeEventListener("click", handleClick);
      }
    };
  });

  useEffect(() => {
    const handleClick = () => {
      document.querySelector(".studio").classList.remove("studio-dark");
    };

    const crossBtn = document.querySelector(".clear-search");

    if (crossBtn) {
      crossBtn.addEventListener("click", handleClick);
    }

    return () => {
      if (crossBtn) {
        crossBtn.removeEventListener("click", handleClick);
      }
    };
  });

  useEffect(() => {
    if (isChannel === false) {
      document.body.classList.add("bg-css");
    } else {
      document.body.classList.remove("bg-css");
    }
  }, [isChannel]);

  useEffect(() => {
    if (isClicked === true) {
      document.body.classList.add("bg-css");
    } else {
      document.body.classList.remove("bg-css");
    }
  }, [isClicked]);

  //GET CHANNEL'S DATA

  //IMAGE UPLOAD

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChannelname = (e) => {
    setChannelName(e.target.value);
  };

  const handleChannelabout = (e) => {
    setChannelAbout(e.target.value);
  };

  const clearFormState = () => {
    setFormData({
      title: "",
      description: "",
      videoFile: null,
      thumbnail: null,
      isPublished: false,
    });
    setIsVideoSelected(false);
    setIsThumbnailSelected(false);
    setVisibility("Private");
    setIsVisibilityClicked(false);
    setIsClicked(false);
  };

  //ON VIDEO DROP

  const handleUploadImageClick = () => {
    const fileInput = document.getElementById("videoFileInput");
    fileInput.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > 30) {
      alert("Please select a video file with a size of up to 30MB.");
      return;
    }

    setSelectedVideo(file);
    setIsVideoSelected(true);
    const fileName = file.name;
    setVideoName(fileName.substring(0, fileName.lastIndexOf(".")));
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
    isPublished: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "isPublished") {
      // Update isPublished based on visibility
      setFormData({
        ...formData,
        visibility: value,
        isPublished: value === "public" ? true : false,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      videoFile: file,
    });
    setIsVideoSelected(true);
    setVideoName(file.name);
    setSelectedVideo(file);
    setProgress(100);

    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      thumbnail: file,
    });
    setIsThumbnailSelected(!!file);
    setPreviewThumbnail(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewThumbnail(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const PublishData = async (e) => {
    e.preventDefault();

    await dispatch(addVideoData(formData, setLoading, setIsClicked));

    clearFormState();
  };
  return (
    <>
      

      <Dashboard /> 
    </>
  );
}

export default Studio;
