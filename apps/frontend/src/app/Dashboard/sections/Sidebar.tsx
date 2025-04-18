import { PlayListItems } from "@/app/components/PlayListItems"
import { Items } from "@/app/components/Items"
import { TvIcon } from "lucide-react"
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PlaylistItem } from "@/types/GlobalTypes";
import { useEffect } from "react";
import { addplaylist } from "@/app/redux/features/UserPlaylist";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <>
      <div className="flex flex-col">
       <div className="flex text-gray-200 pb-5 justify-center items-center gap-2">
          <span >
           <TvIcon />
          </span>
     <h1 className="text-lg font-semibold">PlayList</h1>
      </div>
    
    <ScrollArea className="w-full sm:grid hidden pt-5 h-full bg-black/40 rounded-md">
     
      <div>
      <PlayListItems>
          <ul className="space-y-3">
            {AllPlaylist.map((item, index) => (
              <div className="text-white" key={index}>
                <h2>{item.name}</h2>
                <h2>
                  {item.images.map((image, idx) => (
                    <Items key={idx} title={item.name} src={image.url} />
                  ))}
                </h2>
              </div>
            ))}
          </ul>
      </PlayListItems>
    </div>
    </ScrollArea>
    </div>
    </>
    
    )
}