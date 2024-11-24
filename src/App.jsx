import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from "./Components/Browse";
import Studio from "./Components/Studio";
import Error from "./Components/Error";
import Customization from "./Components/Studio/Customization";
import Content from "./Components/Studio/Content";
import VideoDetails from "./Components/Studio/VideoDetails";
import Comments from "./Components/Studio/Comments";
import VideoComments from "./Components/Studio/VideoComments";
import LikeVideos from "./Components/LikeVideos";
import WatchLater from "./Components/WatchLater";
import OtherChannel from "./Components/Channel/OtherChannel";
import Subscriptions from "./Components/Subscriptions";
import Trending from "./Components/Trending";
import SearchResults from "./Components/SearchResults";
import Playlists from "./Components/Playlists";
import Library from "./Components/Library";
import VideoSection from "./Components/VideoSection";
import Layout from "./Components/Layout";
import AdminLayout from "./Components/Studio/AdminLayout";
import Layout3 from "./Components/Studio/Layout3";
import PlayList from "./Components/Studio/PlayList";
import Room from "./Components/Studio/Room";

function App() {
  const token = localStorage.getItem("userToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Browse />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <Browse />
            </Layout>
          }
        />
        <Route
          path="/studio"
          element={
            token ? (
              <AdminLayout>
                <Studio />
              </AdminLayout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/room/:roomId"
          element={
            token ? (
              <AdminLayout>
                <Room />
              </AdminLayout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/studio/customize"
          element={
            token ? (
              <AdminLayout>
                <Customization />
              </AdminLayout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/studio/video"
          element={
            token ? (
              <AdminLayout>
                <Content />
              </AdminLayout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/studio/comments"
          element={
            token ? (
              <AdminLayout>
                <Comments />
              </AdminLayout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/studio/playlist"
          element={
            token ? (
              <AdminLayout>
                <PlayList />
              </AdminLayout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/studio/video/edit/:id"
          element={
            token ? (
              <Layout3>
                <VideoDetails />
              </Layout3>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/studio/video/comments/:id"
          element={
            token ? (
              <Layout3>
                <VideoComments />
              </Layout3>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/likedVideos"
          element={
            token ? (
              <Layout>
                <LikeVideos />
              </Layout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/watchlater"
          element={
            token ? (
              <Layout>
                <WatchLater />
              </Layout>
            ) : (
              <Error />
            )
          }
        />

        <Route
          path="/library"
          element={
            token ? (
              <Layout>
                <Library />
              </Layout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/channel/:id"
          element={
            token ? (
              <Layout>
                <OtherChannel />
              </Layout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/trending"
          element={
            token ? (
              <Layout>
                <Trending />
              </Layout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/results/:data"
          element={
            token ? (
              <Layout>
                <SearchResults />
              </Layout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/playlist/:id"
          element={
            token ? (
              <Layout>
                <Playlists />
              </Layout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/subscriptions"
          element={
            token ? (
              <Layout>
                <Subscriptions />
              </Layout>
            ) : (
              <Error />
            )
          }
        />
        <Route
          path="/video/:id"
          element={token ? <VideoSection /> : <Error />}
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
