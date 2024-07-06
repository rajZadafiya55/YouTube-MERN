import { useEffect, useState } from "react";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import deleteIMG from "../../img/delete.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../../redux/actions/playlistAction";

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

function ChannelPlaylists(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playlists } = useSelector((state) => state.playlist);

  const [PlaylistData, setPlaylistData] = useState([]);
  const [playlistColors, setPlaylistColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const sampleArr = [1, 2, 3, 4];
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

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
    dispatch(fetchPlaylists(id));
  }, [id]);

  useEffect(() => {
    setPlaylistData(playlists);
  }, [playlists]);

  if (
    (loading === false && PlaylistData === "No playlists available...") ||
    (loading === false && PlaylistData?.length === 0)
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
                sampleArr?.map(() => {
                  return (
                    <div className="created-all-playlistss" key={Math.random()}>
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
            {PlaylistData?.map((playlist, index) => (
              <div
                className="created-all-playlistss"
                key={playlist._id}
                style={{
                  display:
                    playlist.playlist_privacy === "Private" ? "none" : "block",
                }}
              >
                <div className="keep-playlist-one">
                  <div className="playlist-main-img">
                    <img
                      src={
                        playlist.videos.length > 0
                          ? playlist.videos[0].thumbnail.url
                          : deleteIMG
                      }
                      alt=""
                      className="playlist-thumbnail"
                      onClick={() => {
                        navigate(`/playlist/${playlist._id}`);
                      }}
                    />
                  </div>
                  <div
                    className={
                      theme
                        ? "playlist-element"
                        : "playlist-element text-dark-mode"
                    }
                    style={{
                      backgroundColor:
                        playlistColors[index] || playlistColors[0],
                    }}
                    onClick={() => {
                      navigate(`/video/${playlist.videos[0]._id}`);
                    }}
                  >
                    <PlaylistPlayIcon
                      fontSize="medium"
                      style={{ color: "white" }}
                    />
                    <p>{playlist.videos.length} videos</p>
                  </div>
                </div>
                <div className="playlistt-details">
                  <p>{playlist.name}</p>
                  <p
                    onClick={() => navigate(`/playlist/${playlist._id}`)}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelPlaylists;
