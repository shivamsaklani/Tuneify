// this endpoint get the clicked track id and other information and then play music
import axios from "axios"
import { setCurrentTrack } from "../redux/features/CurrentTrack"
import { TrackType } from "@/types/GlobalTypes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useVolume} from "./ChangeVolume";
import { setPlaying } from "../redux/features/SpotifyPlayer";
export const usePlayMusic =()=>{
  const device_id = useSelector((state:RootState)=>state.Player.device_id);
  const {ChangeVolume}= useVolume(); 
  const PlayMusic=async (id:string,dispatch:any,token:string |null) =>{
    try {
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,{
        headers:{
                Authorization:"Bearer "+token
        }
      });
      const data:TrackType={
        id:'',
        img:'',
        name:'',
        duration:0,
      };
      data.name=response.data.name;
      data.id=response.data.id;
      data.duration=response.data.duration_ms;
      data.img=response.data.album.images[0].url;
      dispatch(setCurrentTrack(data));
      await axios.put("https://api.spotify.com/v1/me/player/play",{
        "uris": [`spotify:track:${data.id}`],
        "position_ms": 0
    },{
        params:{
          device_id:device_id
        },
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      ChangeVolume(100);
      dispatch(setPlaying(true));

    } catch (error) {
      console.log(error);
    }
}
return {PlayMusic};
}
