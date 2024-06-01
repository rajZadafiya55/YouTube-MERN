import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import NewPlaylistDialog from "./Playlist/NewPlaylistDialog";
import {
  APIHttp,
  _id,
  Header,
  commonNotify,
  CancelNotify,
} from "../../constant/Api";
import { NavLink, useNavigate } from "react-router-dom";

export default function PlayList() {
  const navigate = useNavigate();
  // ==========================(UI code)==================================================
  const [theme, setTheme] = useState(false);
  if (theme === false && window.location.href.includes("/studio/playList")) {
    document.body.style.backgroundColor = "white";
  }
  const [menu, setMenu] = useState(() => {
    const menu = localStorage.getItem("studioMenuClicked");
    return menu ? JSON.parse(menu) : false;
  });

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
  // ==========================()==================================================

  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState({});
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handlePlistClick = (row) => () => {
    setEditRow(row);
    setOpen(true);
  };

  const handleshowPlistClose = () => {
    setOpen(false);
  };

  const handleEditClick = (row) => () => {
    setFormData({ name: row.row.name, description: row.row.description });
    setEditRow(row.row);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeleteClick = (row) => () => {
    Swal.fire({
      title: "Do you want to Delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${APIHttp}playlist/${row.row._id}`, Header).then(() => {
          refreshData();
        });
      }
    });
  };

  const columns = [
    { field: "description", headerName: "Description", width: 300 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "totalVideos", headerName: "Total Videos", width: 150 },
    { field: "totalViews", headerName: "Total Views", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (row) => [
        <GridActionsCellItem
          icon={<FeaturedPlayListIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handlePlistClick(row.row)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(row)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(row)}
          color="inherit"
        />,
      ],
    },
  ];
  // ==========================(data show )==================================================

  const fetchData = useCallback(() => {
    axios
      .get(`${APIHttp}playlist/user/${_id}`, Header)
      .then((r) => {
        if (Array.isArray(r.data.data)) {
          const d = r.data.data.map((value, index) => {
            return { ...value, id: index + 1 };
          });
          setRows(d);
        } else {
          console.error("Data is not an array", r.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==========================(remove playlist)==================================================
  const RemoveToPlaylist = (playListId, videoId) => {
    if (videoId && playListId) {
      axios
        .patch(`${APIHttp}playlist/remove/${videoId}/${playListId}`)
        .then((response) => {
          commonNotify("Video successfully removed from the playlist.");
          setOpen(false);
          refreshData();
        })
        .catch((error) => {
          CancelNotify(
            "There was an error removing the video from the playlist."
          );
        });
    } else {
      CancelNotify("Please select a playlist.");
    }
  };

  const refreshData = () => {
    fetchData();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`${APIHttp}playlist/${editRow._id}`, formData, Header)
      .then((response) => {
        commonNotify("Playlist updated successfully.");
        setEditOpen(false);
        refreshData();
      })
      .catch((error) => {
        CancelNotify("There was an error updating the playlist.");
      });
  };

  return (
    <>
      <div className="studio-dashboard-section">
        <div
          className="dashboard-data"
          style={{
            left: menu ? "120px" : "320px",
            right: "30px",
            transition: "all .1s ease",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h5" color={"black"} gutterBottom>
              Channel PlayList
            </Typography>
            <NewPlaylistDialog refreshData={refreshData} />
          </Stack>
          <Card
            style={{ height: 450, width: "100%", backgroundColor: "#ffffff" }}
            sx={{ borderRadius: "16px" }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </Card>
        </div>
      </div>
      {/* ============================ Show Playlist video Dialog ===================== */}
      <Dialog
        open={open}
        onClose={handleshowPlistClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" bgcolor="#d62d2d" color="white">
          {editRow.name}
          <Typography>
            Total Videos: {editRow.totalVideos} || Total Views:{" "}
            {editRow.totalViews}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div>
            {editRow.videos && editRow.videos.length > 0 ? (
              editRow.videos.map((val, index) => (
                <div key={index}>
                  <Grid container spacing={2} mt={2}>
                    <Grid item sm={3}>
                      <div className="no-skeleton">
                        <img
                          src={val.thumbnail.url}
                          alt={val.title}
                          className="studio-video-thumbnail"
                          onClick={() => {
                            navigate(`/video/${val._id}`);
                          }}
                        />
                        <p className="video-left-duration">
                          {Math.floor(val.duration / 60) +
                            ":" +
                            (Math.round(val.duration % 60) < 10
                              ? "0" + Math.round(val.duration % 60)
                              : Math.round(val.duration % 60))}
                        </p>
                      </div>
                    </Grid>
                    <Grid item sm={7}>
                      <div className="no-skeleton2">
                        <p
                          className={
                            theme
                              ? "studio-video-title"
                              : "studio-video-title text-light-mode"
                          }
                          onClick={() => {
                            navigate(`/video/${val._id}`);
                          }}
                        >
                          {val.title && val.title.length <= 40
                            ? val.title
                            : `${val.title?.slice(0, 40)}...`}
                        </p>
                        {val.description ? (
                          <p
                            className={
                              theme
                                ? "studio-video-desc"
                                : "studio-video-desc text-light-mode2"
                            }
                          >
                            {val.description.length <= 85
                              ? val.description
                              : `${val.description.slice(0, 85)}...`}
                          </p>
                        ) : (
                          <p>Add description</p>
                        )}
                      </div>
                    </Grid>
                    <Grid item sm={2}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => RemoveToPlaylist(editRow._id, val._id)}
                      >
                        <PlaylistRemoveIcon />
                      </Button>
                    </Grid>
                  </Grid>
                  <hr style={{ marginTop: "20px" }} />
                </div>
              ))
            ) : (
              <Typography variant="body1" mt={10} color="textSecondary">
                No videos found.{" "}
                <NavLink to="/studio/video">
                  Add videos to the playlist.
                </NavLink>
              </Typography>
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleshowPlistClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Playlist</DialogTitle>
        <DialogContent>
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={() => null}
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  label="Playlist Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleEditClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
