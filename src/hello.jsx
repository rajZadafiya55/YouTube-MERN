import React, { useEffect, useState } from "react";
import "../../Css/Studio/dashboard.css";
import { Box, Container, Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIHttp, Header } from "../../constant/Api";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";

const Dashboard = () => {
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
  if (error) return <div>Error loading stats</div>;

  return (
    <div className="studio-dashboard-section">
      <div
        className="dashboard-data"
        style={{
          left: menu ? "100px" : "278px",
          transition: "all .1s ease",
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            marginTop="20px"
          >
            <Grid item xs={12} sm={6} md={3}>
              <div className="d-card">
                <h1>{statsData?.totalViews || 10} Views</h1>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className="d-card">
                <h1>{statsData?.totalLikes || 0} Likes</h1>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className="d-card">
                <h1>{statsData?.totalVideos || 0} Videos</h1>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className="d-card">
                <h1>{statsData?.totalSubscribers || 0} Subscribers</h1>
              </div>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            marginTop="20px"
          >
            <Grid item xs={12} sm={6} md={6}>
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: ["bar A", "bar B", "bar C"],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: [2, 5, 3],
                  },
                ]}
                width={500}
                height={300}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: statsData?.totalViews || 0,
                        label: "Views",
                      },
                      {
                        id: 1,
                        value: statsData?.totalLikes || 0,
                        label: "Likes",
                      },
                      {
                        id: 2,
                        value: statsData?.totalVideos || 0,
                        label: "Videos",
                      },
                      {
                        id: 3,
                        value: statsData?.totalSubscribers || 0,
                        label: "Subscribers",
                      },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <Grid item xs={12} sm={12} md={12}>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={1000}
              height={300}
            />
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
