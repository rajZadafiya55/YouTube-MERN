import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_USER_ALL_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
  CREATE_PLAYLIST,
  ADD_VIDEO_TO_PLAYLIST,
  GET_PLAYLIST_BY_ID,
} from "../types";
import {
  APIHttp,
  CancelNotify,
  Header,
  commonNotify,
  showErrorToast,
  showToast,
} from "../../constant/Api";

const getAllPlaylists = (playlists) => ({
  type: GET_USER_ALL_PLAYLIST,
  payload: playlists,
});

export const fetchPlaylists = (_id) => (dispatch) => {
  axios
    .get(`${APIHttp}playlist/user/${_id}`, Header)
    .then(async (res) => {
      await dispatch(getAllPlaylists(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const deletePlaylistAction = (playlistId) => ({
  type: DELETE_PLAYLIST,
  payload: playlistId,
});

export const deletePlaylist = (playlistId, _id) => (dispatch) => {
  Swal.fire({
    title: "Do you want to Delete?",
    showCancelButton: true,
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${APIHttp}playlist/${playlistId}`, Header)
        .then(async (res) => {
          await dispatch(deletePlaylistAction(playlistId));
          fetchPlaylists(_id);
          if (res.data.success) {
            showToast("Playlist Deleted successfully!");
          }
        })
        .catch((err) => {
          console.log(err);
          showErrorToast("Failed to delete playlist");
        });
    }
  });
};

const updatePlaylistAction = (playlist) => ({
  type: UPDATE_PLAYLIST,
  payload: playlist,
});

export const updatePlaylist = (id, _id, formData) => (dispatch) => {
  axios
    .patch(`${APIHttp}playlist/${id}`, formData, Header)
    .then(async (res) => {
      await dispatch(updatePlaylistAction(res.data));
      commonNotify("Playlist Updated Successfully!");
      fetchPlaylists(_id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeVideoFromPlaylistAction = (playListId, videoId) => ({
  type: REMOVE_VIDEO_FROM_PLAYLIST,
  payload: { playListId, videoId },
});

export const removeVideoFromPlaylist =
  (playListId, videoId, _id) => (dispatch) => {
    axios
      .patch(`${APIHttp}playlist/remove/${videoId}/${playListId}`)
      .then(async () => {
        await dispatch(removeVideoFromPlaylistAction(playListId, videoId));
        fetchPlaylists(_id);
        commonNotify("Video successfully removed from the playlist.");
      })
      .catch((err) => {
        console.log(err);
        CancelNotify(
          "There was an error removing the video from the playlist."
        );
      });
  };

const createPlaylistAction = (playlist) => ({
  type: CREATE_PLAYLIST,
  payload: playlist,
});

export const createPlaylist = (data, _id) => (dispatch) => {
  axios
    .post(`${APIHttp}playlist`, data, Header)
    .then(async (res) => {
      console.log('Created Playlist:', res.data.data);
      await dispatch(createPlaylistAction(res.data.data));
      commonNotify("Playlist Created Successfully!");
      dispatch(fetchPlaylists(_id));
    })
    .catch((err) => {
      console.log('Create Playlist Error:', err);
      showErrorToast("Failed to create playlist");
    });
};

const addVideoToPlaylistAction = (playlistId, videoId) => ({
  type: ADD_VIDEO_TO_PLAYLIST,
  payload: { playlistId, videoId },
});

export const addVideoToPlaylist = (videoId, playlistId, _id) => (dispatch) => {
  axios
    .patch(`${APIHttp}playlist/add/${videoId}/${playlistId}`, Header)
    .then(async (response) => {
      await dispatch(addVideoToPlaylistAction(playlistId, videoId));
      fetchPlaylists(_id);
      commonNotify("Video successfully added to the playlist.");
    })
    .catch((error) => {
      CancelNotify("There was an error adding the video to the playlist.");
    });
};

const getPlaylistByIdAction = (playlists) => ({
  type: GET_PLAYLIST_BY_ID,
  payload: playlists,
});

export const fetchPlaylistById = (id) => (dispatch) => {
  axios
    .get(`${APIHttp}playlist/${id}`, Header)
    .then((res) => {
      dispatch(getPlaylistByIdAction(res.data.data));
    })
    .catch((err) => {
      console.log(err);
      showErrorToast("Failed to fetch playlist by ID");
    });
};
