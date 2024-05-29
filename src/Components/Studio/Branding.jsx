import { useState, useEffect } from "react";
import defaultimg from "../../img/Uavatar.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import pica from "pica";
import {
  avatar as Myavatar,
  coverImage as MycoverImage,
  VideoHeader,
  APIHttp,
} from "../../constant/Api";
import { Button } from "@mui/material";

function Branding() {
  const [avatar, setPreviewAvatar] = useState(Myavatar || defaultimg);
  const [coverImage, setPreviewCoverImage] = useState(MycoverImage);
  const [loading, setLoading] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(true);
  const [theme, setTheme] = useState(false);
  const [data, setData] = useState({ avatar: null, coverImage: null });

  useEffect(() => {
    setTimeout(() => {
      setFakeLoading(false);
    }, 50);
  }, []);

  const resizeImage = (file, width, height) => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      reader.onerror = (e) => {
        reject(e);
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const picaInstance = pica();
        picaInstance
          .resize(img, canvas, {
            unsharpAmount: 80,
            unsharpRadius: 0.6,
            unsharpThreshold: 2,
          })
          .then(() => picaInstance.toBlob(canvas, "image/jpeg", 0.9))
          .then((blob) => {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          })
          .catch(reject);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    if (file.type === "application/pdf") {
      toast.error("PDF files are not allowed. Please upload an image file.");
      return;
    }

    try {
      if (fieldName === "avatar") {
        const resizedAvatar = await resizeImage(file, 98, 98);
        setPreviewAvatar(URL.createObjectURL(resizedAvatar));
        setData({ ...data, [fieldName]: resizedAvatar });
      } else if (fieldName === "coverImage") {
        const resizedCoverImage = await resizeImage(file, 2048, 1152);
        setPreviewCoverImage(URL.createObjectURL(resizedCoverImage));
        setData({ ...data, [fieldName]: resizedCoverImage });
      }
    } catch (error) {
      toast.error("Failed to resize the image. Please try again.");
    }
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("avatar", data.avatar);

    axios
      .patch(`${APIHttp}users/avatar`, formData, VideoHeader)
      .then((response) => {
        const updatedData = response.data.data;
        localStorage.setItem("userData", JSON.stringify(updatedData));
        window.location.reload();
        toast("Profile picture updated successfully.");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to update profile picture. Please try again.");
        setLoading(false);
      });
  };

  const handleSubmitCoverImage = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("coverImage", data.coverImage);

    axios
      .patch(`${APIHttp}users/cover-image`, formData, VideoHeader)
      .then((response) => {
        const updatedData = response.data.data;
        localStorage.setItem("userData", JSON.stringify(updatedData));
        window.location.reload();
        toast("Cover image updated successfully.");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to update cover image. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div
      className="channel-branding-section"
      style={{
        opacity: loading ? "0.35" : "1",
        transition: "opacity .15s ease",
        cursor: loading ? "wait" : "auto",
      }}
    >
      {/* Profile Picture Section */}
      <div className="profile-update-section">
        <p
          className={
            theme ? "profile-head-txt" : "profile-head-txt text-light-mode"
          }
        >
          Picture
        </p>
        <p
          className={
            theme ? "profile-desc-txt" : "profile-desc-txt text-light-mode2"
          }
        >
          Your profile picture will appear where your channel is presented on
          YouTube, like next to your videos and comments.
        </p>
        <p
          className={
            theme ? "profile-desc-txt" : "profile-desc-txt text-light-mode2"
          }
        >
          (Please refresh the page if the images don’t load properly.)
        </p>
        <div className="picture-section">
          <SkeletonTheme
            baseColor={theme ? "#353535" : "#aaaaaa"}
            highlightColor={theme ? "#444" : "#b6b6b6"}
          >
            <div
              className="pic-div"
              style={fakeLoading ? { display: "flex" } : { display: "none" }}
            >
              <Skeleton
                count={1}
                width={98}
                height={98}
                style={{ borderRadius: "100%" }}
                className="sk-custom-dp"
              />
            </div>
          </SkeletonTheme>
          <div
            className="pic-div"
            style={
              fakeLoading
                ? { visibility: "hidden", display: "none" }
                : { visibility: "visible", display: "flex" }
            }
          >
            <img src={avatar} alt="profile" className="channel-image" />
          </div>
          <div
            className={
              theme ? "pic-extra-content" : "pic-extra-content text-light-mode2"
            }
          >
            It’s recommended to use a picture that’s at least 98 x 98 pixels and
            4MB or less. Use a PNG or GIF (no animations) file. Make sure your
            picture follows the YouTube Community Guidelines.
            <form onSubmit={handleSubmitProfile}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  className={theme ? "change-image" : "change-image blue-txt"}
                  htmlFor="profile-image-input"
                >
                  SELECT
                </label>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginLeft: "30px" }}
                >
                  CHANGE
                </Button>
              </div>
              <input
                type="file"
                id="profile-image-input"
                name="avatar"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Cover Image Section */}
      <div className="cover-update-section">
        <p className={theme ? "cover-head" : "cover-head text-light-mode"}>
          Banner image
        </p>
        <p className={theme ? "banner-desc" : "banner-desc text-light-mode2"}>
          This image will appear across the top of your channel.
        </p>
        <p
          className={
            theme ? "profile-desc-txt" : "profile-desc-txt text-light-mode2"
          }
        >
          (Please refresh the page if the images don’t load properly.)
        </p>
        <div className="banner-section">
          <SkeletonTheme
            baseColor={theme ? "#353535" : "#aaaaaa"}
            highlightColor={theme ? "#444" : "#b6b6b6"}
          >
            <div
              className="pic-div"
              style={fakeLoading ? { display: "flex" } : { display: "none" }}
            >
              <Skeleton
                count={1}
                width={290}
                height={160}
                className="sk-custom-banner"
              />
            </div>
          </SkeletonTheme>
          <div
            className="pic-div"
            style={
              fakeLoading
                ? { visibility: "hidden", display: "none" }
                : { visibility: "visible", display: "flex" }
            }
          >
            {coverImage ? (
              <img src={coverImage} alt="banner" className="banner-image" />
            ) : (
              ""
            )}
          </div>
          <div
            className={
              theme ? "pic-extra-content" : "pic-extra-content text-light-mode2"
            }
          >
            For the best results on all devices, use an image that’s at least
            2048 x 1152 pixels and 6MB or less.
            <form onSubmit={handleSubmitCoverImage}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  className={theme ? "change-image" : "change-image blue-txt"}
                  htmlFor="banner-image-input"
                >
                  SELECT
                </label>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginLeft: "30px" }}
                >
                  CHANGE
                </Button>
              </div>
              <input
                type="file"
                id="banner-image-input"
                name="coverImage"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branding;
