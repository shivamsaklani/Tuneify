import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";

export const useVolume=()=>{
    const token = useSelector((state:RootState)=>state.auth.token);
    const device_id=useSelector((state:RootState)=>state.Player.device_id);
    const ChangeVolume = async (volume:number) =>{
        try {
            const Change = await axios.put("https://api.spotify.com/v1/me/player/volume",null,{
                params: {
                    volume_percent: volume,
                    device_id: device_id,
                  },
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log(Change);
        } catch (error) {
            console.log(error);
        }
    }
    return {ChangeVolume};
}