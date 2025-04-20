import axios from "axios"
import { setCurrentTrack } from "../redux/features/CurrentTrack"
import { TrackItemType, TrackType } from "@/types/GlobalTypes";

export const PlayMusic =async (id:string,dispatch:any,token:string |null) =>{
   
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,{
          headers:{
                  Authorization:"Bearer "+token
          }
        });
        let data:TrackType={
          id:'',
          img:'',
          name:'',
          duration:0
        };
        data.name=response.data.name;
        data.id=response.data.id;
        data.duration=response.data.duration_ms;
        data.img=response.data.album.images[0].url;
        console.log(data);
        dispatch(setCurrentTrack(data));
      } catch (error) {
        console.log(error);
      }


    

}