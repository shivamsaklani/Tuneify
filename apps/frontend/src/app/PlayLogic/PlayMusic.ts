import axios from "axios";
import { setCurrentTrack } from "../redux/features/CurrentTrack";
import { TrackType } from "@/types/GlobalTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useVolume } from "./ChangeVolume";
import { setPlaying } from "../redux/features/SpotifyPlayer";

export const usePlayMusic = () => {
  const device_id = useSelector((state: RootState) => state.Player.device_id);
  const { ChangeVolume } = useVolume();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const PlayMusic = async (id: string) => {
    if (!device_id) {
      console.error("Device ID is missing");
      return;
    }

    try {
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: TrackType = {
        id: response.data.id,
        name: response.data.name,
        duration: response.data.duration_ms,
        img: response.data.album?.images?.[0]?.url ?? "",
      };

      dispatch(setCurrentTrack(data));

      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          uris: [`spotify:track:${data.id}`],
          position_ms: 0,
        },
        {
          params: {
            device_id: device_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      ChangeVolume(100);
      dispatch(setPlaying(true));
    } catch (error: any) {
      console.error("Error playing track:", error?.response?.data || error.message);
    }
  };

  return { PlayMusic };
};
