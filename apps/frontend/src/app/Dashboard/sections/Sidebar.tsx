import { GroupItems } from "@/app/components/GroupItems"
import { Items } from "@/app/components/Items"
import { TvIcon } from "lucide-react"
import image from "@/app/assets/images/ab67616d00001e02eb2a87031edeb0be809c48aa.jpeg";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
export const Sidebar=()=>{
  const userPlaylist = useDispatch();
  const selectedPlaylist = useSelector((state:RootState)=>state.userPlaylist);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token) return;
    const response =async()=>{
       await axios.get("https://api.spotify.com/v1/me",{
        headers:{
          Authorization:`Bearer ${token}`
        }
       });
    }

    response();
    console.log(response);
   

  },[]);
    return(
   
        <div className="w-full sm:grid hidden  h-full bg-black/40 rounded-md overflow-hidden">
        
        <GroupItems title="Your PlayList" icon={TvIcon} scrollable>
      <div className="flex justify-start">
      <ul className="space-y-3">
          {[...Array(30)].map((_, i) => (
            <Items key={i} title="shivam" src={image}/>
          ))}
        </ul>
      </div>
       
        </GroupItems>
      </div>
    )
}