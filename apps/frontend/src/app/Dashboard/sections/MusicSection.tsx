"use client";
import { RootState } from "@/app/redux/store";
import {motion} from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import Image from "next/image";
import image from "@/app/assets/images/ab67616d00001e02eb2a87031edeb0be809c48aa.jpeg"
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Timer } from "lucide-react";
import { TrackItem } from "@/app/components/TrackItem";
export const MusicSection=()=>{
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: scrollRef,
        offset: ["start start", "end start"],
      });
      const stickyOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
      const stickyY = useTransform(scrollYProgress, [0.1, 0.2], [-20, 0]);
    const user= useSelector((state:RootState)=>state.userInfo);
    return(
   
        <div className="grid h-full w-full ">
          
          <section className="h-full pb-5 text-white bg-black/40 rounded-md overflow-auto flex flex-col" ref={scrollRef}>
  <ScrollArea className="w-full h-full overflow-auto">
    <div className="bg-gradient-to-br from-purple-500 shadow-md shadow-gray-950 to-blue-500 pt-10 px-3 pb-3 w-full">
      <div className="flex flex-rows px-3 gap-10">
        <div className="flex">
          <Image src={image} className="size-40 shadow-lg shadow-gray-950 rounded-md" alt="Profile" />
        </div>
        <div className="flex items-start justify-center flex-col">
          <div className="flex">
            <span>Playlist</span>
          </div>
          <h1 className="text-4xl font-white font-sans">Music PlayList</h1>
          <div className="flex flex-rows">
            <p>User id </p>
            <p>. 8 Songs</p>
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
      <div className="flex pb-5 justify-between flex-rows">
        <div className="flex gap-5">
        <div className="flex">#</div>
        <div className="flex">title</div>
        </div>
        <div className="flex">Album</div>
        <div className="flex"><Timer /></div>
      </div>
      <div>
        {
            [...Array(100)].map((idx)=>(
                <div key={idx}>

                <TrackItem title="Playlist" idx={1} duration={100} onclick={()=>{alert({idx})}} Album="list" />
                </div>
            ))
        }
      </div>
    </div>
  </ScrollArea>
</section>

        </div>
       
       
    )
}