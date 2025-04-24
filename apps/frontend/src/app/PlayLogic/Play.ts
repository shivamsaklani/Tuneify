// this Hook is used to play and pause the music 
import { useDispatch, useSelector } from "react-redux";
import { setPlaying } from "../redux/features/SpotifyPlayer";
import { RootState } from "../redux/store";
import axios from "axios";


// Update the state type based on your actual store structure
export const useTogglePlay = () => {
  const dispatch = useDispatch();
  const token = useSelector((state:RootState)=>state.auth.token);
  const isPlaying = useSelector((state: RootState) =>state.Player.isPlaying );

  const togglePlay =async () => {
    dispatch(setPlaying(!isPlaying));
   try {
     const Play = await axios.put(`https://api.spotify.com/v1/me/player/${isPlaying?"pause":"play"}`,null,{
       headers:{
           Authorization:`Bearer ${token}`,
       }
   }); 
   } catch (error) {
    console.log(error);
   }
  };

  return { isPlaying, togglePlay };
};

export const useButton= () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const device_id = useSelector((state: RootState) => state.Player.device_id);

  const BackWard = async (): Promise<void> => {
    try {
      await axios.post("https://api.spotify.com/v1/me/player/previous", {
        device_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const Forward= async (): Promise<void> => {
    try {
      await axios.post("https://api.spotify.com/v1/me/player/next", {
        device_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { BackWard ,Forward};
};
