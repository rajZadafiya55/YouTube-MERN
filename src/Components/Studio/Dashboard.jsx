import React, { useEffect, useState } from "react";

// material-ui
import Chip from "@mui/material/Chip";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PersonIcon from "@mui/icons-material/Person";
// ====================================================
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MainCard from "./Chart/MainCard";
import MonthlyBarChart from "./Chart/MonthlyBarChart";
import UniqueVisitorCard from "./Chart/UniqueVisitorCard";
// ====================================================
import "../../Css/Studio/dashboard.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIHttp, Header } from "../../constant/Api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(() => {
    const menu = localStorage.getItem("studioMenuClicked");
    return menu ? JSON.parse(menu) : false;
  });

  document.title = "Channel dashboard - YouTube Studio";

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

  return (
    <div className="studio-dashboard-section">
      <div
        className="dashboard-data"
        style={{
          left: menu ? "120px" : "290px",
          right: "30px",
          transition: "all .1s ease",
        }}
      >
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MainCard contentSX={{ p: 2.25 }} sx={{ boxShadow: 3 }}>
              <Stack spacing={0.5}>
                <Typography variant="h6" color="text.secondary">
                  Total Views
                </Typography>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="h4" color="inherit">
                      {statsData?.totalViews || 0}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Chip
                      variant="combined"
                      style={{ background: "#ff0000" }}
                      sx={{ ml: 1.25, pl: 1, py: 2 }}
                      size="small"
                      avatar={<RemoveRedEyeIcon style={{ color: "white" }} />}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/likedVideos")}
            >
              <MainCard contentSX={{ p: 2.25 }} sx={{ boxShadow: 3 }}>
                <Stack spacing={0.5}>
                  <Typography variant="h6" color="text.secondary">
                    Total Likes
                  </Typography>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography variant="h4" color="inherit">
                        {statsData?.totalLikes || 0}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Chip
                        variant="combined"
                        style={{ background: "#ff0000" }}
                        sx={{ ml: 1.25, pl: 1, py: 2 }}
                        size="small"
                        avatar={<ThumbUpIcon style={{ color: "white" }} />}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </MainCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/studio/video")}
            >
              <MainCard contentSX={{ p: 2.25 }} sx={{ boxShadow: 3 }}>
                <Stack spacing={0.5}>
                  <Typography variant="h6" color="text.secondary">
                    Total Videos
                  </Typography>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography variant="h4" color="inherit">
                        {statsData?.totalVideos || 0}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Chip
                        variant="combined"
                        style={{ background: "#ff0000" }}
                        sx={{ ml: 1.25, pl: 1, py: 2 }}
                        size="small"
                        avatar={<VideoLibraryIcon style={{ color: "white" }} />}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </MainCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MainCard contentSX={{ p: 2.25 }} sx={{ boxShadow: 3 }}>
              <Stack spacing={0.5}>
                <Typography variant="h6" color="text.secondary">
                  Total Subscribers
                </Typography>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="h4" color="inherit">
                      {statsData?.totalSubscribers || 0}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Chip
                      variant="combined"
                      sx={{ ml: 1.25, pl: 1, py: 2 }}
                      size="small"
                      style={{ background: "#ff0000" }}
                      avatar={<PersonIcon style={{ color: "white" }} />}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </MainCard>
          </Grid>

          <Grid
            item
            md={8}
            sx={{
              display: { sm: "none", md: "block", lg: "none" },
            }}
          />

          <Grid item xs={12} md={7} lg={7}>
            <UniqueVisitorCard />
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Videos watches</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2, boxShadow: 3 }} content={false}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Stack spacing={2}>
                  <Typography variant="h5" color="text.secondary">
                    This Week Statistics
                  </Typography>
                </Stack>
              </Box>
              <MonthlyBarChart />
            </MainCard>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
