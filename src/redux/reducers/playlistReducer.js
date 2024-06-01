import {
  GET_USER_ALL_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
  CREATE_PLAYLIST,
  ADD_VIDEO_TO_PLAYLIST,
  GET_PLAYLIST_BY_ID,
} from "../types";

export const initialState = {
  playlists: [],
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ALL_PLAYLIST:
      return {
        ...state,
        playlists: action.payload.map((value, index) => ({
          ...value,
          id: index + 1,
        })),
      };
    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, action.payload],
      };
    case DELETE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist._id !== action.payload
        ),
      };
    case UPDATE_PLAYLIST:
      const updatedPlaylists = state.playlists.map((playlist) =>
        playlist._id === action.payload._id ? action.payload : playlist
      );
      return {
        ...state,
        playlists: updatedPlaylists,
      };
    case REMOVE_VIDEO_FROM_PLAYLIST:
      const { playListId, videoId } = action.payload;
      const updatedPlaylist = state.playlists.map((playlist) => {
        if (playlist._id === playListId) {
          return {
            ...playlist,
            videos: playlist.videos.filter((video) => video._id !== videoId),
          };
        }
        return playlist;
      });
      return {
        ...state,
        playlists: updatedPlaylist,
      };

    case ADD_VIDEO_TO_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.map((playlist) => {
          if (playlist._id === action.payload.playlistId) {
            return {
              ...playlist,
              videos: [...playlist.videos, { _id: action.payload.videoId }],
            };
          }
          return playlist;
        }),
      };

    case GET_PLAYLIST_BY_ID:
      return {
        ...state,
        playlists: action.payload,
      };
    default:
      return state;
  }
};

export default playlistReducer;
