/* eslint-disable no-undef */
import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import ChannelHome from "./Channel/ChannelHome";
import ChannelVideos from "./Channel/ChannelVideos";
import ChannelPlaylists from "./Channel/ChannelPlaylists";
import FeaturedChannels from "./Channel/FeaturedChannels";
import ChannelAbout from "./Channel/ChannelAbout";
import "../Css/channel.css";

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
  const backendURL = "http://localhost:3000";
  const { id } = useParams();
  const [myVideos, setMyVideos] = useState([]);
  const [Email, setEmail] = useState();

  const handleChange = (event, newValue) => {
    handleTabChange(newValue);
  };

  useEffect(() => {
    const getUserMail = async () => {
      try {
        const response = await fetch(`${backendURL}/getotherchannel/${id}`);
        const userEmail = await response.json();
        setEmail(userEmail);
      } catch (error) {
        // console.log(error.message);
      }
    };

    getUserMail();
  }, [id]);

  useEffect(() => {
    const getUserVideos = async () => {
      try {
        const response = await fetch(`${backendURL}/getuservideos/${Email}`);
        const myvideos = await response.json();
        setMyVideos(myvideos);
      } catch (error) {
        // console.log(error.message);
      }
    };
    getUserVideos();
  }, [Email]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={section}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Home" value="Home" {...a11yProps(0)} />
          <Tab label="Videos" value="Videos" {...a11yProps(1)} />
          <Tab label="Playlists" value="Playlists" {...a11yProps(2)} />
          <Tab label="Subscriptions" value="Subscriptions" {...a11yProps(3)} />
          <Tab label="About" value="About" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={section} index="Home">
        <ChannelHome newmail={Email} />
      </CustomTabPanel>

      <CustomTabPanel value={section} index="Videos">
        <ChannelVideos newmail={Email} />
      </CustomTabPanel>

      <CustomTabPanel value={section} index="Playlists">
        <ChannelPlaylists newmail={Email} />
      </CustomTabPanel>

      <CustomTabPanel value={section} index="Subscriptions">
        <FeaturedChannels newmail={Email} />
      </CustomTabPanel>
      
      <CustomTabPanel value={section} index="About">
        <ChannelAbout newmail={Email} channelid={id} />
      </CustomTabPanel>
    </Box>
  );
}

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs({ section }) {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           {section === "Home" || section === "" ? <Tab label="Home" {...a11yProps(0)} /> : null}
//           {section === "Videos" ? <Tab label="Videos" {...a11yProps(0)} /> : null}
//           {section === "Playlists" ? <Tab label="Playlists" {...a11yProps(0)} /> : null}
//           {section === "Subscriptions" ? <Tab label="Subscriptions" {...a11yProps(0)} /> : null}
//           {section === "About" ? <Tab label="About" {...a11yProps(0)} /> : null}
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         {section === "Home" || section === "" ? "Home content" : null}
//         {section === "Videos" ? "Videos content" : null}
//         {section === "Playlists" ? "Playlists content" : null}
//         {section === "Subscriptions" ? "Subscriptions content" : null}
//         {section === "About" ? "About content" : null}
//       </CustomTabPanel>
//     </Box>
//   );
// }
