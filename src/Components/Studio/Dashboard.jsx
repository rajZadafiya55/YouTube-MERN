import React, { useEffect, useState } from "react";
import "../../Css/Studio/dashboard.css";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIHttp, Header } from "../../constant/Api";

const StyledCard = styled(Card)(() => ({
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  borderRadius: "16px",
}));

const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

const StyledAvatar = styled(Avatar)(() => ({
  backgroundColor: "#2196f3",
  color: "white",
}));

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

  // api integrate
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
    <>
      <div className="studio-dashboard-section">
        <div
          className="dashboard-data"
          style={{
            left: menu ? "125px" : "310px",
            transition: menu ? "all .1s ease" : "none",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            style={{ marginTop: "20px" }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard>
                <StyledCardContent>
                  <StyledAvatar>
                    <VisibilityIcon />
                  </StyledAvatar>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginTop: 1 }}
                  >
                    Total Views
                  </Typography>
                  <Typography variant="h3" sx={{ marginTop: 1 }}>
                    {statsData?.totalViews || 0}
                  </Typography>
                </StyledCardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard>
                <StyledCardContent>
                  <StyledAvatar>
                    <PersonIcon />
                  </StyledAvatar>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginTop: 1 }}
                  >
                    Total Subscribers
                  </Typography>
                  <Typography variant="h3" sx={{ marginTop: 1 }}>
                    {statsData?.totalSubscribers || 0}
                  </Typography>
                </StyledCardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard>
                <StyledCardContent>
                  <StyledAvatar>
                    <FavoriteIcon />
                  </StyledAvatar>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginTop: 1 }}
                  >
                    Total Likes
                  </Typography>
                  <Typography variant="h3" sx={{ marginTop: 1 }}>
                    {statsData?.totalLikes || 0}
                  </Typography>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
