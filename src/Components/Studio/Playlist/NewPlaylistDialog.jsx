import * as React from "react";
import { useState } from "react";
import { Button, Grid, styled, Dialog } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../../redux/actions/playlistAction";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

export default function NewPlaylistDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setdata] = useState({
    name: "",
    description: "",
  });
  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPlaylist(data));
    setdata("");
    handleClose();
    props.refreshData();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        New PlayList
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // fullScreen
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"New PlayList"}</DialogTitle>
        <DialogContent>
          <div>
            <ValidatorForm
              onSubmit={handleSubmit}
              onError={() => null}
              autocomplete="off"
            >
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    type="text"
                    name="name"
                    id="standard-basic"
                    value={data.name || ""}
                    onChange={handleChange}
                    errorMessages={["this field is required"]}
                    label="Playlist Name "
                    validators={["required"]}
                  />
                  <TextField
                    type="text"
                    name="description"
                    id="standard-basic"
                    value={data.description || ""}
                    onChange={handleChange}
                    errorMessages={["this field is required"]}
                    label="Description.. "
                    validators={["required"]}
                  />
                </Grid>
              </Grid>
              <Grid sm={6}>
                <Button color="primary" variant="contained" type="submit">
                  <span>Submit</span>
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  style={{ marginLeft: "10px" }}
                  onClick={handleClose}
                >
                  cancel
                </Button>
              </Grid>
            </ValidatorForm>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
