import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Pause, Play, SkipBack, SkipForward, StepBack, Volume2, VolumeX } from "lucide-react";
import { convertDuration, useCurrentDuration } from "@/app/PlayLogic/Duration";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { twMerge } from "tailwind-merge";
import { useDispatch } from "react-redux";
import { useButton, useTogglePlay } from "@/app/PlayLogic/Play";
import { useVolume } from "@/app/PlayLogic/ChangeVolume";
import { setVolume } from "@/app/redux/features/SpotifyPlayer";
import { useSeek } from "@/app/PlayLogic/SeekDuration";
import { Skeleton } from "@/components/ui/skeleton";

export const MusicPlayer =()=>{
    const {isPlaying,togglePlay}= useTogglePlay();
    const {ChangeVolume} = useVolume();
    const volume = useSelector((state: RootState) => state.Player.volume);
    const duration = useSelector((state:RootState)=>state.Track.duration) || 0;
  const {progress:currentProgress} = useCurrentDuration();
  const percent_currentProgress = duration ? (currentProgress / duration) * 100 : 0;
  const {BackWard,Forward} = useButton();
  const {seekduration} = useSeek();
  const [showVolume, setShowVolume] = useState(false);
    const currentTrack = useSelector((state:RootState)=>state.Track);
    const dispatch=useDispatch();
   
    return(
        <div className=" left-0 right-0 bg-gradient-to-t from-zinc-900/95 to-zinc-900/90 backdrop-blur-lg text-white border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          {/* Progress bar */}
          <div className="w-full mb-4">
            <Slider
              value={[percent_currentProgress]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={([value])=>{
                const seek = (value /100)*(duration || 1);
                seekduration(seek);
              }}
            />
          </div>
  
          <div className="flex items-center justify-between gap-4">
            {/* Track info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {currentTrack.img?<img 
                src={currentTrack.img} 
                alt={currentTrack.name}
                className="sm:size-8 size-12 rounded-md object-cover shadow-lg"
              />:<Skeleton className="sm:size-8 size-12 rounded-md object-cover shadow-lg"  /> }
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm text-white truncate">{currentTrack.name}</h3>
                {/* <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p> */}
              </div>
            </div>
  
            {/* Playback controls */}
            <div className="flex items-center justify-center gap-6">
              <button onClick={BackWard} className="text-zinc-400 hover:text-accent transition">
                <SkipBack className="w-5 h-5" />
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-accent text-white hover:scale-105 transition"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
              <button onClick={Forward} className="text-zinc-400 hover:text-accent transition">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
  
            {/* Volume control */}
            <div className="flex items-center gap-2 w-32">
              <button 
                className="text-zinc-400 hover:text-white transition"
                onClick={() => setShowVolume(!showVolume)}
              >
                {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div className={twMerge("transition-all duration-200", showVolume ? "w-full opacity-100" : "w-0 opacity-0")}>
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(value) => {
                    const newvolume = value[0];
                    dispatch(setVolume(newvolume));
                    ChangeVolume(value[0])}}
                />
              </div>
              <div className="text-xs text-zinc-400 min-w-[3rem] text-right">
                {convertDuration(currentProgress)}/
                {convertDuration(currentTrack.duration)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}