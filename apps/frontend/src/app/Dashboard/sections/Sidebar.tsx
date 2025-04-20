import { PlayListItems } from "@/app/components/PlayListItems"
import { Items } from "@/app/components/Items"
import { TvIcon } from "lucide-react"
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PlaylistItem} from "@/types/GlobalTypes";
import { useEffect } from "react";
import { addplaylist, selectplaylist } from "@/app/redux/features/UserPlaylist";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { setLoading } from "@/app/redux/features/Loading";

export const Sidebar=()=>{
  const dispatch = useDispatch();
  const AllPlaylist: PlaylistItem[] = useSelector((state: RootState) => state.userPlaylist.playlist);
  const SelectedPlaylist = useSelector((state:RootState)=>state.userPlaylist.selectedplaylist);
  const token = useSelector((state:RootState)=> state.auth.token);
  const CurrentPlayList = (name:string,id:string)=>{
    dispatch(selectplaylist({name:name,id:id}));
  }

  useEffect(()=>{
    const UserPlaylist = async()=>{
     try {
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
      dispatch(setLoading(false));
      dispatch(selectplaylist({
        name:playlist[0].name,
        id:playlist[0].id
      }));
     } catch (error) {
        console.log(error);
     }
    
      
    }
    UserPlaylist();
    
  },[token, dispatch, AllPlaylist.length]);
 
    return(
      <>
     {(AllPlaylist)?
    <div className="flex flex-col">
       <div className="flex text-gray-200 pb-5 justify-center items-center gap-2">
          <span >
           <TvIcon />
          </span>
     <h1 className="text-lg font-semibold">PlayList</h1>
      </div>
     
      <div>
      <PlayListItems>
          <div className="flex flex-col  space-y-3">
            {AllPlaylist.map((item, index) => (
              <Items selected onclick={()=>CurrentPlayList(item.name,item.id)} id={item.id} key={index} title={item.name} />
            ))}
          </div>
      </PlayListItems>
    </div>
    </div>:
     <Skeleton className="h-full w-96">
      </Skeleton>
    }
    </>
    
    )
}