// this hook is useful if user wants to change the Music playing duration and can shift slider to custom duration
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import axios from "axios";

export const useSeek =()=>{
    const token = useSelector((state:RootState)=>state.auth.token);
    const device_id = useSelector((state:RootState)=>state.Player.device_id);
    const seekduration = async (duration:number)=>{
        try {
            await axios.put("https://api.spotify.com/v1/me/player/seek",null,{
                params:{
                    position_ms:duration,
                    device_id:device_id
                },
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    return {seekduration};
}