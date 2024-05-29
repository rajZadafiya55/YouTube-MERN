import React, { useEffect, useState } from "react";
// ====================================================
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// project import
import MainCard from "./Chart/MainCard";
import AnalyticEcommerce from "./Chart/AnalyticEcommerce";
import MonthlyBarChart from "./Chart/MonthlyBarChart";
import UniqueVisitorCard from "./Chart/UniqueVisitorCard";
// ====================================================
import "../../Css/Studio/dashboard.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIHttp, Header } from "../../constant/Api";

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
          left: menu ? "120px" : "290px",
          right: "30px",
          transition: "all .1s ease",
        }}
      >
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {/* row 1 */}
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Page Views"
              count="55"
              percentage={59.3}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Users"
              count="78,250"
              percentage={70.5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Order"
              count="18,800"
              percentage={27.4}
              isLoss
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Sales"
              count="$35,078"
              percentage={27.4}
              isLoss
              color="warning"
            />
          </Grid>

          <Grid
            item
            md={8}
            sx={{
              display: { sm: "none", md: "block", lg: "none" },
            }}
          />

          {/* row 2 */}
          <Grid item xs={12} md={7} lg={7}>
            <UniqueVisitorCard />
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Income Overview</Typography>
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
