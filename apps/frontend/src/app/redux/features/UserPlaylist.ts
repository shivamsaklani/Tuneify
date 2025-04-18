import { PlaylistItem, SelectedPlaylist } from "@/types/GlobalTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface UserPlaylist {
  playlist: PlaylistItem[];
  selectedplaylist: SelectedPlaylist;
}

const initialState: UserPlaylist = {
  playlist: [],
  selectedplaylist:{
    id:'',
    name:''
  },
};

const userPlaylistSlice = createSlice({
  name: "userPlaylist",
  initialState,
  reducers: {
    addplaylist(state, action: PayloadAction<PlaylistItem[]>) {
  state.playlist = action.payload;
    },
    selectplaylist(state, action: PayloadAction<SelectedPlaylist>) {
      state.selectedplaylist.id = action.payload.id;
      state.selectedplaylist.name=action.payload.name;
    }
  }
});

export const { addplaylist, selectplaylist } = userPlaylistSlice.actions;
export default userPlaylistSlice.reducer;
