"use client";
import { RootState } from "@/app/redux/store";
import {motion} from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { TrackItem } from "@/app/components/TrackItem";
import { TrackItemType } from "@/types/GlobalTypes";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "@/app/redux/features/CurrentTrack";
export const MusicSection=()=>{
  const PlayListId = useSelector((state:RootState)=>state.userPlaylist.selectedplaylist);
  const [Track,setTrack]=useState<TrackItemType[] | null>(null);
  const [img,setImg] = useState(null);
  const currentTrack = useDispatch();
  const token = useSelector((state:RootState)=>state.auth.token);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: scrollRef,
        offset: ["start start", "end start"],
      });
      const stickyOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
      const stickyY = useTransform(scrollYProgress, [0.1, 0.2], [-20, 0]);
    const user= useSelector((state:RootState)=>state.userInfo);
   
    useEffect(()=>{
    const GetTrack =async ()=>{
      try {
        
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${PlayListId.id}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });    
        setImg(response.data.images[0].url);
        let NewTrack: TrackItemType[] = [];

response.data.tracks.items.forEach((item: any) => {
  const track = item.track;
  const album = track.album;

  const trackObj: TrackItemType = {
    img: album.images[0].url,
    id: track.id,
    href: track.href,
    name: track.name,
    Album: {
      id: album.id,
      name: album.name
    },
    duration: track.duration_ms,
    date: item.added_at
  };

  NewTrack.push(trackObj);

  
});
console.log(NewTrack);

setTrack(NewTrack);
currentTrack(setCurrentTrack({
  name:NewTrack[0].name,
  id:NewTrack[0].id,
  img:NewTrack[0].img,
  duration:NewTrack[0].duration
}));
      } catch (error) {
        console.log(error);
      }
    }
    GetTrack();
  },[PlayListId.id,token]);
    return(
   
        <div className="grid h-full w-full ">
          
          <section className="h-full pb-5 text-white bg-black/40 rounded-md overflow-auto flex flex-col" ref={scrollRef}>
  <ScrollArea className="w-full h-full overflow-auto">
    <div className="bg-gradient-to-br from-purple-500 shadow-md shadow-gray-950 to-blue-500 pt-10 px-3 pb-3 w-full">
      <div className="flex px-3 gap-10">
        <div className="flex">
          {(img)?
          <img src={img} className="sm:size-40 size-32 shadow-lg shadow-gray-950 rounded-md" alt="Profile" />:
          <Skeleton className="size-40 shadow-lg shadow-gray-950 rounded-md"></Skeleton>}
        </div>
        <div className="flex items-start justify-center flex-col">
          <div className="flex">
            <span>Playlist</span>
          </div>
          <h1 className="text-4xl font-white font-sans">{PlayListId.name}</h1>
          <div className="flex flex-rows item-center justify-center">
            <p>{user.name}</p>
            <p className="text-lg px-2">.</p>
            <p>8 Songs</p>
          </div>
        </div>
      </div>
    </div>

    {/* Sticky Animated Title */}
    <motion.div
      style={{ opacity: stickyOpacity, y: stickyY }}
      className="sticky top-0 absolute z-20 bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-2 shadow-md"
    >
      <h1 className="text-4xl font-white font-sans">Music PlayList</h1>
    </motion.div>

    {/* List of music tracks */}
    <div className="px-5">
  <div className="flex pb-5 justify-between items-center gap-4 overflow-hidden text-gray-400 text-sm">
    <div className="flex items-center gap-5 overflow-hidden flex-1 min-w-0">
      <div className="w-5 shrink-0">#</div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
        Title
      </div>
    </div>

    <div className="overflow-hidden text-ellipsis whitespace-nowrap w-40">
      Album
    </div>

    <div className="overflow-hidden md:flex hidden text-ellipsis whitespace-nowrap w-28">
      Date
    </div>

    <div className="w-14 px-5 text-right">
      <Timer />
    </div>
 
</div>

      <div>
        {(Track)?
            Track.map((item,idx)=>(
                <div key={idx}>

                <TrackItem index={idx} id={item.id} name={item.name} Album={item.Album} date={item.date} duration={item.duration} img={item.img} href={item.href}  />
                </div>
            )):<Skeleton count={5} className="h-8 w-full flex gap-2"></Skeleton>
        }
      </div>
    </div>
  </ScrollArea>
</section>

        </div>
       
       
    )
}