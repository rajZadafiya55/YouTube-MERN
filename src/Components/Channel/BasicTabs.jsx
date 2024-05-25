/* eslint-disable no-undef */
import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import ChannelVideos from "./ChannelVideos";
import ChannelPlaylists from "./ChannelPlaylists";
import ChannelAbout from "./ChannelAbout";
import "../../Css/channel.css";
import jwtDecode from "jwt-decode";
import Subscription from "./Subscription";
import { email } from "../../constant/Api";
import { useDispatch, useSelector } from "react-redux";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ section, handleTabChange }) {
  const dispatch = useDispatch();

  const AllVideo = useSelector((state) => state.videos.videosDetails);
  console.log("allVideos", AllVideo);

  const { id } = useParams();
  const [Email, setEmail] = useState(email);
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleChange = (event, newValue) => {
    handleTabChange(newValue);
  };

  useEffect(() => {
    // Fetch logged-in user's email
    const token = localStorage.getItem("userToken");
    if (token) {
      const loggedInEmail = jwtDecode(token).email;
      setLoggedInUser(loggedInEmail);
    }
  }, [id]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          overflowX: "scroll",
          "-webkit-overflow-scrolling": "touch", // for smooth scrolling on iOS
        }}
      >
        <Tabs
          value={section}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            // Conditionally apply styles for horizontal scrolling
            "@media (max-width: 600px)": {
              flexWrap: "nowrap",
              overflowX: "scroll",
            },
          }}
        >
          <Tab label="Videos" value="Videos" {...a11yProps(0)} />
          <Tab label="Playlists" value="Playlists" {...a11yProps(1)} />
          {loggedInUser && loggedInUser === Email && (
            <Tab
              label="Subscriptions"
              value="Subscriptions"
              {...a11yProps(2)}
            />
          )}
          <Tab label="About" value="About" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={section} index="Videos">
        <ChannelVideos newmail={Email} />
      </CustomTabPanel>

      <CustomTabPanel value={section} index="Playlists">
        <ChannelPlaylists newmail={Email} />
      </CustomTabPanel>

      {loggedInUser && loggedInUser === Email && (
        <CustomTabPanel value={section} index="Subscriptions">
          <Subscription newmail={Email} />
        </CustomTabPanel>
      )}
      <CustomTabPanel value={section} index="About">
        <ChannelAbout newmail={Email} channelid={id} />
      </CustomTabPanel>
    </Box>
  );
}
