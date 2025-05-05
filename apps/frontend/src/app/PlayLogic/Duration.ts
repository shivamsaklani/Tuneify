import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";

//Spotify Api sends duration in ms so it convert it to Minutes
export function convertDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export const useCurrentDuration = ()=>{
  const token =useSelector((state:RootState)=>state.auth.token);
  const [progress,setprogress]=useState<number>(0);
  useEffect(()=>{
    let interval;
    const Duration = async ()=>{
    try {
        
          const current= await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setprogress(current.data.progress_ms);
       
    } catch (error) {
      console.log(error);
    }
      
  }
  Duration();
  interval = setInterval(() => {
    Duration();
  }, 1000);

  return ()=>clearInterval(interval);
  },[token,progress]);
 return {progress};
}