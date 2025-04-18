import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define what a single playlist object looks like
interface PlaylistItem {
  id: string;
  name: string;
  // Add more properties as needed
}

interface UserPlaylist {
  playlist: PlaylistItem[];
  selectedplaylist: string;
}

const initialState: UserPlaylist = {
  playlist: [],
  selectedplaylist: '',
};

const userPlaylistSlice = createSlice({
  name: "userPlaylist",
  initialState,
  reducers: {
    addplaylist(state, action: PayloadAction<PlaylistItem[]>) {
      state.playlist = action.payload;
    },
    selectplaylist(state, action: PayloadAction<string>) {
      state.selectedplaylist = action.payload;
    }
  }
});

export const { addplaylist, selectplaylist } = userPlaylistSlice.actions;
export default userPlaylistSlice.reducer;
