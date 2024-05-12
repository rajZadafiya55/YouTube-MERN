import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import deleteIMG from "../../img/delete.jpg";
import { useNavigate } from "react-router-dom";

function generateRandomColors(count) {
  const transparency = 0.7; // Adjust transparency as needed (0 to 1)
  const colors = [];

  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    colors.push(`rgba(${r}, ${g}, ${b}, ${transparency})`);
  }

  return colors;
}

function ChannelPlaylists(prop) {
  const navigate = useNavigate();
  const backendURL = "http://localhost:3000";
  const [PlaylistData, setPlaylistData] = useState([]);
  const [email, setEmail] = useState();
  const [playlistColors, setPlaylistColors] = useState([]);
  const token = localStorage.getItem("userToken");
  const [loading, setLoading] = useState(true);
  const sampleArr = [1, 2, 3, 4];
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    if (token) {
      setEmail(jwtDecode(token).email);
    }
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    // Generate colors based on the length of PlaylistData array
    const colors = generateRandomColors(Math.max(1, PlaylistData.length));
    setPlaylistColors(colors);
  }, [PlaylistData]);

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        if (prop.newmail !== undefined) {
          const response = await fetch(
            `${backendURL}/getplaylistdata/${prop.newmail}`
          );
          const playlistData = await response.json();
          setPlaylistData(playlistData);
        }
      } catch (error) {
        // console.log(error.message);
      }
    };
    getPlaylistData();
  }, [prop.newmail]);

  const publicPlaylists =
    PlaylistData &&
    PlaylistData !== "No playlists available..." &&
    PlaylistData.filter((item) => item.playlist_privacy === "Public");

  const noPublicPlaylists = publicPlaylists.length === 0;

  if (
    (loading === false && PlaylistData === "No playlists available...") ||
    (loading === false && PlaylistData.length === 0) ||
    (email !== prop.newmail && noPublicPlaylists)
  ) {
    return (
      <p
        className={theme ? "" : " text-light-mode "}
        style={{
          color: "white",
          fontSize: "16px",
          textAlign: "center",
          margin: "100px 0px",
        }}
      >
        This channel doesn&apos;t have any playlists.
      </p>
    );
  }

  return (
    <>
      <SkeletonTheme
        baseColor={theme ? "#353535" : "#aaaaaa"}
        highlightColor={theme ? "#444" : "#b6b6b6"}
      >
        <div
          className="channel-playlist-section"
          style={
            loading === true
              ? { display: "block", width: "-webkit-fill-available" }
              : { display: "none" }
          }
        >
          <div className="created-playlist-section">
            <Skeleton
              count={1}
              width={150}
              height={16}
              style={{ borderRadius: "4px" }}
              className="sk-create-playlist"
            />
            <div className="thischannel-playlists">
              {sampleArr &&
                sampleArr.map(() => {
                  return (
                    <>
                      <div className="created-all-playlistss">
                        <Skeleton
                          count={1}
                          width={230}
                          height={129}
                          style={{ borderRadius: "9px" }}
                          className="sk-playlist-thumbnail"
                        />

                        <div className="playlistt-details">
                          <Skeleton
                            count={1}
                            width={150}
                            height={18}
                            style={{
                              borderRadius: "4px",
                              position: "relative",
                              top: "23px",
                            }}
                            className="sk-playlist-name"
                          />
                          <Skeleton
                            count={1}
                            width={120}
                            height={16}
                            style={{
                              borderRadius: "4px",
                              position: "relative",
                              top: "27px",
                            }}
                            className="sk-playlist-desc"
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </SkeletonTheme>
      <div
        className="channel-playlist-section"
        style={
          loading === false
            ? {
                visibility: "visible",
                display: "block",
              }
            : { visibility: "hidden", display: "none" }
        }
      >
        <div
          className={
            theme
              ? "created-playlist-section"
              : "created-playlist-section text-light-mode"
          }
        >
          <p>Created playlists</p>
          <div className="thischannel-playlists">
            {PlaylistData &&
              PlaylistData !== "No playlists available..." &&
              PlaylistData.length > 0 &&
              PlaylistData.map((element, index) => {
                const backgroundColor =
                  playlistColors[index] || playlistColors[0];

                return (
                  <>
                    <div
                      className="created-all-playlistss"
                      key={index}
                      style={
                        prop.newmail !== email &&
                        element.playlist_privacy === "Private"
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      <div className="keep-playlist-one">
                        <div className="playlist-main-img">
                          <img
                            src={
                              element.playlist_videos[0] !== undefined
                                ? element.playlist_videos[0].thumbnail
                                : deleteIMG
                            }
                            alt=""
                            className="playlist-thumbnail"
                            onClick={() => {
                              navigate(
                                `/video/${element.playlist_videos[0].videoID}`
                              );
                            }}
                          />
                        </div>

                        <div
                          className={
                            theme
                              ? "playlist-element"
                              : "playlist-element text-dark-mode"
                          }
                          style={{ backgroundColor }}
                          onClick={() => {
                            navigate(
                              `/video/${element.playlist_videos[0].videoID}`
                            );
                          }}
                        >
                          <PlaylistPlayIcon
                            fontSize="medium"
                            style={{ color: "white" }}
                          />
                          <p>{element.playlist_videos.length} videos</p>
                        </div>
                      </div>

                      <div className="playlistt-details">
                        <p>{element.playlist_name}</p>
                        <p
                          onClick={() => navigate(`/playlist/${element._id}`)}
                          className={
                            theme
                              ? "view-playlist2"
                              : "view-playlist2-light text-light-mode2"
                          }
                        >
                          View full playlist
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelPlaylists;
