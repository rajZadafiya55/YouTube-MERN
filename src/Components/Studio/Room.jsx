import React, { useEffect, useState } from "react";

// ZegoUIKitPrebuilt-ui
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// ====================================================
import Grid from "@mui/material/Grid";

// ====================================================
import "../../Css/Studio/dashboard.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIHttp, Header } from "../../constant/Api";
import { useNavigate, useParams } from "react-router-dom";
import { username } from "../../constant/Api";

const Room = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(() => {
    const menu = localStorage.getItem("studioMenuClicked");
    return menu ? JSON.parse(menu) : false;
  });

  document.title = "Room";

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenu((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu2");
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
    localStorage.setItem("studioMenuClicked", JSON.stringify(menu));
  }, [menu]);

  const getAllStats = async () => {
    const response = await axios.get(`${APIHttp}dashboard/stats`, Header);
    return response.data.data;
  };

  const {
    data: statsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: getAllStats,
  });

  if (isLoading) return <div>Loading...</div>;

  const { roomId } = useParams();

  const myLiveStrem = async (element) => {
    const appID = 109562755;
    const serverSecret = "a5d5c58a18adb7e617a074a045b8ef92";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      username
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https://yoouttube.vercel.app/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
      showScreenSharingButton: true,
    });
  };

  return (
    <div className="studio-dashboard-section">
      <div
        className="dashboard-data"
        style={{
          left: menu ? "120px" : "290px",
          right: "30px",
          transition: "all .1s ease",
          marginTop: "65px",
        }}
      >
        <div ref={myLiveStrem} />
      </div>
    </div>
  );
};

export default Room;
