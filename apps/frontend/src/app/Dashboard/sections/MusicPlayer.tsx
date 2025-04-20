import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Pause, SkipBack, SkipForward, StepBack } from "lucide-react";
import { convertDuration } from "@/app/PlayLogic/Duration";
export const MusicPlayer =()=>{
    const currentTrack = useSelector((state:RootState)=>state.Track);
    return(
        <div className="bg-black/40 text-white flex w-full h-30">
          <div className="flex flex-col gap-2 w-full">
          <div className="bg-green-300  sm:col-span-0 ">
                   timer
                </div>
           <div className="grid px-5 sm:grid-cols-3 grid-cols-3 w-full max-h-full gap-3 items-center">
                <div className="flex   gap-3 items-center">
                   <img className="size-18 rounded-md" src={currentTrack.img || undefined} alt="image" />
                   <span className="overflow-hidden">{currentTrack.name}</span>
                </div>
                <div className="flex flex-rows text-8xl items-center gap-5 justify-center h-full w-full">
                        <div className="flex flex-rows gap-10 ">

                            <span><SkipBack /></span>
                            <span><Pause/></span>
                            <span><SkipForward/></span>
                        </div>
                    
                </div>
                
                <div className="flex gap-3 justify-end">
                    <input type="range" min="0" max="100" />
                    <span>{convertDuration(currentTrack.duration)}</span>
                    /
                    <span>
                    {convertDuration(currentTrack.duration)}
                    </span>
                </div>
           </div>
          </div>
        </div>
    )
}