// this Hook is used to play and pause the music
import { useDispatch, useSelector } from "react-redux";
import { setPlaying } from "../redux/features/SpotifyPlayer";
import { RootState } from "../redux/store";
import axios from "axios";
import { usePlayMusic } from "./PlayMusic";

// Update the state type based on your actual store structure
export const useTogglePlay = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const isPlaying = useSelector((state: RootState) => state.Player.isPlaying);
  const togglePlay = async () => {
    dispatch(setPlaying(!isPlaying));
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/${isPlaying ? "pause" : "play"}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { isPlaying, togglePlay };
};
// BackWard and Forward Button Logic
export const useButton = () => {
  const { PlayMusic } = usePlayMusic();
    const selected = useSelector(
      (state: RootState) => state.userPlaylist.selectedplaylist.id
    );
    
    const playlist = useSelector(
      (state: RootState) => state.userPlaylist.playlist
    );
    const currentIndex = playlist.findIndex((track) => track.id === selected);
  const BackWard = async (): Promise<void> => {
    console.log(selected);
    const prevIndex = currentIndex - 1;
    console.log(currentIndex);
    console.log(prevIndex);
    
    if (prevIndex >= 0 && prevIndex < playlist.length) {
      PlayMusic(playlist[prevIndex].id); 
    }
  };
  const Forward = async (): Promise<void> => {
    const nextIndex = currentIndex + 1;
       console.log(currentIndex);
    console.log(nextIndex);

    // Check bounds and play next track
    if (nextIndex >= 0 && nextIndex < playlist.length) {
      PlayMusic(playlist[nextIndex].id); // Pass the actual ID (string)
    }
  };

  return { BackWard, Forward };
};
