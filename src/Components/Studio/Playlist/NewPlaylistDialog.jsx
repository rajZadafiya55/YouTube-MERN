import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Grid, styled, Dialog } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { _id } from "../../../constant/Api";
import {
  createPlaylist,
  fetchPlaylists,
} from "../../../redux/actions/playlistAction";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

export default function NewPlaylistDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const playlists = useSelector((state) => state.playlist.playlists);

  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchPlaylists(_id));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPlaylist(data, _id));
      setData({
        name: "",
        description: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error creating playlist: ", error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        New Playlist
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">New Playlist</DialogTitle>
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
                  value={data.name}
                  onChange={handleChange}
                  errorMessages={["This field is required"]}
                  label="Playlist Name"
                  validators={["required"]}
                />
                <TextField
                  type="text"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  errorMessages={["This field is required"]}
                  label="Description"
                  validators={["required"]}
                />
              </Grid>
              <Grid item sm={6}>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  style={{ marginLeft: "10px" }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
