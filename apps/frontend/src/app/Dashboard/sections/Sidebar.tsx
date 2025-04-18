import { GroupItems } from "@/app/components/GroupItems"
import { Items } from "@/app/components/Items"
import { TvIcon } from "lucide-react"
import image from "@/app/assets/images/ab67616d00001e02eb2a87031edeb0be809c48aa.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PlaylistItem } from "@/types/GlobalTypes";
import { useEffect } from "react";
import { addplaylist } from "@/app/redux/features/UserPlaylist";
import axios from "axios";
import { useDispatch } from "react-redux";

export const Sidebar=()=>{
  const dispatch = useDispatch();
  const AllPlaylist: PlaylistItem[] = useSelector((state: RootState) => state.userPlaylist.playlist);
  const SelectedPlaylist = useSelector((state:RootState)=>state.userPlaylist.selectedplaylist);
  const token = useSelector((state:RootState)=> state.auth.token);


  useEffect(()=>{
    const UserPlaylist = async()=>{

      const response= await axios.get("https://api.spotify.com/v1/me/playlists",{
        headers:{
          Authorization: `Bearer ${token}`,
        }
  
      });
      const playlist= response.data.items.map((item:PlaylistItem)=>(
        {
          name:item.name,
          id:item.id,
          images:item.images.map((image)=>(
            {
              url:image.url,
              height:image.height,
              width:image.width
            }
          ))
        }
      ));
      dispatch(addplaylist(playlist));
      
    }
    UserPlaylist();

    
  },[token, dispatch, AllPlaylist.length]);
 
    return(
   
        <div className="w-full sm:grid hidden  h-full bg-black/40 rounded-md overflow-hidden">
        
        <GroupItems title="Your PlayList" icon={TvIcon} scrollable>
      <div className="flex justify-start">
      <ul className="space-y-3">
          {AllPlaylist.map((item,index)=>(
            <div className="text-white" key={index}>
              <h1>{item.id}</h1>
              <h2>{item.name}</h2>
              <h2>{item.images.map((image,idx)=>(
                <Items key={idx} title={item.name} src={image.url}/>
              ))}</h2>
            </div>
          )
        )}
        </ul>
      </div>
       
        </GroupItems>
      </div>
    )
}